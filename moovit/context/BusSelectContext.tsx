import React, { createContext, useState, useContext } from "react";

type BusCountdownContextType = {
  busCountdown: number;
  setBusCountdown: (countdown: number) => void;
};

const BusCountdownContext = createContext<BusCountdownContextType | undefined>(
  undefined
);

export const BusCountdownProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [busCountdown, setBusCountdown] = useState(0);

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setBusCountdown((countdown) => countdown + 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }
//     , []);

  return (
    <BusCountdownContext.Provider value={{ busCountdown, setBusCountdown }}>
      {children}
    </BusCountdownContext.Provider>
  );
};

export const useBusCountdownContext = (): BusCountdownContextType => {
  const context = useContext(BusCountdownContext);
  if (!context) {
    throw new Error(
      "useBusCountdownContext must be used within a BusCountdownProvider"
    );
  }
  return context;
};

export default BusCountdownContext;
