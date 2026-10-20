import { useState } from "react";

export function FormProducto({
  datosForm,
  cargando,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  imagenFile,
  eliminarImagenFile,
}) {
  // Estado local para alternar entre subida por archivo local o por URL
  const [tipoCargaImagen, setTipoCargaImagen] = useState("archivo"); // 'archivo' | 'url'
  return (
    <form
      onSubmit={manejarEnvio}
      style={{
        backgroundColor: "#F2E8C9",
        border: "2px solid #BDD9A9",
        borderRadius: "12px",
        padding: "2rem",
        maxWidth: "450px",
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h3
        style={{
          color: "#A66946",
          margin: "0 0 0.5rem 0",
          textAlign: "center",
        }}
      >
        📦 Publicar Manga
      </h3>
      {/* Título */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <label style={{ fontWeight: "bold", color: "#2d2623" }}>
          Título del Manga:
        </label>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: Naruto Vol. 1"
          value={datosForm.nombre}
          onChange={manejarCambio}
          required
          style={{
            padding: "0.6rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      {/* Género */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <label style={{ fontWeight: "bold", color: "#2d2623" }}>Género:</label>
        <input
          type="text"
          name="genero"
          placeholder="Ej: Shonen"
          value={datosForm.genero}
          onChange={manejarCambio}
          required
          style={{
            padding: "0.6rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      {/* Descripción */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        <label style={{ fontWeight: "bold", color: "#2d2623" }}>
          Descripción:
        </label>
        <textarea
          name="descripcion"
          placeholder="Ej: Tomo en excelente estado, editorial Ivrea..."
          value={datosForm.descripcion}
          onChange={manejarCambio}
          rows={3}
          required
          style={{
            padding: "0.6rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            resize: "vertical",
            fontFamily: "inherit",
          }}
        />
      </div>
      {/* Precio y Stock en línea */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
          }}
        >
          <label style={{ fontWeight: "bold", color: "#2d2623" }}>
            Precio ($):
          </label>
          <input
            type="number"
            name="precio"
            placeholder="12000"
            value={datosForm.precio}
            onChange={manejarCambio}
            required
            style={{
              padding: "0.6rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
          }}
        >
          <label style={{ fontWeight: "bold", color: "#2d2623" }}>Stock:</label>
          <input
            type="number"
            name="stock"
            placeholder="10"
            value={datosForm.stock}
            onChange={manejarCambio}
            required
            style={{
              padding: "0.6rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>
      </div>
      {/* --- SECCIÓN DE PORTADA / IMAGEN --- */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={{ fontWeight: "bold", color: "#2d2623" }}>
          Portada del Manga:
        </label>

        {/* Pestañas para elegir método de carga */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.2rem" }}>
          <button
            type="button"
            onClick={() => {
              setTipoCargaImagen("archivo");
              manejarCambio({ target: { name: "urlImagen", value: "" } });
            }}
            style={{
              flex: 1,
              padding: "0.4rem",
              borderRadius: "6px",
              border: "1px solid #A66946",
              backgroundColor:
                tipoCargaImagen === "archivo" ? "#A66946" : "transparent",
              color: tipoCargaImagen === "archivo" ? "#ffffff" : "#A66946",
              fontWeight: "bold",
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            📁 Archivo local
          </button>

          <button
            type="button"
            onClick={() => {
              setTipoCargaImagen("url");
              eliminarImagenFile();
            }}
            style={{
              flex: 1,
              padding: "0.4rem",
              borderRadius: "6px",
              border: "1px solid #A66946",
              backgroundColor:
                tipoCargaImagen === "url" ? "#A66946" : "transparent",
              color: tipoCargaImagen === "url" ? "#ffffff" : "#A66946",
              fontWeight: "bold",
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            🔗 Enlace / URL Web
          </button>
        </div>

        {/* Opción A: Cargar por Archivo */}
        {tipoCargaImagen === "archivo" && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <label
              htmlFor="file-upload"
              style={{
                backgroundColor: "#A66946",
                color: "#ffffff",
                padding: "0.55rem 0.9rem",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "0.9rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "inline-block",
              }}
            >
              Seleccionar imagen
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={manejarCambioImagen}
              style={{ display: "none" }}
            />

            {/* Nombre del archivo o estado de carga */}
            <span
              style={{
                fontSize: "0.85rem",
                color: imagenFile ? "#2d2623" : "#777",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "180px",
              }}
              title={imagenFile ? imagenFile.name : "Ninguna imagen cargada"}
            >
              {imagenFile ? imagenFile.name : "Ninguna imagen cargada"}
            </span>

            {/* Botón Eliminar Imagen */}
            {imagenFile && (
              <button
                type="button"
                onClick={eliminarImagenFile}
                title="Eliminar imagen seleccionada"
                style={{
                  backgroundColor: "#e74c3c",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "50%",
                  width: "26px",
                  height: "26px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  flexShrink: 0,
                }}
              >
                🗑️
              </button>
            )}
          </div>
        )}

        {/* Opción B: Cargar por URL de la web */}
        {tipoCargaImagen === "url" && (
          <input
            type="url"
            name="urlImagen"
            placeholder="https://ejemplo.com/imagen-manga.jpg"
            value={datosForm.urlImagen}
            onChange={manejarCambio}
            style={{
              padding: "0.6rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        )}

        {/* Vista previa en miniatura (si existe imagen subida o URL pegada) */}
        {(imagenFile || (tipoCargaImagen === "url" && datosForm.urlImagen)) && (
          <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
            <p
              style={{
                margin: "0 0 0.3rem 0",
                fontSize: "0.8rem",
                color: "#555",
              }}
            >
              Vista previa de portada:
            </p>
            <img
              src={
                imagenFile
                  ? URL.createObjectURL(imagenFile)
                  : datosForm.urlImagen
              }
              alt="Vista previa portada"
              style={{
                maxHeight: "120px",
                borderRadius: "8px",
                border: "2px solid #BDD9A9",
                objectFit: "cover",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Botón de Submit */}
      <button
        type="submit"
        disabled={cargando}
        style={{
          backgroundColor: "#A66946",
          color: "#ffffff",
          border: "none",
          padding: "0.8rem",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "1rem",
          cursor: cargando ? "not-allowed" : "pointer",
          marginTop: "0.5rem",
          opacity: cargando ? 0.7 : 1,
        }}
      >
        {cargando ? "Guardando..." : "Guardar en YuukiMangas"}
      </button>
    </form>
  );
}
