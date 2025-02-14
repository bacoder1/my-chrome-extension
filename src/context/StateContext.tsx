"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import colorList from "../utils/data/colors.json";

interface StateContextProps {
  themeColor: ColorListItemProps;
  setThemeColor: Dispatch<SetStateAction<ColorListItemProps>>;
}

// Provide a default context for TypeScript to infer correctly
const StateContext = createContext<StateContextProps>({
  themeColor: colorList[0],
  setThemeColor: () => {},
});

export interface ColorListItemProps {
  id: string;
  name: string;
  rgb: {
    primary: string;
    darker: string;
    lighter: string;
    dark: string;
  };
  description: string;
}

interface StateProviderProps {
  children: React.ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [themeColor, setThemeColor] = useState<ColorListItemProps>(
    colorList[0],
  );

  useEffect(() => {
    // Ensure default value in case chrome.storage.sync.get fails or is unset

    if (typeof chrome.storage !== undefined && chrome.storage) {
      chrome.storage.sync.get("accentColor", (result) => {
        const storedColor = result.accentColor || colorList[0];
        setThemeColor(storedColor);
      });
    }
  }, []);

  return (
    <StateContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = (): StateContextProps => useContext(StateContext);
