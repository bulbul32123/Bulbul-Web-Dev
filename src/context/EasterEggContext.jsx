import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import useSound from 'use-sound';
import clickSound2 from '/sounds/eggs.mp3';

const EasterEggContext = createContext();
export const useEasterEgg = () => useContext(EasterEggContext);

const TOTAL_EGGS = 10;

export const EasterEggProvider = ({ children }) => {
  const [foundEggs, setFoundEggs] = useState([]);
  const [foundCount, setFoundCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [playClick2] = useSound(clickSound2, { volume: 0.5, interrupt: true });
  const handleMenuOpen = () => {
    playClick2()
    setIsMenuOpen((pre) => !pre)
  }
  const addEasterEgg = (id, message) => {
    if (!foundEggs.includes(id)) {
      const updated = [...foundEggs, id];

      setFoundEggs(updated);
      setFoundCount(updated.length);

      toast.success(`${message} (Found ${updated.length}/${TOTAL_EGGS})`, {
        icon: '🥚',
        duration: 7000,
      });
    }
  };

  return (
    <EasterEggContext.Provider value={{ addEasterEgg, foundEggs, handleMenuOpen, foundCount, totalEggs: TOTAL_EGGS, isMenuOpen, setIsMenuOpen }}>
      {children}
    </EasterEggContext.Provider>
  );
};
