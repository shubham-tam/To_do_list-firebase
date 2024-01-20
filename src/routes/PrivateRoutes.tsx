import { FC, ReactNode } from "react";
import { useContext } from "react";
import { AppDataContext } from "../context";
import { Navigate } from "react-router-dom";

interface PrivateRoutesProps {
    children: ReactNode;
    layout?: ReactNode;
}

export const PrivateRoutes: FC<PrivateRoutesProps> = ({
    children,
    layout: Layout,
}) => {
    const { isUserAuthenticated } = useContext(AppDataContext);

    if (!isUserAuthenticated) {
        return <Navigate to="/login" replace />;
    } else {
        return <Layout>{children}</Layout>;
    }
};
