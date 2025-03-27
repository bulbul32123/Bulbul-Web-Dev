import React from 'react'
import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const useContextApi = () => useContext(Context);

export const Provider = ({ children }) => {
  const [hoveredText, setHoveredText] = useState(null);

  return (
    <Context.Provider value={{ hoveredText, setHoveredText }}>
      {children}
    </Context.Provider>
  );
};
