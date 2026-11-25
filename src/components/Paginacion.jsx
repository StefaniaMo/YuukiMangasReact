/**
 * Componente Paginacion
 * Provee controles visuales (flechas anterior/siguiente y botones numéricos de página)
 * Estilizado completamente con Tailwind CSS siguiendo la paleta del proyecto.
 */
const Paginacion = ({
  paginaActual = 1,
  totalPaginas = 1,
  alCambiarPagina,
  maximoVisibles = 5,
  deshabilitado = false,
}) => {
  // Asegura que al menos exista la página 1
  const totalSeguro = Math.max(1, totalPaginas);

  // Calcula el rango de páginas visibles centrado en la página actual
  const obtenerNumerosPagina = () => {
    const mitad = Math.floor(maximoVisibles / 2);
    let inicio = Math.max(1, paginaActual - mitad);
    let fin = Math.min(totalSeguro, inicio + maximoVisibles - 1);

    if (fin - inicio + 1 < maximoVisibles) {
      inicio = Math.max(1, fin - maximoVisibles + 1);
    }

    const paginas = [];
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  };

  const paginasVisibles = obtenerNumerosPagina();
  const anteriorDeshabilitado = deshabilitado || paginaActual <= 1;
  const siguienteDeshabilitado = deshabilitado || paginaActual >= totalSeguro;

  return (
    <nav
      className="flex items-center justify-center gap-1.5 my-8 select-none"
      aria-label="Paginación del catálogo"
    >
      {/* Botón Flecha Anterior */}
      <button
        type="button"
        onClick={() => alCambiarPagina(paginaActual - 1)}
        disabled={anteriorDeshabilitado}
        aria-label="Página anterior"
        className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-colors ${
          anteriorDeshabilitado
            ? "border-stone-200 text-stone-300 cursor-not-allowed bg-stone-50"
            : "border-[#A66946]/30 text-[#A66946] hover:bg-[#F2C5BB]/40 bg-white"
        }`}
      >
        &lt;
      </button>

      {/* Botones numéricos de página */}
      {paginasVisibles.map((numero) => {
        const esActiva = numero === paginaActual;
        return (
          <button
            key={numero}
            type="button"
            onClick={() => alCambiarPagina(numero)}
            disabled={deshabilitado}
            aria-current={esActiva ? "page" : undefined}
            className={`min-w-[36px] h-9 px-2 rounded-lg text-sm font-bold border transition-all ${
              esActiva
                ? "bg-[#A66946] text-white border-[#A66946] shadow-sm"
                : "bg-white text-stone-700 border-stone-200 hover:border-[#A66946]/50 hover:bg-[#F2C5BB]/20"
            } ${deshabilitado ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
          >
            {numero}
          </button>
        );
      })}

      {/* Botón Flecha Siguiente */}
      <button
        type="button"
        onClick={() => alCambiarPagina(paginaActual + 1)}
        disabled={siguienteDeshabilitado}
        aria-label="Página siguiente"
        className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-colors ${
          siguienteDeshabilitado
            ? "border-stone-200 text-stone-300 cursor-not-allowed bg-stone-50"
            : "border-[#A66946]/30 text-[#A66946] hover:bg-[#F2C5BB]/40 bg-white"
        }`}
      >
        &gt;
      </button>
    </nav>
  );
};

export default Paginacion;
