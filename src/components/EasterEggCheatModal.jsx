import React, { useEffect, useState, useRef } from "react";
import { IoClose, IoChevronDown, IoChevronUp } from "react-icons/io5";

const EasterEggCheatModal = ({ isOpen, onClose, onUnlock, showCodesDirectly = false }) => {
  const [showCheatCodes, setShowCheatCodes] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [showUpArrow, setShowUpArrow] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setShowCheatCodes(showCodesDirectly);
    }
  }, [isOpen, showCodesDirectly]);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollHeight, clientHeight } = scrollContainerRef.current;
        setShowScrollIndicator(scrollHeight > clientHeight);
      }
    };

    checkScroll();
    const timer = setTimeout(checkScroll, 100);

    window.addEventListener('resize', checkScroll);
    return () => {
      window.removeEventListener('resize', checkScroll);
      clearTimeout(timer);
    };
  }, [showCheatCodes, isOpen]);

  const handleUnlock = () => {
    setShowCheatCodes(true);
    onUnlock?.();
  };

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 200,
        behavior: 'smooth'
      });
    }
  };

  const scrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: -200,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setShowUpArrow(scrollTop > 50);

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setShowScrollIndicator(false);
    } else if (scrollHeight > clientHeight) {
      setShowScrollIndicator(true);
    }
  };

  if (!isOpen) return null;

  const cheatCodes = [
    { id: 1, description: "Click Bulbul 5 times.", hint: "Top left corner" },
    { id: 2, description: "Click theme modal 5 times.", hint: "Theme switcher" },
    { id: 3, description: "Click 'Interfaces' in the Hero section.", hint: "Hero glow" },
    { id: 4, description: "Click '--' in hero.", hint: "The dash" },
    { id: 5, description: "Click the music icon.", hint: "Melody" },
    { id: 6, description: "Click avatar.", hint: "Profile picture" },
    { id: 7, description: "Beat the game.", hint: "Skill time" },
    { id: 8, description: "Find the star in menu.", hint: "You found it" },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div
        className="bg-white rounded-lg w-full max-w-xl relative"
        style={{ maxHeight: '90vh' }}
      >
        <div className="p-6 pb-4 border-b relative bg-white rounded-t-lg">
          <button
            className="absolute top-4 right-4 text-black cursor-pointer hover:text-red-500"
            onClick={onClose}
          >
            <IoClose size={20} />
          </button>
          <h2 className="text-2xl font-bold pr-8">
            {showCheatCodes ? "Easter Egg Cheat Codes 🎮" : "You Found the Cheat Codes 🎉"}
          </h2>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="p-6 pt-4"
          style={{
            maxHeight: 'calc(90vh - 80px)',
            overflowY: 'scroll',
            overflowX: 'hidden'
          }}
        >
          {!showCheatCodes ? (
            <div className="text-gray-700 space-y-2">
              <p>Congratulations! You've discovered the secret Easter egg menu!</p>
              <p>There are <b>8 hidden Easter eggs</b> scattered throughout my portfolio.</p>
              <div className="mt-4 flex gap-3 flex-wrap">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-lime-400 text-black rounded-md hover:bg-lime-500 transition"
                >
                  I'll Find Them Myself 🕵️
                </button>
                <button
                  onClick={handleUnlock}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                >
                  Unlock Cheat Codes 🔓
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {cheatCodes.map((code) => (
                <div key={code.id} className="border-l-4 border-purple-500 pl-4 py-2 hover:bg-purple-50 transition-colors rounded">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                      {code.id}
                    </span>
                    <div>
                      <p className="font-bold text-gray-800">{code.description}</p>
                      <p className="text-xs italic mt-1 text-gray-500">💡 {code.hint}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showScrollIndicator && (
          <button
            onClick={scrollDown}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white rounded-full p-2 shadow-lg hover:bg-gray-800 transition animate-bounce cursor-pointer z-10"
          >
            <IoChevronDown size={20} />
          </button>
        )}

        {showUpArrow && (
          <button
            onClick={scrollUp}
            className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black text-white rounded-full p-2 shadow-lg hover:bg-gray-800 transition animate-bounce cursor-pointer z-10"
          >
            <IoChevronUp size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default EasterEggCheatModal;