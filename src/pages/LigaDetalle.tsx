import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Liga } from '../types/Liga';
import type { Equipo } from '../types/Equipo';
import { obtenerLigaPorId, obtenerEquiposDeLiga } from '../api/Liga';

const LigaDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const [liga, setLiga] = useState<Liga | null>(null);
  const [equipos, setEquipos] = useState<Equipo[]>([]);

  useEffect(() => {
    if (!id) return;
    const ligaId = parseInt(id);
    obtenerLigaPorId(ligaId).then(setLiga);
    obtenerEquiposDeLiga(ligaId).then(setEquipos);
  }, [id]);

  if (!liga) return <p className="p-4 text-white">Cargando liga...</p>;

  return (
    <div className="p-6 bg-[#121212] min-h-screen">
      <h1 className="text-3xl font-bold text-[#d4af37] mb-2">{liga.nombre}</h1>
      <p className="text-gray-400 mb-6">
        País: <span className="text-white">{liga.pais}</span> | Tipo: <span className="text-white">{liga.tipo}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {equipos.map((equipo) => (
          <div
            key={equipo.id}
            className="bg-[#1a1a1a] rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 text-white text-center"
          >
            <img
              src={equipo.logo}
              alt={equipo.nombre}
              className="w-16 h-16 object-contain mx-auto mb-3 rounded"
              referrerPolicy="no-referrer"
            />
            <h2 className="text-lg font-semibold">{equipo.nombre}</h2>
            <p className="text-sm text-gray-400">País: {equipo.pais}</p>
            <Link
              to={`/equipos/${equipo.id}`}
              className="inline-block mt-3 px-4 py-1 bg-[#d4af37] text-black font-semibold rounded hover:bg-yellow-500 transition"
            >
              Ver plantilla
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LigaDetalle;
