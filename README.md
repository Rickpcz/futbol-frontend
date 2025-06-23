# Futbol Data Clubes – Frontend ⚽

Este proyecto es el **frontend** del sistema “Futbol Data Clubes”, desarrollado en **React + TypeScript**, que consume una API REST propia construida en .NET 8. Su propósito es mostrar información en tiempo real y/o almacenada de equipos, partidos, ligas, fichajes, estadísticas y más.

---

## Tecnologías utilizadas

- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **React Router DOM**
- **Axios**
- **react-loading-skeleton**
- **React DatePicker**
- **Vite**

---

## Características del sistema
- Visualización de partidos con filtros por fecha, estado y búsqueda por nombre de equipo.

- Calendario interactivo con selección de fecha y navegación día a día.

- Estadísticas completas del último partido de cada liga (campeón, goleador, asistidor).

- Vista detallada por liga con tabla de posiciones (soporte para grupos como en Champions).

- Vista de equipos con jugadores actuales y sus fotos oficiales.

- Shimmer/Skeleton loading para mejorar experiencia de carga.

- Integración con API propia (MundialClubesApi) que cachea datos de API-Football.

- Diseño moderno inspirado en plataformas como FotMob y OneFootball.

##  Funcionalidades principales

###  1. Página de inicio (Home)
- Filtros por estado del partido: En juego, Finalizados, Por jugar.
- Calendario para cambiar de fecha.
- Renderizado de partidos agrupados por liga.
- Noticias rápidas de fichajes recientes.
- Equipos destacados del día.

###  2. Sección de Ligas
- Vista de todas las ligas agrupadas alfabéticamente.
- Vista de detalle de una liga:
  - Tabla de posiciones de la última temporada.
  - Fichajes recientes de la liga.
  - Jugadores destacados con foto.
  - Resumen de la temporada: campeón, mejor goleador, asistidor y resultado del último partido.

###  3. Sección de Equipos
- Vista de equipos por liga o por país.
- Página individual de equipo:
  - Logo, nombre, país.
  - Plantilla actual (jugadores con posición, número, foto).


---

## Instrucciones para ejecutar el proyecto

### 1. Clonar repositorio

```bash
git clone https://github.com/Rickpcz/futbol-frontend.git
cd futbol-frontend
```

### 2. Instalar dependencias

```bash
npm install
```


> Asegúrate que tu backend está corriendo en ese puerto.

### 4. Ejecutar proyecto

```bash
npm run dev
```

---

## Estructura de carpetas

```
src/
│
├── api/                # Archivos Axios para consumir endpoints
├── assets/             # Imágenes y logos
├── components/         # Componentes reutilizables
├── pages/              # Vistas completas: Home, LigaDetalle, etc.
├── types/              # Tipado global de objetos
├── App.tsx             # Rutas generales
├── main.tsx            # Punto de entrada
└── ...

```

---

## Notas adicionales


- Se implementa almacenamiento temporal en base de datos para evitar múltiples llamadas a la API externa.
- Skeleton loading en componentes críticos como partidos y noticias.
- Proyecto optimizado para visualización en dispositivos móviles.

---

## Autor

**Ricardo Puc Cime** – Desarrollador Fullstack
**Eduardo Cong Torres** – Desarrollador Fullstack
**Daniel Cocom Baeza** – Desarrollador Fullstack

Este proyecto fue desarrollado como parte de una práctica académica, con enfoque en consumo de API, diseño responsivo, almacenamiento en caché, y arquitectura limpia de frontend.

---

📌 Proyecto complementario: [MundialClubesApi (backend)](https://github.com/Rickpcz/MundialClubesApi)