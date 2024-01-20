import { FC, ReactNode } from "react";
import { useContext } from "react";
import { AppDataContext } from "../context";
import { Navigate } from "react-router-dom";

interface RestrictedRoutesProps {
    children: ReactNode;
    layout?: ReactNode;
}

export const RestrictedRoutes: FC<RestrictedRoutesProps> = ({
    children,
    layout: Layout,
}) => {
    const { isUserAuthenticated } = useContext(AppDataContext);

    if (isUserAuthenticated) {
        return <Navigate to={"/home"} replace />;
    } else {
        return <Layout>{children}</Layout>;
    }
};
