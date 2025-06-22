import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

import { obtenerLigas } from "../api/Liga";
import { obtenerEquipos } from "../api/Equipo";
import { obtenerPartidosExternosPorFecha } from "../api/PartidosExternos";
import { obtenerFichajesRecientes } from "../api/Transfers";
import { obtenerFotoJugador } from "../api/Transferencias";

import type { Liga } from "../types/Liga";
import type { Equipo } from "../types/Equipo";
import type { PartidoExterno } from "../types/PartidosExternos";
import type { Fichaje } from "../types/Fichaje";

import "../datepicker-custom.css";
import ShimmerCardLista from "../components/ShimmerLoading";

export default function HomePage() {
  const [ligas, setLigas] = useState<Liga[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [partidosExternos, setPartidosExternos] = useState<PartidoExterno[]>([]);
  const [fichajes, setFichajes] = useState<Fichaje[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(new Date());
  const [cargandoPartidos, setCargandoPartidos] = useState(true);

  const cargarDatos = async (fecha: Date) => {
    setCargandoPartidos(true);
    const fechaStr = format(fecha, "yyyy-MM-dd");

    const [ligasRes, equiposRes, partidosRes, fichajesBase] = await Promise.all(
      [
        obtenerLigas(),
        obtenerEquipos(),
        obtenerPartidosExternosPorFecha(fechaStr),
        obtenerFichajesRecientes(),
      ]
    );

setLigas(ligasRes);
setEquipos(equiposRes.data); // 🔧 aquí estaba el error
setPartidosExternos(partidosRes);


    const fichajesConFotos = await Promise.all(
      fichajesBase.slice(0, 5).map(async (fichaje) => {
        const foto = await obtenerFotoJugador(fichaje.title);
        return { ...fichaje, foto };
      })
    );

    setFichajes(fichajesConFotos);
    setCargandoPartidos(false);
  };

  useEffect(() => {
    cargarDatos(fechaSeleccionada);
  }, [fechaSeleccionada]);

  const partidosPorLiga = partidosExternos.reduce((acc, partido) => {
    const key = partido.liga;
    if (!acc[key]) acc[key] = [];
    acc[key].push(partido);
    return acc;
  }, {} as Record<string, PartidoExterno[]>);

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* IZQUIERDA */}
        <aside className="md:col-span-3 bg-[#121212] rounded-2xl p-5 shadow-xl">
          <h2 className="text-lg font-bold mb-4 text-[#B08D57]">Ligas populares</h2>
          {ligas.length === 0 ? (
            <ShimmerCardLista cantidad={6} />
          ) : (
            <ul className="space-y-4 text-sm">
              {ligas.slice(0, 6).map((liga) => (
                <li
                  key={liga.id}
                  className="flex items-center gap-3 cursor-pointer hover:text-[#B08D57] hover:scale-105 transition duration-300"
                >
                  <Link to={`/ligas/${liga.id}`} className="flex items-center gap-3">
                    <img src={liga.logo} alt={liga.nombre} className="w-6 h-6 object-contain" />
                    {liga.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link to="/ligas">
            <button className="mt-5 w-full bg-[#4CCC6C] text-white text-sm px-4 py-2 rounded-full hover:bg-[#B08D57] transition">
              Ver todas las ligas
            </button>
          </Link>
        </aside>

        {/* CENTRO */}
        <main className="md:col-span-6 space-y-6">
          <div className="bg-[#1C1C1C] rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-2">
              <button className="text-white bg-[#333] hover:bg-[#444] w-8 h-8 flex items-center justify-center rounded-full">&lt;</button>
              <DatePicker
                selected={fechaSeleccionada}
                onChange={(date: Date | null) => date && setFechaSeleccionada(date)}
                dateFormat="dd/MM/yyyy"
                className="bg-transparent text-white font-semibold text-lg text-center focus:outline-none"
                calendarClassName="react-datepicker"
              />
              <button className="text-white bg-[#333] hover:bg-[#444] w-8 h-8 flex items-center justify-center rounded-full">&gt;</button>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {["En juego", "En TV", "Por horario"].map((filtro, i) => (
                <button key={i} className="bg-white text-black font-semibold px-4 py-1 rounded-full text-sm hover:bg-[#B08D57]">{filtro}</button>
              ))}
              <div className="flex items-center bg-[#2B2B2B] rounded-full px-3 py-1 gap-2">
                <FaSearch className="text-gray-400 text-sm" />
                <input type="text" placeholder="Filtro" className="bg-transparent text-white text-sm placeholder-gray-400 focus:outline-none" />
              </div>
            </div>
          </div>

          {cargandoPartidos ? (
            <ShimmerCardLista cantidad={5} />
          ) : (
            Object.entries(partidosPorLiga).map(([liga, juegos]) => (
              <section key={liga} className="bg-[#1C1C1C] rounded-2xl p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <img src={juegos[0].ligaLogo} alt={liga} className="w-5 h-5" />
                  <h2 className="font-semibold text-white">{liga}</h2>
                </div>
                <div className="space-y-3">
                  {juegos.map((p) => (
                    <Link
                      to={`/partidos/${p.idEvento}`}
                      key={p.idEvento}
                      className="flex justify-between items-center bg-[#151515] px-4 py-3 rounded-xl text-sm hover:bg-[#222] hover:scale-105 transition duration-300 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 w-1/3">
                        <img src={p.logoLocal} alt={p.local} className="w-5 h-5" />
                        <span className="truncate">{p.local}</span>
                      </div>
                      <div className="w-1/3 text-center text-[#B08D57] font-bold">
                        {p.golesLocal !== null && p.golesVisitante !== null ? (
                          `${p.golesLocal} - ${p.golesVisitante}`
                        ) : (
                          <span className="text-gray-400 font-normal">{p.hora}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 justify-end w-1/3">
                        <span className="truncate">{p.visitante}</span>
                        <img src={p.logoVisitante} alt={p.visitante} className="w-5 h-5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          )}
        </main>

        {/* DERECHA */}
        <aside className="md:col-span-3 space-y-6">
          <section className="bg-[#1C1C1C] rounded-2xl p-5 shadow-xl">
            <h2 className="text-[#B08D57] font-bold mb-4">Equipos Destacados</h2>
            {equipos.length === 0 ? (
              <ShimmerCardLista cantidad={4} />
            ) : (
              <ul className="space-y-3 text-sm">
                {equipos.slice(0, 4).map((equipo) => (
                  <li key={equipo.id} className="flex items-center gap-3">
                    <Link to={`/equipo/${equipo.id}`} className="flex items-center gap-3 hover:text-[#B08D57] hover:scale-105 transition duration-300 cursor-pointer">
                      <img src={equipo.logo} alt={equipo.nombre} className="w-6 h-6 object-contain" />
                      {equipo.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="bg-[#1C1C1C] rounded-2xl p-5 shadow-xl">
            <h2 className="text-base font-bold mb-4 text-[#B08D57]">Noticias Rápidas</h2>
            {fichajes.length === 0 ? (
              <ShimmerCardLista cantidad={5} />
            ) : (
              <ul className="space-y-3 text-sm">
                {fichajes.map((fichaje, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {fichaje.foto && (
                      <img src={fichaje.foto} alt={fichaje.title} className="w-6 h-6 rounded-full object-cover" />
                    )}
                    <a href={fichaje.url} target="_blank" rel="noreferrer" className="text-white hover:underline">
                      {fichaje.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
