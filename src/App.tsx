import { Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "./Layout";
import { Login } from "./components";

import AnimePage from "./components/AnimePage";
import { PrivateRoutes, RestrictedRoutes } from "./routes";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route
                    path="/login"
                    element={
                        <RestrictedRoutes layout={Layout}>
                            <Login />
                        </RestrictedRoutes>
                    }
                />
                <Route
                    path="home"
                    element={
                        <PrivateRoutes layout={Layout}>
                            <AnimePage />
                        </PrivateRoutes>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
