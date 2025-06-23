/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  obtenerEquipos,
  obtenerEquiposPorLiga,
  obtenerEquiposPorPais,
} from "../api/Equipo";
import { obtenerLigas } from "../api/Liga";
import type { Equipo } from "../types/Equipo";
import type { Liga } from "../types/Liga";
import { Link } from "react-router-dom";
import ShimmerCardLista from "../components/ShimmerLoading";

export default function EquiposPage() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [ligas, setLigas] = useState<Liga[]>([]);
  const [paises, setPaises] = useState<string[]>([]);
  const [ligaSeleccionada, setLigaSeleccionada] = useState<number | "">("");
  const [paisSeleccionado, setPaisSeleccionado] = useState<string>("");
  const [busqueda, setBusqueda] = useState<string>("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarInicial = async () => {
      setCargando(true);
      const [equiposData, ligasData] = await Promise.all([
        obtenerEquipos(),
        obtenerLigas(),
      ]);
      setEquipos(equiposData.data);
      setLigas(ligasData);

      const paisesUnicos = Array.from(
        new Set(equiposData.data.map((e: Equipo) => e.pais))
      ).filter(Boolean);
      setPaises(paisesUnicos);
      setCargando(false);
        };
        cargarInicial();
  }, []);

  const manejarFiltroPorLiga = async (ligaId: number) => {
    setCargando(true);
    setLigaSeleccionada(ligaId);
    setPaisSeleccionado("");
    setBusqueda("");
    const equiposPorLiga = await obtenerEquiposPorLiga(ligaId);
    setEquipos(equiposPorLiga);
    setCargando(false);
  };

  const manejarFiltroPorPais = async (pais: string) => {
    setCargando(true);
    setPaisSeleccionado(pais);
    setLigaSeleccionada("");
    setBusqueda("");
    const equiposPorPais = await obtenerEquiposPorPais(pais);
    setEquipos(equiposPorPais);
    setCargando(false);
  };

  const obtenerNombreLiga = (ligaId?: number) => {
    const liga = ligas.find((l) => l.id === ligaId);
    return liga?.nombre || "Sin liga";
  };

  const equiposFiltrados = equipos.filter((equipo) =>
    equipo.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="bg-black text-white min-h-screen px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* BARRA LATERAL */}
        <aside className="bg-[#121212] rounded-2xl p-6 shadow-lg space-y-6">
          <h2 className="text-[#B08D57] text-xl font-bold tracking-wide mb-2">
            Filtros
          </h2>

          {/* Filtro por liga */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Selecciona una Liga
            </label>
            <div className="relative">
              <select
                className="appearance-none w-full bg-[#1C1C1C] text-white px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08D57]"
                value={ligaSeleccionada}
                onChange={(e) => manejarFiltroPorLiga(Number(e.target.value))}
              >
                <option value="">-- Todas las ligas --</option>
                {ligas.map((liga) => (
                  <option key={liga.id} value={liga.id}>
                    {liga.nombre}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>

        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="lg:col-span-3">
          <h1 className="text-2xl font-bold mb-6 text-[#B08D57]">Equipos</h1>

          {/* Buscador */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar equipo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 bg-[#1C1C1C] text-white border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08D57] placeholder-gray-400"
            />
          </div>

          {/* Lista de equipos o shimmer */}
          {cargando ? (
            <ShimmerCardLista cantidad={4} />
          ) : equiposFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {equiposFiltrados.map((equipo) => (
                <Link
                  to={`/equipo/${equipo.id}`}
                  key={equipo.id}
                  className="bg-[#1C1C1C] rounded-xl p-4 flex flex-col items-center text-center hover:bg-[#2a2a2a] transition"
                >
                  <img
                    src={equipo.logo}
                    alt={equipo.nombre}
                    className="w-16 h-16 object-contain mb-2"
                  />
                  <h3 className="text-lg font-semibold">{equipo.nombre}</h3>
                  <p className="text-sm text-gray-400">{equipo.pais}</p>
                  <p className="text-sm text-[#B08D57]">
                    {obtenerNombreLiga(equipo.ligaId)}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">
              No se encontraron equipos que coincidan con la búsqueda.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
