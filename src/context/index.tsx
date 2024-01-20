import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { isEmpty } from "../utls";

interface AppDataContextValue {
    isUserAuthenticated: boolean;
    setisUserAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: AppDataContextValue = {
    isUserAuthenticated: false,
    setisUserAuthenticated: () => {},
};

const AppDataContext = createContext<AppDataContextValue>(defaultContextValue);

interface AppDataContextProps {
    children: ReactNode;
}

const AppDataContextProvider: React.FC<AppDataContextProps> = ({
    children,
}) => {
    const [firebaseUserLoggedInData] = useAuthState(auth);

    // const isUserLoggedIn = () => {
    //     return !isEmpty(firebaseUserLoggedInData?.email) ? true : false;
    // };

    const isUserLoggedIn = () => {
        return !!firebaseUserLoggedInData?.email ?? false;
    };

    const [isUserAuthenticated, setisUserAuthenticated] = useState(false);

    const contextValue: AppDataContextValue = {
        isUserAuthenticated,
        setisUserAuthenticated,
    };

    useEffect(() => {
        setisUserAuthenticated(isUserLoggedIn());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firebaseUserLoggedInData]);

    return (
        <AppDataContext.Provider value={contextValue}>
            {children}
        </AppDataContext.Provider>
    );
};

export { AppDataContext, AppDataContextProvider };
