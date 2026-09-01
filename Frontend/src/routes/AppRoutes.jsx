import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import Login from "../pages/Login";

function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Página principal */}
                <Route path="/" element={<App />} />

                {/* Login */}
                <Route path="/login" element={<Login />} />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;