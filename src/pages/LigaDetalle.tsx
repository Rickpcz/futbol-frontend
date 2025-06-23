import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { obtenerTablaPorLigaYTemporada } from "../api/Tabla";
import { obtenerResumenTemporada } from "../api/ResumenTemporada";
import type { Standing } from "../types/Standing";
import ShimmerCardLista from "../components/ShimmerLoading";

const temporadasDisponibles = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];

export default function LigaDetalle() {
  const { id } = useParams<{ id: string }>();
  const [temporada, setTemporada] = useState<number>(2023);
  const [tabla, setTabla] = useState<Standing[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    const ligaId = parseInt(id);

    const cargarDatos = async () => {
      setCargando(true);
      try {
        const [tablaRes] = await Promise.all([
          obtenerTablaPorLigaYTemporada(ligaId, temporada).catch(() => []),
          obtenerResumenTemporada(ligaId, temporada).catch(() => null),
        ]);

        setTabla(tablaRes || []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [id, temporada]);

  return (
    <div className="bg-[#121212] text-white min-h-screen px-6 md:px-10 py-10 space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-[#B08D57]">
          Detalles de la Liga
        </h1>
        <div>
          <label className="block text-sm text-gray-400">
            Seleccionar temporada
          </label>
          <select
            value={temporada}
            onChange={(e) => setTemporada(Number(e.target.value))}
            className="bg-[#1C1C1C] text-white px-4 py-2 rounded-lg border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#B08D57] cursor-pointer"
          >
            {temporadasDisponibles.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </header>

      {cargando ? (
        <>
          <ShimmerCardLista cantidad={3} />
          <ShimmerCardLista cantidad={1} />
        </>
      ) : (
        <>
          {/* TABLA */}
          <section className="bg-[#1C1C1C] rounded-2xl p-5 shadow-lg w-full">
            <h2 className="text-xl font-semibold text-[#4CCC6C] mb-4">
              Tabla de posiciones ({temporada})
            </h2>
            {tabla.length === 0 ? (
              <p className="text-sm text-gray-400">
                No hay datos disponibles para esta temporada.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 border-b border-[#2a2a2a]">
                    <tr>
                      <th className="text-left py-2">#</th>
                      <th className="text-left py-2">Equipo</th>
                      <th className="text-center py-2">PTS</th>
                      <th className="text-center py-2">PJ</th>
                      <th className="text-center py-2">DG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabla.map((fila, i) => (
                      <tr
                        key={fila.equipo || i}
                        className="border-b border-[#2a2a2a] hover:bg-[#2A2A2A]"
                      >
                        <td className="py-2 font-bold text-[#B08D57]">
                          {i + 1}
                        </td>
                        <Link to={`/equipo/${fila.equipo}`}>
                          <td className="py-2 flex items-center gap-3 hover:scale-105 transition duration-300 cursor-pointer">
                            <img
                              src={fila.logo}
                              alt={String(
                                fila.nombreEquipo || fila.equipo || "Equipo"
                              )}
                              className="w-6 h-6 object-contain"
                            />
                            <span className="truncate">
                              {fila.nombreEquipo || fila.equipo || "Equipo"}
                            </span>
                          </td>
                        </Link>
                        <td className="text-center py-2">{fila.puntos}</td>
                        <td className="text-center py-2">
                          {fila.partidosJugados}
                        </td>
                        <td className="text-center py-2">
                          {fila.diferenciaGoles}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
