// src/routes/index.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Ligas from "../pages/Ligas";
import LigaDetalle from "../pages/LigaDetalle";
import Layout from "../components/Layout";

const AppRoutes = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/ligas" replace />} />
        <Route path="/ligas" element={<Ligas />} />
        <Route path="/ligas/:id" element={<LigaDetalle />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default AppRoutes;
