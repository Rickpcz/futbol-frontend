import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white px-6 py-10">
      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row justify-between gap-10 mb-8">
        {/* Logo + descripción */}
        <div className="flex items-start gap-4">
          <img src={logo} alt="Logo" className="h-10 object-contain" />
          <p className="text-base font-semibold">
            FutbolData Clubes es tu fuente esencial para el análisis del fútbol.
          </p>
        </div>

        {/* Links principales */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <a href="#">Partidos</a>
          <a href="#">Equipos</a>
          <a href="#">Jugadores</a>
          <a href="#">Estadísticas</a>
          <a href="#">Trivias</a>
          <a href="#">Historia del Mundial</a>
          <a href="#">Comparaciones</a>
          <a href="#">Torneos</a>
          <a href="#">Ranking de clubes</a>
        </div>

      </div>

      {/* Footer inferior */}
      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} FutbolData Clubes. Todos los derechos reservados.</p>
        <div className="flex gap-6 mt-3 md:mt-0">
          <a href="#">Términos de uso</a>
          <a href="#">Política de privacidad</a>
          <a href="#">Cookies</a>
        </div>
        <div className="flex gap-4 mt-3 md:mt-0 text-white">
          <span className="font-semibold">Síguenos</span>
          <FaTiktok className="hover:text-gray-400 cursor-pointer" />
          <FaXTwitter className="hover:text-gary-400 cursor-pointer" />
          <FaFacebookF className="hover:text-gray-400 cursor-pointer" />
          <FaInstagram className="hover:text-gray-400 cursor-pointer" />
          <FaLinkedinIn className="hover:text-gray-400 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
