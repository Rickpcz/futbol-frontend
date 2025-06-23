import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  obtenerEquipoPorId,
  obtenerJugadoresDeEquipo,
  obtenerPartidosDeEquipo,
  obtenerEquipos,
} from "../api/Equipo";
import { obtenerLigaPorId } from "../api/Liga";
import type { Equipo } from "../types/Equipo";
import type { Jugador } from "../types/Jugador";
import type { Partido } from "../types/Partido";
import { format } from "date-fns";
import ShimmerCardLista from "../components/ShimmerLoading";

export default function DetalleEquipoPage() {
  const { id } = useParams();
  const [equipo, setEquipo] = useState<Equipo | null>(null);
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [liga, setLiga] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [equiposDic, setEquiposDic] = useState<
    Record<number, { nombre: string; logo: string }>
  >({});
  const [paginaActual, setPaginaActual] = useState(1);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [cargando, setCargando] = useState<boolean>(true);

  const partidosPorPagina = 5;

  const partidosOrdenados = [...partidos].sort((a, b) => {
    const fechaA = new Date(a.fecha).getTime();
    const fechaB = new Date(b.fecha).getTime();
    return ordenAscendente ? fechaA - fechaB : fechaB - fechaA;
  });

  const totalPaginas = Math.ceil(partidos.length / partidosPorPagina);
  const partidosPaginados = partidosOrdenados.slice(
    (paginaActual - 1) * partidosPorPagina,
    paginaActual * partidosPorPagina
  );

  useEffect(() => {
    const cargarEquipos = async () => {
      try {
        const equiposTodos = await obtenerEquipos();
        const dic: Record<number, { nombre: string; logo: string }> = {};
        equiposTodos.data.forEach((eq) => {
          dic[eq.id] = { nombre: eq.nombre, logo: eq.logo };
        });
        setEquiposDic(dic);
      } catch (err) {
        console.error("Error al cargar equipos:", err);
      }
    };
    cargarEquipos();
  }, []);

  useEffect(() => {
    const cargarDatos = async () => {
      if (!id) return;
      setCargando(true);
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

        let jugadoresData = await obtenerJugadoresDeEquipo(Number(id));
        if (jugadoresData.length === 0) {
          const res = await fetch(`/api/equipos/${id}/jugadores`);
          if (res.ok) {
            jugadoresData = await res.json();
          }
        }
        setJugadores(jugadoresData);

        const partidosData = await obtenerPartidosDeEquipo(Number(id));
        setPartidos(partidosData);
      } catch {
        setError("No se pudo cargar la información del equipo.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [id]);

  return (
    <div className="bg-black text-white min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {equipo ? (
          <>
            <div className="bg-[#1C1C1C] rounded-xl p-6 flex flex-col items-center text-center">
              <img
                src={equipo.logo}
                alt={equipo.nombre}
                className="w-24 h-24 object-contain mb-4"
              />
              <h1 className="text-3xl font-bold text-[#B08D57]">
                {equipo.nombre}
              </h1>
              <p className="text-gray-400">{equipo.pais}</p>
              <p className="text-sm text-[#B08D57]">{liga}</p>
            </div>

            <section className="bg-[#121212] rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#B08D57] mb-4">
                Plantilla
              </h2>
              {cargando ? (
                <ShimmerCardLista cantidad={5} />
              ) : jugadores.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {jugadores.map((jugador) => (
                    <div
                      key={jugador.id}
                      className="bg-[#1C1C1C] rounded-lg p-3 text-center hover:scale-105 transition duration-300 cursor-pointer"
                    >
                      <img
                        src={jugador.foto}
                        alt={jugador.nombre}
                        className="w-16 h-16 mx-auto rounded-full object-cover mb-2"
                      />
                      <h3 className="text-sm font-semibold">
                        {jugador.nombre}
                      </h3>
                      <p className="text-xs text-gray-400">
                        #{jugador.numero} | {jugador.posicion}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No hay jugadores registrados.</p>
              )}
            </section>

            <section className="bg-[#121212] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#B08D57]">
                  Partidos Recientes
                </h2>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition 
                    ${
                      ordenAscendente
                        ? "bg-[#B08D57] text-black border-[#B08D57] hover:bg-[#d1b07a]"
                        : "bg-[#232323] text-[#B08D57] border-[#B08D57] hover:bg-[#B08D57] hover:text-black"
                    }`}
                  onClick={() => setOrdenAscendente(!ordenAscendente)}
                  title="Cambiar orden de fecha"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 transition-transform ${
                      ordenAscendente ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span>
                    Fecha: {ordenAscendente ? "Ascendente" : "Descendente"}
                  </span>
                </button>
              </div>
              {cargando ? (
                <ShimmerCardLista cantidad={3} />
              ) : partidos.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
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
                            <td className="px-4 py-2">
                              {format(new Date(p.fecha), "dd/MM/yyyy")}
                            </td>

                            {/* EQUIPO LOCAL */}
                            <td className="px-4 py-2 flex items-center gap-2">
                              {equiposDic[p.equipoLocalId] ? (
                                <>
                                  <img
                                    src={equiposDic[p.equipoLocalId].logo}
                                    className="w-6 h-6 object-contain"
                                  />
                                  <span>
                                    {equiposDic[p.equipoLocalId].nombre}
                                  </span>
                                </>
                              ) : (
                                <span className="text-gray-500 italic">
                                  Cargando...
                                </span>
                              )}
                            </td>

                            {/* MARCADOR */}
                            <td className="px-4 py-2">
                              {p.golesLocal !== null &&
                              p.golesVisitante !== null
                                ? `${p.golesLocal} - ${p.golesVisitante}`
                                : "-"}
                            </td>

                            {/* EQUIPO VISITANTE */}
                            <td className="px-4 py-2 flex items-center gap-2">
                              {equiposDic[p.equipoVisitanteId] ? (
                                <>
                                  <img
                                    src={equiposDic[p.equipoVisitanteId].logo}
                                    className="w-6 h-6 object-contain"
                                  />
                                  <span>
                                    {equiposDic[p.equipoVisitanteId].nombre}
                                  </span>
                                </>
                              ) : (
                                <span className="text-gray-500 italic">
                                  Cargando...
                                </span>
                              )}
                            </td>

                            {/* ESTADO */}
                            <td className="px-4 py-2">
                              {typeof p.estado === "object"
                                ? p.estado?.short || p.estado?.long || ""
                                : p.estado || "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({ length: totalPaginas }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setPaginaActual(i + 1)}
                        className={`px-3 py-1 rounded text-sm ${
                          paginaActual === i + 1
                            ? "bg-[#B08D57] text-black"
                            : "bg-[#1C1C1C] text-white"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-400">No hay partidos registrados.</p>
              )}
            </section>
          </>
        ) : (
          <ShimmerCardLista cantidad={2} />
        )}
      </div>
    </div>
  );
}
