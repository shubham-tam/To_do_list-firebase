import classNames from "classnames";
import { FC, ReactNode, useContext } from "react";

import "../assets/scss/style.scss";

import { Sidebar } from "../components";
import { AppDataContext } from "../context";

interface indexProps {
    children: ReactNode;
}

export const Layout: FC<indexProps> = ({ children }) => {
    const { isUserAuthenticated } = useContext(AppDataContext);

    return (
        <>
            {isUserAuthenticated && <Sidebar />}
            <div
                className={classNames({
                    layout_children: isUserAuthenticated,
                })}
            >
                {children}
            </div>
        </>
    );
};
