import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { HiMenuAlt4 } from "react-icons/hi";
import { FiSun, FiMoon, FiCode } from 'react-icons/fi';
import Button from './Button';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { useEasterEgg } from '../context/EasterEggContext';
import BubbleCTA from '../../public/icons/BubbleCTA';
import Celebration from './Celebration';
import useSound from 'use-sound';
import eggSound from '/sounds/succes.MP3';
import hoverSound from '/sounds/hover.MP3';
import clickSound from '/sounds/click.MP3';
import clickSound2 from '/sounds/eggs.mp3';

export default function SidebarLayout({ children }) {
  const [isAvatarVisible, setIsAvatarVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(null);
  const [isMusicOn, setIsMusicOn] = useState(false);

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [devUnlocked, setDevUnlocked] = useState(false);
  const [themeClickCount, setThemeClickCount] = useState(0);
  const [show, setShow] = useState(false);

  const [play] = useSound(eggSound, { volume: 0.6, interrupt: true });
  const [playHover] = useSound(hoverSound, { volume: 0.5, interrupt: true });
  const [playClick] = useSound(clickSound, { volume: 0.5, interrupt: true });
  const [playClick2] = useSound(clickSound2, { volume: 0.5, interrupt: true });

  const { addEasterEgg } = useEasterEgg();
  const lastScrollY = useRef(0);
  const menuRef = useRef();
  const [logoClickCount, setLogoClickCount] = useState(0);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark', 'developer');
    document.documentElement.classList.add(theme);

    // Save only light/dark to localStorage
    if (theme === 'light' || theme === 'dark') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Handle theme click and developer unlock
  const handleThemeClick = () => {
    playClick2();

    // If dev mode is unlocked, rotate all 3
    if (devUnlocked) {
      setTheme(prev =>
        prev === 'light' ? 'dark' :
          prev === 'dark' ? 'developer' : 'light'
      );
    } else {
      // Before unlock: light <-> dark toggle
      if (theme === 'light') setTheme('dark');
      else setTheme('light');

      // Count rapid clicks for hidden unlock
      setThemeClickCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 5) {
          setDevUnlocked(true);
          setTheme('developer');
          addEasterEgg('Egg-developer', '💻 Developer Theme Unlocked!');
          setShow(true);
          play();
        }

        return newCount;
      });
    }
  };


  const handleLogoClick = () => {
    setLogoClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        addEasterEgg('Egg-avatar', '🎭 You found the hidden Avatar!');
        setShow(true);
        play();
        setIsAvatarVisible(true);
      }
      return newCount;
    });
  };

  // Scroll bubble visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        setShowBubble(true);
      } else {
        setShowBubble(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(menuRef.current, { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(menuRef.current, { x: '100%', duration: 0.5, ease: 'power3.in' });
    }
  }, [isMenuOpen]);

  return (
    <>
      {isAvatarVisible && <Avatar />}
      <Celebration show={show} />
      <div className='h-full w-full'>
        <div className='menu fixed top-0 fixed-sidebar-left left-0 h-full pl-5 md:pl-7 pt-7 pb-7 flex flex-col justify-between items-start z-50'>
          <div onClick={() => { handleLogoClick(); playClick(); }} className="cursor-pointer" onMouseEnter={playHover}>
            {!isAvatarVisible && <Link to='/' className="text-white text-xl font-extrabold select-none">BulBul</Link>}
          </div>
          <div />
          <div />
        </div>
        <main className='z-40 relative w-full h-full'>{children}</main>
        <div className='menu fixed top-0 right-0 fixed-sidebar-right  h-full flex flex-col justify-between items-end md:pr-7 pr-5 pt-7 pb-7 z-50 '>
          <div className="flex items-center text-white cursor-pointer">
            <Button>
              <button className='p-3 rounded-full cursor-pointer bg-gray-200 text-black hover:bg-white hover:text-black' onMouseEnter={playHover} onClick={playClick2}>
                <HiMenuAlt4 size={30} />
              </button>
            </Button>
          </div>

          <div >
            <Button>
              <button onClick={handleThemeClick} className="cursor-pointer p-3 rounded-full text-xl mb-4 bg-gray-200 text-black hover:bg-white hover:text-black" onMouseEnter={playHover}>
                {theme === 'developer' ? <FiCode /> : theme === 'dark' ? <FiSun /> : <FiMoon />}
              </button>
            </Button>
          </div>

          <div className="select-none -rotate-90 pt-[2.7rem] text-end relative cursor-pointer text-sm" onClick={() => { setIsMusicOn(!isMusicOn); playClick(); }} onMouseEnter={playHover}>
            <span className='text-gray-400'>Music</span>{" "}
            <button className='overflow-hidden text-left'>
              <div className="relative cursor-pointer w-7 -mb-1 overflow-hidden text-sm uppercase !text-black">
                <span className={`inline-block text-white transition duration-500 ease-out ${isMusicOn && "-translate-y-[100%]"}`}>ON</span>
                <span className={`absolute left-0 text-white inline-block transition duration-500 ease-out ${!isMusicOn && "translate-y-[100%]"}`}>OFF</span>
              </div>
            </button>
          </div>
        </div>

        <div className={`cta-bubble ${showBubble === true ? 'is-visible' : showBubble === false ? 'is-hidden' : ''}`} id="lets-talk-bubble">
          <Link to={'/contactMe'} title="Open Lets Talk CTA">
            <BubbleCTA />
            <div className="bubble-text text-line1"><span>Let&apos;s</span></div>
            <div className="bubble-text text-line1"><span>Talk</span></div>
          </Link>
        </div>


      </div>
    </>
  );
}

// edit the masktext

// Day-8
// git add src/components/SidebarLayout.jsx
// git commit -m "Add SidebarLayout.jsx component"
// git push origin main

// Day-9
// git add src/components/about
// git commit -m "Add about component"
// git push origin main

// Day-10
// git add src/components/animations
// git commit -m "Add animations component"
// git push origin main

// Day-11
// git add src/components/menuButtons
// git commit -m "Add menuButtons component"
// git push origin main

// Day-12
// git add src/components/
// git commit -m "Add All components"
// git push origin main
