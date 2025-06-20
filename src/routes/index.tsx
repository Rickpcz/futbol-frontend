// src/routes/index.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ligas from "../pages/Ligas";
import LigaDetalle from "../pages/LigaDetalle";
import Layout from "../components/Layout";
import HomePage from "../pages/Home";

const AppRoutes = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
         <Route path="/" element={<HomePage />} />
        <Route path="/ligas" element={<Ligas />} />
        <Route path="/ligas/:id" element={<LigaDetalle />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default AppRoutes;
