import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Home from "../pages/Home";
import Reserva from "../pages/Reserva";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/registro" element={<Registro />} />

        <Route path="/reserva" element={<Reserva />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;