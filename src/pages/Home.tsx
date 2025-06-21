import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

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
import { FaSearch } from "react-icons/fa";

export default function HomePage() {
    const [ligas, setLigas] = useState<Liga[]>([]);
    const [equipos, setEquipos] = useState<Equipo[]>([]);
    const [partidosExternos, setPartidosExternos] = useState<PartidoExterno[]>([]);
    const [fichajes, setFichajes] = useState<Fichaje[]>([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(new Date());



    const cargarDatos = async (fecha: Date) => {
        const fechaStr = format(fecha, "yyyy-MM-dd");

        const [ligasRes, equiposRes, partidosRes, fichajesBase] = await Promise.all([
            obtenerLigas(),
            obtenerEquipos(),
            obtenerPartidosExternosPorFecha(fechaStr),
            obtenerFichajesRecientes()
        ]);

        setLigas(ligasRes);
        setEquipos(equiposRes);
        setPartidosExternos(partidosRes);

        const fichajesConFotos = await Promise.all(
            fichajesBase.slice(0, 5).map(async (fichaje) => {
                const foto = await obtenerFotoJugador(fichaje.title);
                return { ...fichaje, foto };
            })
        );

        setFichajes(fichajesConFotos);
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
        <div className="bg-black text-white min-h-screen px-4 py-10">


            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* IZQUIERDA - LIGAS */}
                <aside className="lg:col-span-1 bg-[#121212] rounded-xl p-4 shadow">
                    <h2 className="text-lg font-bold mb-3 text-[#B08D57]">Ligas populares</h2>
                    <ul className="space-y-5 text-sm">
                        {ligas.slice(0, 6).map((liga) => (
                            <li key={liga.id} className="flex items-center gap-2">
                                <img src={liga.logo} alt={liga.nombre} className="w-6 h-6 object-contain" />
                                {liga.nombre}
                            </li>
                        ))}
                    </ul>
                    <button className="mt-4 bg-[#4CCC6C] text-white text-sm px-4 py-1 rounded-full hover:bg-[#B08D57]">
                        Ver todas las ligas
                    </button>
                </aside>

                {/* CENTRO - PARTIDOS */}
                <main className="lg:col-span-2 space-y-6">
                    <div className="bg-[#1C1C1C] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 mb-6">
                        {/* Flechas y Fecha */}
                        <div className="flex items-center gap-2">
                            <button className="text-white bg-[#333] hover:bg-[#444] w-8 h-8 flex items-center justify-center rounded-full">&lt;</button>
                            <DatePicker
                                selected={fechaSeleccionada}
                                onChange={(date: Date | null) => {
                                    if (date) setFechaSeleccionada(date);
                                }}
                                dateFormat="dd/MM/yyyy"
                                className="bg-transparent text-white font-semibold text-lg text-center focus:outline-none"
                                calendarClassName="react-datepicker"
                            />
                            <button className="text-white bg-[#333] hover:bg-[#444] w-8 h-8 flex items-center justify-center rounded-full">&gt;</button>
                        </div>

                        {/* Filtros */}
                        <div className="flex flex-wrap gap-2 items-center">
                            <button className="bg-white text-black font-semibold px-4 py-1 rounded-full text-sm hover:bg-[#B08D57]">
                                En juego
                            </button>
                            <button className="bg-white text-black font-semibold px-4 py-1 rounded-full text-sm hover:bg-[#B08D57]">
                                En TV
                            </button>
                            <button className="bg-white text-black font-semibold px-4 py-1 rounded-full text-sm hover:bg-[#B08D57]">
                                Por horario
                            </button>

                            {/* Campo Filtro */}
                            <div className="flex items-center bg-[#2B2B2B] rounded-full px-3 py-1 gap-2">
                                <FaSearch className="text-gray-400 text-sm" />
                                <input
                                    type="text"
                                    placeholder="Filtro"
                                    className="bg-transparent text-white text-sm placeholder-gray-400 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {Object.entries(partidosPorLiga).map(([liga, juegos]) => (
                        <section key={liga} className="bg-[#1C1C1C] rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <img src={juegos[0].ligaLogo} alt={liga} className="w-5 h-5" />
                                <h2 className="font-semibold text-white">{liga}</h2>
                            </div>
                            <div className="space-y-2">
                                {juegos.map((p) => (
                                    <div key={p.idEvento} className="flex justify-between items-center bg-[#151515] px-4 py-2 rounded text-sm">
                                        <div className="flex items-center gap-2 w-1/3">
                                            <img src={p.logoLocal} alt={p.local} className="w-5 h-5" />
                                            <span className="truncate">{p.local}</span>
                                        </div>
                                        <div className="w-1/3 text-center text-[#B08D57] font-bold">
                                            {p.golesLocal !== null && p.golesVisitante !== null
                                                ? `${p.golesLocal} - ${p.golesVisitante}`
                                                : <span className="text-gray-400 font-normal">{p.hora}</span>}
                                        </div>
                                        <div className="flex items-center gap-2 justify-end w-1/3">
                                            <span className="truncate">{p.visitante}</span>
                                            <img src={p.logoVisitante} alt={p.visitante} className="w-5 h-5" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </main>

                {/* DERECHA - EQUIPOS Y FICHAJES */}
                <aside className="lg:col-span-1 space-y-6">
                    <section className="bg-[#1C1C1C] rounded-xl p-4">
                        <h2 className="text-[#B08D57] font-bold mb-2">Equipos Destacados</h2>
                        <ul className="space-y-2 text-sm">
                            {equipos.slice(0, 4).map((equipo) => (
                                <li key={equipo.id} className="flex items-center gap-2">
                                    <img src={equipo.logo} alt={equipo.nombre} className="w-6 h-6 object-contain" />
                                    {equipo.nombre}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-[#1C1C1C] rounded-xl p-4">
                        <h2 className="text-base font-bold mb-2 text-[#B08D57]">Noticias Rápidas</h2>
                        <ul className="space-y-2 text-sm">
                            {fichajes.map((fichaje, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    {fichaje.foto && (
                                        <img
                                            src={fichaje.foto}
                                            alt={fichaje.title}
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                    )}
                                    <a href={fichaje.url} target="_blank" rel="noreferrer" className="text-white hover:underline">
                                        {fichaje.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                </aside>

            </div>
        </div>
    );
}
