import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const EasterEggContext = createContext();
export const useEasterEgg = () => useContext(EasterEggContext);

const TOTAL_EGGS = 10;

export const EasterEggProvider = ({ children }) => {
  const [foundEggs, setFoundEggs] = useState([]);
  const [foundCount, setFoundCount] = useState(0);

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
    <EasterEggContext.Provider value={{ addEasterEgg, foundCount, totalEggs: TOTAL_EGGS }}>
      {children}
    </EasterEggContext.Provider>
  );
};
