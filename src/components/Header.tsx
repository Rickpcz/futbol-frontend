import { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  const [search, setSearch] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="bg-[#1a1a1a] text-white px-4 py-2 flex items-center justify-between sticky top-0 w-full z-50">
      <Link to="/">
        <div className="flex-shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="w-[160px] sm:w-[180px] lg:w-[200px] object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="relative hidden md:block w-1/3">
        <input
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#2B2B2B] text-sm text-white placeholder-gray-400 rounded-full py-2 pl-8 pr-4 focus:outline-none"
        />
        <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
      </div>

      <nav className="hidden lg:flex gap-6 text-sm font-semibold">
        <a href="#" className="hover:text-green-400">
          Partidos y Resultados
        </a>
        <Link
        to={"/equipos"}>
        <a className="hover:text-green-400">
          Equipos y Plantillas
        </a>
        </Link>
        <Link 
        to={"/ligas"}>
          <a className="hover:text-yellow-300">
            Ligas y Competencias
          </a>
        </Link>
      </nav>

      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        className="lg:hidden text-white text-xl focus:outline-none"
      >
        {menuAbierto ? <FaTimes /> : <FaBars />}
      </button>

      {menuAbierto && (
        <div className="absolute top-full left-0 w-full bg-[#1a1a1a] flex flex-col items-center gap-4 py-4 lg:hidden z-40">
          <div className="w-11/12 relative">
            <input
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#2B2B2B] text-sm text-white placeholder-gray-400 rounded-full py-2 pl-8 pr-4 focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
          </div>
          <a href="#" className="hover:text-green-400">
            Partidos y Resultados
          </a>
          <a href="#" className="hover:text-green-400">
            Equipos y Plantillas
          </a>
          <a href="#" className="hover:text-yellow-300">
            Ligas y Competencias
          </a>
        </div>
      )}
    </header>
  );
}
