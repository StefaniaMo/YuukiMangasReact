import { useState } from "react";

/**
 * Componente FormProducto
 * Formulario controlado para dar de alta o editar un manga en Firebase.
 * Permite seleccionar el método de carga de portada:
 * 1) Archivo local desde la PC (subido a ImgBB)
 * 2) Enlace directo / URL Web de la imagen
 * Estilizado completamente con Tailwind CSS.
 */
const FormProducto = ({
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  eliminarImagenFile,
  imagenFile,
  datosForm,
  cargando,
  esEdicion,
  errores = {},
}) => {
  // Pestaña activa para la portada: 'archivo' | 'url'
  const [tipoCargaImagen, setTipoCargaImagen] = useState(() => {
    // Si viene una URL precargada y no hay archivo, arrancamos en 'url'
    return datosForm.imagen && !imagenFile ? "url" : "archivo";
  });

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

      {/* Categoría / Género */}
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

      {/* Descripción / Sinopsis */}
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

      {/* --- SECCIÓN DE PORTADA: ARCHIVO O LINK WEB --- */}
      <div className="flex flex-col gap-2 p-3 bg-stone-50 border border-stone-200 rounded-xl">
        <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
          Portada del Manga *
        </label>

        {/* Pestañas para elegir: Archivo local o URL */}
        <div className="grid grid-cols-2 gap-2 mb-1">
          <button
            type="button"
            onClick={() => setTipoCargaImagen("archivo")}
            className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-colors ${
              tipoCargaImagen === "archivo"
                ? "bg-[#A66946] text-white border-[#A66946] shadow-sm"
                : "bg-white text-stone-600 border-stone-300 hover:bg-stone-100"
            }`}
          >
            📁 Subir archivo desde PC
          </button>
          <button
            type="button"
            onClick={() => {
              setTipoCargaImagen("url");
              if (eliminarImagenFile) eliminarImagenFile();
            }}
            className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-colors ${
              tipoCargaImagen === "url"
                ? "bg-[#A66946] text-white border-[#A66946] shadow-sm"
                : "bg-white text-stone-600 border-stone-300 hover:bg-stone-100"
            }`}
          >
            🔗 Pegar enlace / URL web
          </button>
        </div>

        {/* Opción A: Archivo local desde la PC */}
        {tipoCargaImagen === "archivo" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <label
                htmlFor="file-upload"
                className="px-3 py-1.5 bg-[#A66946] hover:bg-[#8e5737] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm"
              >
                Elegir imagen...
              </label>
              <input
                id="file-upload"
                name="imagen"
                type="file"
                accept="image/*"
                onChange={manejarCambioImagen}
                className="hidden"
              />

              <span className="text-xs text-stone-600 truncate max-w-[200px]">
                {imagenFile ? imagenFile.name : "Ningún archivo seleccionado"}
              </span>

              {imagenFile && (
                <button
                  type="button"
                  onClick={eliminarImagenFile}
                  title="Quitar archivo"
                  className="w-6 h-6 rounded-full bg-red-100 text-red-600 hover:bg-red-200 text-xs font-bold flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Opción B: Enlace / URL Web directo */}
        {tipoCargaImagen === "url" && (
          <div className="flex flex-col gap-1">
            <input
              name="imagen"
              type="url"
              placeholder="https://ejemplo.com/portada-manga.jpg"
              value={datosForm.imagen || ""}
              onChange={manejarCambio}
              className={`w-full px-3 py-2 border rounded-lg text-sm bg-white transition-colors focus:outline-none ${
                errores.imagen
                  ? "border-red-500 bg-red-50 focus:ring-1 focus:ring-red-500"
                  : "border-stone-300 focus:border-[#A66946] focus:ring-1 focus:ring-[#A66946]"
              }`}
            />
            <span className="text-[11px] text-stone-400">
              Pega el link directo a una imagen (jpg, png, webp).
            </span>
          </div>
        )}

        {errores.imagen && (
          <span className="text-xs text-red-600 font-semibold">{errores.imagen}</span>
        )}

        {/* Vista previa en miniatura (archivo cargado o URL ingresada) */}
        {(imagenFile || (tipoCargaImagen === "url" && datosForm.imagen)) && (
          <div className="mt-2 pt-2 border-t border-stone-200 flex items-center gap-3">
            <img
              src={
                imagenFile
                  ? URL.createObjectURL(imagenFile)
                  : datosForm.imagen
              }
              alt="Vista previa de portada"
              className="w-14 h-20 object-cover rounded-lg border-2 border-[#BDD9A9] shadow-sm bg-white"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="text-xs text-stone-500">
              <p className="font-bold text-stone-700">Vista previa de la portada</p>
              <p className="text-[11px]">
                {imagenFile ? "Archivo listo para subir a ImgBB" : "Cargando desde URL"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botón Submit */}
      <button
        type="submit"
        disabled={cargando}
        className="mt-2 w-full py-2.5 px-4 bg-[#A66946] hover:bg-[#8e5737] disabled:bg-stone-300 text-white font-bold rounded-xl text-sm shadow hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
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
