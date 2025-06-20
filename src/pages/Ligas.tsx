import { useEffect, useState } from 'react';
import { obtenerLigas } from '../api/Liga';
import type { Liga } from '../types/Liga';
import { Link } from 'react-router-dom';

const Ligas = () => {
  const [ligas, setLigas] = useState<Liga[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerLigas();
      setLigas(data);
      setCargando(false);
    };
    cargar();
  }, []);

  if (cargando) return <p className="p-4">Cargando ligas...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ligas y Competencias</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {ligas.map((liga) => (
          <div key={liga.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h2 className="font-bold text-lg">{liga.nombre}</h2>
            <p className="text-sm text-gray-600">País: {liga.pais}</p>
            <p className="text-sm text-gray-600">Tipo: {liga.tipo}</p>
            {liga.temporada && (
              <p className="text-sm text-gray-600">Temporada: {liga.temporada}</p>
            )}
            <Link
              to={`/ligas/${liga.id}`}
              className="inline-block mt-2 px-4 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Ver equipos
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ligas;
