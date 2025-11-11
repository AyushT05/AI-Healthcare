'use client';
import React, { createContext, useState } from 'react';

export const SymptomInputContext = createContext();

export const SymptomInputProvider = ({ children }) => {
  const [userSymptomInput, setUserSymptomInput] = useState({
    symptoms: ''
  });

  return (
    <SymptomInputContext.Provider value={{ userSymptomInput, setUserSymptomInput }}>
      {children}
    </SymptomInputContext.Provider>
  );
};
