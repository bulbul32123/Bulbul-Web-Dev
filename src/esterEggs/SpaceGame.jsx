import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { Play, Zap, Target, Gamepad2, Trophy, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { useEasterEgg } from '../context/EasterEggContext';
import eggSound from '/sounds/succes.MP3';

const BAD_PRACTICES = [
  'Bad UI', 'Low Performance', 'Heavy Code', 'Bad UX',
  'Bugs', 'Memory Leaks', 'Hardcoded Values',
  'Spaghetti Code', 'Long Functions', 'Loop Holes'
];

export const SpaceGame = ({ onClose, setShowCelebration }) => {
  const canvasRef = useRef(null);
  const scoreRef = useRef(null);
  const { addEasterEgg } = useEasterEgg();
  const [gameStarted, setGameStarted] = useState(false);
  const [playShoot] = useSound('/sounds/shoot.MP3', { volume: 0.5 });
  const [playHit] = useSound('/sounds/hit.MP3', { volume: 0.2 });
  const [play] = useSound(eggSound, { volume: 0.6, interrupt: true });
  const shipRef = useRef(null);
  const lasersRef = useRef([]);
  const enemiesRef = useRef([]);
  const destroyedTextsRef = useRef(new Set());
  const playingRef = useRef(false);
  const tickRef = useRef(0);
  const laserTickRef = useRef(0);
  const scoreRefVar = useRef(0);
  const speedMultiplierRef = useRef(1);
  const enemySeedFrameIntervalRef = useRef(40);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    function createShip() {
      return {
        radius: 15,
        x: canvas.width / 2 - 15,
        y: canvas.height - 45,
        width: 30,
        height: 30,
        left: false,
        right: false,
        speed: 15,
        active: true,
        shooting: false
      };
    }

    function createLaser(x) {
      return {
        x: x - 0.5,
        y: canvas.height - 50,
        width: 6,
        height: 20,
        speed: 20,
        active: true
      };
    }

    function createEnemy(text) {
      let fontSize = window.innerWidth < 768 ? 30 : 50;
      ctx.font = `${fontSize}px monospace`;
      let textWidth = ctx.measureText(text).width;
      while (textWidth > canvas.width - 20 && fontSize > 16) {
        fontSize -= 2;
        ctx.font = `${fontSize}px monospace`;
        textWidth = ctx.measureText(text).width;
      }
      return {
        text,
        fontSize,
        width: textWidth,
        height: fontSize + 5,
        x: randomBetween(0, canvas.width - textWidth - 10),
        y: -fontSize,
        speed: 3,
        active: true
      };
    }

    function hitTest(a, b) {
      return !(
        a.x > b.x + b.width ||
        a.y > b.y + b.height ||
        b.x > a.x + a.width ||
        b.y > a.y + a.height
      );
    }

    function render() {
      if (!playingRef.current) return;

      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const ship = shipRef.current;
      if (ship.left) ship.x = Math.max(0, ship.x - ship.speed);
      if (ship.right) ship.x = Math.min(canvas.width - ship.width, ship.x + ship.speed);


      if (ship.active && ship.shooting && (laserTickRef.current === 0 || laserTickRef.current % 10 === 0)) {
        if (lasersRef.current.length < 50) {
          lasersRef.current.push(createLaser(ship.x + ship.radius - 3));
          playShoot(); 
        }
      }

      if (ship.active) {
        ctx.fillStyle = '#f7eb9d';
        ctx.fillRect(ship.x + ship.radius - 5, ship.y, 10, ship.radius);
        ctx.fillRect(ship.x, ship.y + ship.radius, ship.width, 10);
        ctx.fillRect(ship.x, ship.y + ship.radius + 10, 10, 5);
        ctx.fillRect(ship.x + ship.width - 10, ship.y + ship.radius + 10, 10, 5);
      }

      if (tickRef.current % enemySeedFrameIntervalRef.current === 0 && ship.active && enemiesRef.current.length < 1) {
        const remaining = BAD_PRACTICES.filter(t => !destroyedTextsRef.current.has(t));
        const randomText = remaining[Math.floor(Math.random() * remaining.length)];
        if (randomText) enemiesRef.current.push(createEnemy(randomText));
      }

      lasersRef.current = lasersRef.current.filter(l => l.y > -l.height && l.active);
      lasersRef.current.forEach(laser => {
        laser.y -= laser.speed;
        ctx.fillStyle = '#caef96';
        ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
      });

      enemiesRef.current = enemiesRef.current.filter(e => e.y < canvas.height && e.active);
      enemiesRef.current.forEach(enemy => {
        enemy.y += enemy.speed * speedMultiplierRef.current;
        ctx.font = `${enemy.fontSize}px SpaceMedium`;
        ctx.fillStyle = 'white';
        ctx.fillText(enemy.text, enemy.x, enemy.y + enemy.fontSize);
      });

      enemiesRef.current.forEach(enemy => {
        lasersRef.current.forEach(laser => {
          if (hitTest(laser, enemy) && laser.active) {
            enemy.active = false;
            laser.active = false;
            destroyedTextsRef.current.add(enemy.text);
            speedMultiplierRef.current += 0.025;
            scoreRefVar.current += 100;
            if (scoreRef.current) scoreRef.current.textContent = scoreRefVar.current;
            playHit();  
          }
        });

        if (ship.active && hitTest(ship, enemy)) {
          ship.active = false;
          playingRef.current = false;
          setTimeout(() => startGame(), 2000);
        }
      });

      tickRef.current++;
      if (ship.shooting) laserTickRef.current++;

      if (destroyedTextsRef.current.size === BAD_PRACTICES.length && enemiesRef.current.length === 0) {
        playingRef.current = false;
        setShowCelebration(true)
        console.log("show celebration true");
        setGameStarted(true);
        addEasterEgg("egg-completed-game", `You just completed the game`);
        play()
        onClose(false)
        return;
      }

      requestAnimationFrame(render);
    }

    function startGame() {
      if (playingRef.current) return; 
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.75;
      shipRef.current = createShip();
      lasersRef.current = [];
      enemiesRef.current = [];
      destroyedTextsRef.current = new Set();
      playingRef.current = true;
      tickRef.current = 0;
      laserTickRef.current = 0;
      speedMultiplierRef.current = 1;
      enemySeedFrameIntervalRef.current = 40;
      scoreRefVar.current = 0;
      if (scoreRef.current) scoreRef.current.textContent = 0;
      render();
    }
    const handleKeyDown = (e) => {
      const ship = shipRef.current;
      if (!ship || !ship.active) return;
      if (e.key === 'ArrowRight') ship.right = true;
      if (e.key === 'ArrowLeft') ship.left = true;
      if (e.key === ' ') {
        e.preventDefault();
        ship.shooting = true;
        laserTickRef.current = 0;
      }
    };

    const handleKeyUp = (e) => {
      const ship = shipRef.current;
      if (!ship) return;
      if (e.key === 'ArrowRight') ship.right = false;
      if (e.key === 'ArrowLeft') ship.left = false;
      if (e.key === ' ') ship.shooting = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.75;
    });

    if (gameStarted) {
      startGame();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      playingRef.current = false;
    };
  }, [gameStarted]);

  const handleMobileLeft = (pressed) => {
    const ship = shipRef.current;
    if (!ship || !ship.active) return;
    ship.left = pressed;
  };

  const handleMobileRight = (pressed) => {
    const ship = shipRef.current;
    if (!ship || !ship.active) return;
    ship.right = pressed;
  };

  const handleMobileShoot = (pressed) => {
    const ship = shipRef.current;
    if (!ship || !ship.active) return;
    ship.shooting = pressed;
    if (pressed) {
      laserTickRef.current = 0;
    }
  };

  return (
    <>
      <div className="relative w-full h-full">
        {!gameStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white dark:bg-black dark:text-white text-black flex items-center justify-center z-50 p-6"
          >
            <div className="rounded-xl shadow-2xl max-w-md w-full p-10 text-center relative">
              <button
                onClick={() => onClose(false)}
                className='absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-white transition-colors'
              >
                <X size={24} />
              </button>

              <Gamepad2 className="mx-auto mb-4 " size={60} />
              <h1 className="text-3xl font-bold mb-6 ">Code Combat Zone</h1>

              <div className="text-sm text-gray-600 dark:text-gray-300 mb-8 space-y-4">
                <p className="">🚀 Mission: Eliminate all bad coding practices!</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <kbd className="border border-gray-600 rounded px-2 py-1 text-white bg-gray-800">←</kbd>
                    <kbd className="border border-gray-600 rounded px-2 py-1 text-white bg-gray-800">→</kbd>
                    <span>Move Ship</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <kbd className="border border-gray-600 rounded px-2 py-1 text-white bg-gray-800">Space</kbd>
                    <span>Fire Lasers</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  <p>Targets: {BAD_PRACTICES.join(', ')}</p>
                </div>
              </div>

              <button
                onClick={() => setGameStarted(true)}
                className=" text-white dark:text-black bg-black dark:bg-white font-bold uppercase px-8 py-3 rounded-lg transition-all duration-200"
                autoFocus
              >
                <Play className="inline-block mr-2" size={20} />
                Launch Game
              </button>
            </div>
          </motion.div>
        )}
        {gameStarted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 pt-10 px-4 md:p-16 h-[90vh]"
          >
            <div className="w-full h-full relative rounded-4xl">
              <canvas ref={canvasRef} className="relative w-full h-full rounded-2xl md:rounded-4xl"></canvas>
              <li className='absolute top-4 left-4 list-none'>Score: <span ref={scoreRef}>0</span></li>

              <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-4 px-4">
                <button
                  onTouchStart={() => handleMobileLeft(true)}
                  onTouchEnd={() => handleMobileLeft(false)}
                  onMouseDown={() => handleMobileLeft(true)}
                  onMouseUp={() => handleMobileLeft(false)}
                  onMouseLeave={() => handleMobileLeft(false)}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4 active:bg-white/40 transition-all select-none"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>

                <button
                  onTouchStart={() => handleMobileShoot(true)}
                  onTouchEnd={() => handleMobileShoot(false)}
                  onMouseDown={() => handleMobileShoot(true)}
                  onMouseUp={() => handleMobileShoot(false)}
                  onMouseLeave={() => handleMobileShoot(false)}
                  className="bg-red-500/80 backdrop-blur-sm border border-red-400/50 rounded-full p-6 active:bg-red-600/90 transition-all select-none"
                >
                  <Zap size={28} className="text-white" />
                </button>

                {/* Right Movement Button */}
                <button
                  onTouchStart={() => handleMobileRight(true)}
                  onTouchEnd={() => handleMobileRight(false)}
                  onMouseDown={() => handleMobileRight(true)}
                  onMouseUp={() => handleMobileRight(false)}
                  onMouseLeave={() => handleMobileRight(false)}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4 active:bg-white/40 transition-all select-none"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </div>
            </div>
            <button onClick={() => onClose(false)} className='absolute cursor-pointer top-16 right-20 !text-white'>Close</button>
          </motion.div>
        )}
      </div>
    </>
  );
}