import { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  const [search, setSearch] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="bg-[#1a1a1a] text-white px-4 py-3 shadow-md flex items-center justify-between sticky top-0 w-full z-50 h-23">
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="Logo"
          className="w-[160px] sm:w-[180px] lg:w-[200px] object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="relative hidden md:block w-1/3">
        <input
          type="text"
          placeholder="Buscar equipos, ligas, jugadores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#2B2B2B] text-sm text-white placeholder-gray-400 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#4CCC6C]"
        />
        <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-base" />
      </div>

      <nav className="hidden lg:flex gap-8 text-sm font-medium">
        <Link to="/" className="relative group transition text-white">
          Partidos
          <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#4CCC6C] group-hover:w-full transition-all duration-300"></span>
        </Link>

        <Link to="/equipos" className="relative group transition text-white">
          Equipos
          <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#4CCC6C] group-hover:w-full transition-all duration-300"></span>
        </Link>

        <Link to="/ligas" className="relative group transition text-white">
          Ligas
          <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#B08D57] group-hover:w-full transition-all duration-300"></span>
        </Link>
      </nav>

      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        className="lg:hidden text-white text-2xl focus:outline-none transition"
      >
        {menuAbierto ? <FaTimes /> : <FaBars />}
      </button>

      {menuAbierto && (
        <div className="absolute top-full left-0 w-full bg-[#1a1a1a] border-t border-[#2B2B2B] flex flex-col items-center gap-4 py-6 lg:hidden z-40 shadow-md animate-fade-in">
          <div className="w-11/12 relative">
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#2B2B2B] text-sm text-white placeholder-gray-400 rounded-full py-2 pl-10 pr-4 focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-base" />
          </div>
          <Link
            to="/"
            onClick={() => setMenuAbierto(false)}
            className="hover:text-[#4CCC6C] transition"
          >
            Partidos
          </Link>
          <Link
            to="/equipos"
            onClick={() => setMenuAbierto(false)}
            className="hover:text-[#4CCC6C] transition"
          >
            Equipos
          </Link>
          <Link
            to="/ligas"
            onClick={() => setMenuAbierto(false)}
            className="hover:text-[#B08D57] transition"
          >
            Ligas
          </Link>
        </div>
      )}
    </header>
  );
}
