import React, { createContext, useState } from "react";

export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isMusicOn, setIsMusicOn] = useState(true); // Estado para el sonido de las tarjetas

  // Función para alternar el sonido de las tarjetas
  const toggleMusic = () => {
    setIsMusicOn(!isMusicOn);
  };

  return (
    <SoundContext.Provider value={{ isMusicOn, toggleMusic }}>
      {children}
    </SoundContext.Provider>
  );
};
