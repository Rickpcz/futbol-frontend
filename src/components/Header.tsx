import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="bg-[#1a1a1a] text-white px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      <div className="">
        <img src={logo} alt="Logo" className=" w-[200px] object-contain" />
      </div>

      {/* Buscador */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#2B2B2B] text-sm text-white placeholder-gray-400 rounded-full py-2 pl-8 pr-4 focus:outline-none"
        />
        <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
      </div>

      {/* Navegación */}
      <nav className="flex gap-6 text-sm font-semibold">
        <a href="#" className="hover:text-green-400">Noticias</a>
        <a href="#" className="hover:text-green-400">Fichajes</a>
        <a href="#" className="hover:text-yellow-300">Acerca de nosotros</a>
      </nav>
    </header>
  );
}
