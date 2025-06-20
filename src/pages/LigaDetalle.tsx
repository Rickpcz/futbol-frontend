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

  if (!liga) return <p className="p-4">Cargando liga...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{liga.nombre}</h1>
      <p className="text-gray-600 mb-6">País: {liga.pais} | Tipo: {liga.tipo}</p>

      <div className="grid md:grid-cols-3 gap-4">
        {equipos.map((equipo) => (
          <div key={equipo.id} className="border p-4 rounded shadow">
            <img src={equipo.logo} alt={equipo.nombre} className="h-16 object-contain mx-auto mb-2" referrerPolicy="no-referrer" />
            <h2 className="text-lg font-semibold text-center">{equipo.nombre}</h2>
            <p className="text-sm text-center text-gray-600">País: {equipo.pais}</p>
            <Link
              to={`/equipos/${equipo.id}`}
              className="block text-center mt-2 text-blue-500 underline"
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
