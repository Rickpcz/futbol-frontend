import { useEffect, useState } from "react";
import { obtenerLigas } from "../api/Liga";
import type { Liga } from "../types/Liga";
import { Link } from "react-router-dom";
import ShimmerCardLista from "../components/ShimmerLoading";

const agruparPorLetra = (ligas: Liga[]) => {
  return ligas.reduce((acc: Record<string, Liga[]>, liga) => {
    const letra = liga.nombre.charAt(0).toUpperCase();
    if (!acc[letra]) acc[letra] = [];
    acc[letra].push(liga);
    return acc;
  }, {});
};

const Ligas = () => {
  const [ligas, setLigas] = useState<Liga[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerLigas();
      setLigas(data);
      setCargando(false);
    };
    cargar();
  }, []);

  const ligasFiltradas = ligas.filter((liga) =>
    liga.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  const ligasPorLetra = agruparPorLetra(ligasFiltradas);
  const letrasOrdenadas = Object.keys(ligasPorLetra).sort();

  if (cargando) {
    return (
      <div className="p-6 bg-[#121212] min-h-screen">
        <h1 className="text-3xl font-bold text-[#d4af37] mb-4">
          Ligas y Competencias
        </h1>
        <ShimmerCardLista cantidad={15} />
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#121212] min-h-screen">
      <h1 className="text-3xl font-bold text-[#d4af37] mb-4">
        Ligas y Competencias
      </h1>

      {/* Buscador */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar liga..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded bg-[#1f1f1f] text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Listado agrupado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {letrasOrdenadas.map((letra) => (
          <div key={letra}>
            <h2 className="text-xl font-bold text-[#d4af37] mb-2">{letra}</h2>
            {ligasPorLetra[letra].slice(0, 7).map((liga) => (
              <li key={liga.id} className="list-none">
                <Link
                  to={`/ligas/${liga.id}`}
                  className="flex items-center gap-3 px-3 py-1 rounded hover:bg-white transition hover:scale-105 transition-transform duration-300 group"
                >
                  <img
                    src={liga.logo}
                    alt={liga.nombre}
                    className="w-6 h-6 object-contain rounded"
                  />
                  <span className="text-sm font-medium text-gray-200 group-hover:text-black">
                    {liga.nombre}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ligas;
