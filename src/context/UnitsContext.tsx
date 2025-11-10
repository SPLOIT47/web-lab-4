import React, { createContext, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type Units = "metric" | "imperial";

const UnitsCtx = createContext<{
    units: Units;
    setUnits: React.Dispatch<React.SetStateAction<Units>>;
}>({
    units: "metric",
    setUnits: () => {},
});

export const UnitsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [units, setUnits] = useLocalStorage<Units>("units", "metric");

    return (
        <UnitsCtx.Provider value={{ units, setUnits }}>
            {children}
        </UnitsCtx.Provider>
    );
};

export const useUnits = () => useContext(UnitsCtx);