/**
 * Componente FormProducto
 * Formulario controlado para dar de alta o editar un manga en Firebase.
 * Traducido íntegramente a Tailwind CSS con validaciones y feedback de errores.
 */
const FormProducto = ({
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  datosForm,
  cargando,
  esEdicion,
  errores = {},
}) => {
  return (
    <form onSubmit={manejarEnvio} noValidate className="flex flex-col gap-4">
      {/* Campo Título / Nombre */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
          Título del Manga *
        </label>
        <input
          name="nombre"
          type="text"
          placeholder="Ej: Jujutsu Kaisen Vol. 1"
          value={datosForm.nombre || ""}
          onChange={manejarCambio}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none ${
            errores.nombre
              ? "border-red-500 bg-red-50 focus:ring-1 focus:ring-red-500"
              : "border-stone-300 focus:border-[#A66946] focus:ring-1 focus:ring-[#A66946]"
          }`}
        />
        {errores.nombre && (
          <span className="text-xs text-red-600 font-semibold">{errores.nombre}</span>
        )}
      </div>

      {/* Precio y Stock en 2 columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Precio */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
            Precio (AR$) *
          </label>
          <input
            name="precio"
            type="number"
            placeholder="Ej: 12000"
            value={datosForm.precio || ""}
            onChange={manejarCambio}
            className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none ${
              errores.precio
                ? "border-red-500 bg-red-50 focus:ring-1 focus:ring-red-500"
                : "border-stone-300 focus:border-[#A66946] focus:ring-1 focus:ring-[#A66946]"
            }`}
          />
          {errores.precio && (
            <span className="text-xs text-red-600 font-semibold">{errores.precio}</span>
          )}
        </div>

        {/* Stock */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
            Stock disponible *
          </label>
          <input
            name="stock"
            type="number"
            placeholder="Ej: 15"
            value={datosForm.stock !== undefined ? datosForm.stock : ""}
            onChange={manejarCambio}
            className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none ${
              errores.stock
                ? "border-red-500 bg-red-50 focus:ring-1 focus:ring-red-500"
                : "border-stone-300 focus:border-[#A66946] focus:ring-1 focus:ring-[#A66946]"
            }`}
          />
          {errores.stock && (
            <span className="text-xs text-red-600 font-semibold">{errores.stock}</span>
          )}
        </div>
      </div>

      {/* Categoría */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
          Categoría / Género *
        </label>
        <input
          name="categoria"
          type="text"
          placeholder="Ej: Shonen, Seinen, Shojo..."
          value={datosForm.categoria || ""}
          onChange={manejarCambio}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none ${
            errores.categoria
              ? "border-red-500 bg-red-50 focus:ring-1 focus:ring-red-500"
              : "border-stone-300 focus:border-[#A66946] focus:ring-1 focus:ring-[#A66946]"
          }`}
        />
        {errores.categoria && (
          <span className="text-xs text-red-600 font-semibold">{errores.categoria}</span>
        )}
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
          Sinopsis / Descripción *
        </label>
        <textarea
          name="descripcion"
          rows={3}
          placeholder="Escribe la sinopsis o detalles del tomo..."
          value={datosForm.descripcion || ""}
          onChange={manejarCambio}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none resize-y ${
            errores.descripcion
              ? "border-red-500 bg-red-50 focus:ring-1 focus:ring-red-500"
              : "border-stone-300 focus:border-[#A66946] focus:ring-1 focus:ring-[#A66946]"
          }`}
        />
        {errores.descripcion && (
          <span className="text-xs text-red-600 font-semibold">{errores.descripcion}</span>
        )}
      </div>

      {/* Portada / Imagen */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
          {esEdicion ? "Actualizar Portada (Opcional)" : "Portada del Manga *"}
        </label>
        <input
          name="imagen"
          type="file"
          accept="image/*"
          onChange={manejarCambioImagen}
          className="w-full text-xs text-stone-500 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#A66946] file:text-white hover:file:bg-[#8e5737] cursor-pointer"
        />
        {errores.imagen && (
          <span className="text-xs text-red-600 font-semibold">{errores.imagen}</span>
        )}

        {/* Vista previa en caso de edición */}
        {esEdicion && datosForm.imagen && (
          <div className="mt-2 flex items-center gap-3 p-2 bg-stone-50 rounded-lg border border-stone-200">
            <img
              src={datosForm.imagen}
              alt="Vista previa actual"
              className="w-12 h-16 object-cover rounded border border-stone-300"
            />
            <span className="text-xs text-stone-500">Imagen actual registrada</span>
          </div>
        )}
      </div>

      {/* Botón Submit */}
      <button
        type="submit"
        disabled={cargando}
        className="mt-2 w-full py-2.5 px-4 bg-[#A66946] hover:bg-[#8e5737] disabled:bg-stone-300 text-white font-bold rounded-xl text-sm shadow hover:shadow-md transition-all flex items-center justify-center gap-2"
      >
        {cargando ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Guardando en Firebase...</span>
          </>
        ) : esEdicion ? (
          "Guardar Cambios"
        ) : (
          "Publicar Manga"
        )}
      </button>
    </form>
  );
};

export default FormProducto;
