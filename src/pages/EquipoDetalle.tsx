import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  obtenerEquipoPorId,
  obtenerJugadoresDeEquipo,
  obtenerPartidosDeEquipo
} from "../api/Equipo";
import { obtenerLigaPorId } from "../api/Liga";
import type { Equipo } from "../types/Equipo";
import type { Jugador } from "../types/Jugador";
import type { Partido } from "../types/Partido";
import { format } from "date-fns";

export default function DetalleEquipoPage() {
  const { id } = useParams();
  const [equipo, setEquipo] = useState<Equipo | null>(null);
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [liga, setLiga] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [equiposDic, setEquiposDic] = useState<Record<number, { nombre: string; logo: string }>>({});
  const [cargandoEquipos, setCargandoEquipos] = useState<boolean>(true);
  const [cargandoEquipoInfo, setCargandoEquipoInfo] = useState<boolean>(true);
  const [cargandoJugadores, setCargandoJugadores] = useState<boolean>(true);

  const [paginaActualPartidos, setPaginaActualPartidos] = useState(1);
  const partidosPorPagina = 5;
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  const [paginaActualJugadores, setPaginaActualJugadores] = useState(1);
  const jugadoresPorPagina = 10;
  const [posicionFiltro, setPosicionFiltro] = useState<string>("Todos");

  const posicionesUnicas = Array.from(new Set(jugadores.map(j => j.posicion)));

  const jugadoresFiltrados = posicionFiltro === "Todos"
    ? jugadores
    : jugadores.filter(j => j.posicion === posicionFiltro);

  const totalPaginasJugadores = Math.ceil(jugadoresFiltrados.length / jugadoresPorPagina);
  const jugadoresPaginados = jugadoresFiltrados.slice(
    (paginaActualJugadores - 1) * jugadoresPorPagina,
    paginaActualJugadores * jugadoresPorPagina
  );

  const partidosOrdenados = [...partidos].sort((a, b) => {
    const fechaA = new Date(a.fecha).getTime();
    const fechaB = new Date(b.fecha).getTime();
    return ordenAscendente ? fechaA - fechaB : fechaB - fechaA;
  });

  const totalPaginasPartidos = Math.ceil(partidos.length / partidosPorPagina);
  const partidosPaginados = partidosOrdenados.slice(
    (paginaActualPartidos - 1) * partidosPorPagina,
    paginaActualPartidos * partidosPorPagina
  );

  useEffect(() => {
    const cargarDatos = async () => {
      if (!id) return;

      try {
        const equipoData = await obtenerEquipoPorId(Number(id));
        setEquipo(equipoData);

        if (equipoData.ligaId) {
          try {
            const ligaData = await obtenerLigaPorId(equipoData.ligaId);
            setLiga(ligaData.nombre);
          } catch {
            setLiga("Sin liga");
          }
        }
        setCargandoEquipoInfo(false);

        try {
          const jugadoresData = await obtenerJugadoresDeEquipo(Number(id));
          setJugadores(jugadoresData);
        } catch {
          setJugadores([]);
        }
        setCargandoJugadores(false);

        try {
          const partidosData = await obtenerPartidosDeEquipo(Number(id));
          setPartidos(partidosData);

          const idsEquipos = new Set<number>();
          partidosData.forEach(p => {
            idsEquipos.add(p.equipoLocalId);
            idsEquipos.add(p.equipoVisitanteId);
          });

          const dic: Record<number, { nombre: string; logo: string }> = {};
          for (const equipoId of idsEquipos) {
            try {
              const eq = await obtenerEquipoPorId(equipoId);
              dic[equipoId] = { nombre: eq.nombre, logo: eq.logo };
            } catch {
              dic[equipoId] = { nombre: `Equipo ${equipoId}`, logo: "" };
            }
          }
          setEquiposDic(dic);
        } catch {
          setPartidos([]);
        }
        setCargandoEquipos(false);
      } catch {
        setError("No se pudo cargar la información del equipo.");
        setCargandoEquipos(false);
        setCargandoEquipoInfo(false);
        setCargandoJugadores(false);
      }
    };

    cargarDatos();
  }, [id]);

  return (
    <div className="bg-black text-white min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {error && <p className="text-red-500 text-center">{error}</p>}

        <section className="bg-[#121212] rounded-xl p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#B08D57]">Información del Equipo</h2>
          </div>
          {cargandoEquipoInfo ? (
            <div className="animate-pulse space-y-4">
              <div className="w-24 h-24 bg-[#1C1C1C] rounded-full mx-auto" />
              <div className="h-6 bg-[#1C1C1C] rounded w-2/3 mx-auto" />
              <div className="h-4 bg-[#1C1C1C] rounded w-1/3 mx-auto" />
            </div>
          ) : (
            equipo && (
              <div className="text-center">
                <img src={equipo.logo} alt={equipo.nombre} className="w-24 h-24 object-contain mx-auto mb-2" />
                <h1 className="text-2xl font-bold text-[#B08D57]">{equipo.nombre}</h1>
                <p className="text-gray-400">{equipo.pais}</p>
                <p className="text-sm text-[#B08D57]">{liga}</p>
              </div>
            )
          )}
        </section>

        <section className="bg-[#121212] rounded-xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#B08D57]">Plantilla</h2>
            <select
              value={posicionFiltro}
              onChange={(e) => {
                setPosicionFiltro(e.target.value);
                setPaginaActualJugadores(1);
              }}
              className="bg-[#1C1C1C] border border-[#B08D57] text-white px-3 py-1 rounded"
            >
              <option value="Todos">Todas las posiciones</option>
              {posicionesUnicas.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          {cargandoJugadores ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-pulse">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="bg-[#1C1C1C] h-24 rounded"></div>
              ))}
            </div>
          ) : (
            jugadoresFiltrados.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {jugadoresPaginados.map(j => (
                    <div key={j.id} className="bg-[#1C1C1C] p-3 rounded">
                      <img src={j.foto} alt={j.nombre} className="w-16 h-16 mx-auto rounded-full object-cover mb-2" />
                      <h3 className="text-sm font-semibold text-center">{j.nombre}</h3>
                      <p className="text-xs text-center text-gray-400">#{j.numero} | {j.posicion}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: totalPaginasJugadores }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPaginaActualJugadores(i + 1)}
                      className={`px-3 py-1 rounded text-sm ${paginaActualJugadores === i + 1 ? "bg-[#B08D57] text-black" : "bg-[#1C1C1C] text-white"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-400">No hay jugadores registrados.</p>
            )
          )}
        </section>

        <section className="bg-[#121212] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#B08D57]">Partidos Recientes</h2>
            <button
              className="px-4 py-1 border border-[#B08D57] rounded text-[#B08D57] hover:bg-[#B08D57] hover:text-black"
              onClick={() => setOrdenAscendente(!ordenAscendente)}
            >
              Fecha: {ordenAscendente ? "Asc" : "Desc"}
            </button>
          </div>
          <div className="overflow-x-auto">
            {cargandoEquipos ? (
              <div className="animate-pulse space-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex gap-4 bg-[#1C1C1C] rounded h-10"></div>
                ))}
              </div>
            ) : (
              <>
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#1C1C1C] text-[#B08D57]">
                    <tr>
                      <th className="px-4 py-2">Fecha</th>
                      <th className="px-4 py-2">Local</th>
                      <th className="px-4 py-2">Marcador</th>
                      <th className="px-4 py-2">Visitante</th>
                      <th className="px-4 py-2">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partidosPaginados.map((p) => (
                      <tr key={p.id} className="border-t border-[#2A2A2A]">
                        <td className="px-4 py-2">{format(new Date(p.fecha), "dd/MM/yyyy")}</td>
                        <td className="px-4 py-2 flex items-center gap-2">
                          {equiposDic[p.equipoLocalId]?.logo && (
                            <img src={equiposDic[p.equipoLocalId].logo} alt="" className="w-6 h-6 object-contain" />
                          )}
                          {equiposDic[p.equipoLocalId]?.nombre || p.equipoLocalId}
                        </td>
                        <td className="px-4 py-2">{
                          p.golesLocal !== null && p.golesVisitante !== null
                            ? `${p.golesLocal} - ${p.golesVisitante}`
                            : "-"
                        }</td>
                        <td className="px-4 py-2 flex items-center gap-2">
                          {equiposDic[p.equipoVisitanteId]?.logo && (
                            <img src={equiposDic[p.equipoVisitanteId].logo} alt="" className="w-6 h-6 object-contain" />
                          )}
                          {equiposDic[p.equipoVisitanteId]?.nombre || p.equipoVisitanteId}
                        </td>
                        <td className="px-4 py-2">{
                          typeof p.estado === "object"
                            ? (p.estado?.short || p.estado?.long || "")
                            : (p.estado || "N/A")
                        }</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: totalPaginasPartidos }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPaginaActualPartidos(i + 1)}
                      className={`px-3 py-1 rounded text-sm ${paginaActualPartidos === i + 1 ? "bg-[#B08D57] text-black" : "bg-[#1C1C1C] text-white"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
