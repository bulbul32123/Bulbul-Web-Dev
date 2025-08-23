import React, { useState } from "react";
import { SpaceGame } from "../esterEggs/SpaceGame";
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from "lucide-react";

const BAD_PRACTICES = [
  'Bad UI', 'Low Performance', 'Heavy Code', 'Bad UX',
  'Bugs', 'Memory Leaks', 'Hardcoded Values',
  'Spaghetti Code', 'Long Functions', 'Loop Holes'
];

export default function Game() {
  const [showGame, setShowGame] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const startGame = () => {
    setShowGame(true);
  };

  const closeGame = () => {
    setShowGame(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

    
      <main className="relative z-10 px-6 pt-12 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none mb-6">
              <motion.span
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="block"
              >
                How i cleanup 
              </motion.span>
              <motion.span
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="block"
              >
                My code
              </motion.span>
            </h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl"
            >
              An interactive space shooter where you eliminate bad coding practices. and
              this is how i clean and optimize my code.
            </motion.p>
          </motion.div>

          {/* Game Section */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="bg-gray-900 dark:bg-gray-800 rounded-3xl p-8 md:p-12 text-white"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <motion.h2
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  Ready to Clean Up the Code?
                </motion.h2>

                <motion.p
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="text-gray-300 mb-8 text-lg leading-relaxed"
                >
                  Navigate your ship through a galaxy of bad practices. Each enemy represents
                  a real coding problem that needs to be eliminated. Are you ready to become
                  the ultimate code cleaner?
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  className="grid grid-cols-3 gap-6 mb-8"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gray-800/50 rounded-xl p-6 text-center backdrop-blur-sm border border-gray-700/50"
                  >
                    <div className="text-3xl font-bold text-yellow-400 mb-2">10</div>
                    <div className="text-gray-400 text-sm">Targets</div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gray-800/50 rounded-xl p-6 text-center backdrop-blur-sm border border-gray-700/50"
                  >
                    <div className="text-3xl font-bold text-cyan-400 mb-2">∞</div>
                    <div className="text-gray-400 text-sm">Lasers</div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gray-800/50 rounded-xl p-6 text-center backdrop-blur-sm border border-gray-700/50"
                  >
                    <div className="text-3xl font-bold text-green-400 mb-2">1</div>
                    <div className="text-gray-400 text-sm">Life</div>
                  </motion.div>
                </motion.div>

                {/* Start Button */}
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.7 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255,255,255,0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={startGame}
                  className="bg-white text-black font-bold text-lg px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-gray-100 transition-all duration-300 group"
                >
                  <Play size={24} className="group-hover:scale-110 transition-transform" />
                  Start Mission
                </motion.button>
              </div>

              {/* Right Content - Code Preview */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="bg-gray-950 rounded-2xl p-6 font-mono text-sm border border-gray-700"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="text-green-400"
                  >
                    // Bad practices to eliminate:
                  </motion.div>
                  {BAD_PRACTICES.slice(0, 6).map((practice, index) => (
                    <motion.div
                      key={practice}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.9 + index * 0.1 }}
                      className="text-red-400"
                    >
                      × {practice}
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="text-gray-500"
                  >
                    ...and more!
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Game Modal */}
      <AnimatePresence>
        {showGame && (
          <SpaceGame onClose={closeGame} setShowCelebration={setShowCelebration} />
        )}
      </AnimatePresence>
    </div>
  );
}