import React,{ createContext, useContext, useEffect, useState } from "react";

const SoundContext = createContext();

export const useSoundSystem = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const enableSound = () => {
    setAudioUnlocked(true);
    // Unlock all AudioContexts in the page
    const event = new Event("click");
    window.dispatchEvent(event);
  };

  return (
    <SoundContext.Provider value={{ audioUnlocked, enableSound }}>
      {children}
    </SoundContext.Provider>
  );
};
