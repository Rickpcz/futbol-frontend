// src/routes/index.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ligas from "../pages/Ligas";
import LigaDetalle from "../pages/LigaDetalle";
import Layout from "../components/Layout";
import HomePage from "../pages/Home";
import Equipos from "../pages/Equipos";
import EquipoDetalle from "../pages/EquipoDetalle";


const AppRoutes = () => (
  <BrowserRouter basename="/futbol-frontend">
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ligas" element={<Ligas />} />
        <Route path="/ligas/:id" element={<LigaDetalle />} />
        <Route path="/equipos" element={<Equipos />} />        
        <Route path="/equipo/:id" element={<EquipoDetalle />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default AppRoutes;
