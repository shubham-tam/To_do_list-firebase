import React, { createContext, useState, ReactNode } from "react";

interface AppDataContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: AppDataContextValue = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

const AppDataContext = createContext<AppDataContextValue>(defaultContextValue);

interface AppDataContextProps {
  children: ReactNode;
}

const AppDataContextProvider: React.FC<AppDataContextProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const contextValue: AppDataContextValue = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
};

export { AppDataContext, AppDataContextProvider };
