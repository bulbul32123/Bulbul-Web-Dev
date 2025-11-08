import React from 'react'
import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const useContextApi = () => useContext(Context);

export const Provider = ({ children }) => {
  const [hoveredText, setHoveredText] = useState(null);
  const [show, setShow] = useState(false);

  return (
    <Context.Provider value={{ hoveredText, setHoveredText, show, setShow }}>
      {children}
    </Context.Provider>
  );
};
