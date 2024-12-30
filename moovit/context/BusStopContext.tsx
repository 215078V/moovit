import React, { createContext, useState, useContext } from "react";

type BusStopContextType = {
  busStopCode: string;
  setBusStopCode: (code: string) => void;
};

const BusStopContext = createContext<BusStopContextType | undefined>(undefined);

export const BusStopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [busStopCode, setBusStopCode] = useState("");

  return (
    <BusStopContext.Provider value={{ busStopCode, setBusStopCode }}>
      {children}
    </BusStopContext.Provider>
  );
};

export const useBusStopContext = (): BusStopContextType => {
  const context = useContext(BusStopContext);
  if (!context) {
    throw new Error("useBusStopContext must be used within a BusStopProvider");
  }
  return context;
};
