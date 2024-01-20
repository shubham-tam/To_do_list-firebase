import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./assets/scss/style.scss";

import App from "./App.tsx";
import { AppDataContextProvider } from "./context/index";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AppDataContextProvider>
        <Router>
            <App />
        </Router>
    </AppDataContextProvider>
);
