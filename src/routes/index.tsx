import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Ligas from '../pages/Ligas';
import LigaDetalle from '../pages/LigaDetalle';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/ligas" />} />
      <Route path="/ligas" element={<Ligas />} />
      <Route path="/ligas/:id" element={<LigaDetalle />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
