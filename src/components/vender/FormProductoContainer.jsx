import { useState } from "react";
import { FormProducto } from "./FormProducto";

export function FormProductoContainer() {
  // 1. Estado para los campos de texto y número
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    genero: "",
    descripcion: "",
    precio: "",
    stock: "",
    urlImagen: "",
  });

  // 2. Estado para el archivo binario de la imagen
  const [imagenFile, setImagenFile] = useState(null);

  // 3. Estado de carga para dar feedback al usuario
  const [cargando, setCargando] = useState(false);

  // Maneja el cambio de los inputs de texto/número mediante la propiedad 'name'
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm({
      ...datosForm,
      [name]: value,
    });
  };

  // Captura el archivo seleccionado del input type="file"
  const manejarCambioImagen = (evento) => {
    if (evento.target.files && evento.target.files[0]) {
      setImagenFile(evento.target.files[0]);
    }
  };
  // Función para borrar la imagen de la computadora elegida
  const eliminarImagenFile = () => {
    setImagenFile(null);
    const fileInput = document.getElementById("file-upload");
    if (fileInput) fileInput.value = "";
  };
  // Procesa la subida a ImgBB y la consolidación de los datos
  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    // Validar que se haya subido un archivo O pegado un enlace
    if (!imagenFile && !datosForm.urlImagen.trim()) {
      alert("Por favor, selecciona un archivo o ingresa la URL de la portada.");
      return;
    }

    setCargando(true);

    try {
      let urlFinalImagen = datosForm.urlImagen.trim();

      // Si seleccionó archivo local, se sube primero a ImgBB
      if (imagenFile) {
        // Lee la API Key desde el archivo .env
        const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

        if (!apiKey) {
          throw new Error(
            "No se encontró la VITE_IMGBB_API_KEY en el archivo .env",
          );
        }
        // Crea el objeto FormData para enviar el archivo
        const formData = new FormData();
        formData.append("image", imagenFile);

        const respuestaImgbb = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formData,
          },
        );

        const datosImgbb = await respuestaImgbb.json();

        if (datosImgbb.success) {
          urlFinalImagen = datosImgbb.data.url;
        } else {
          throw new Error("Error al subir la imagen a ImgBB.");
        }
      }

      // Estructura completa lista para publicar o enviar al servidor
      const productoCompleto = {
        nombre: datosForm.nombre,
        genero: datosForm.genero,
        descripcion: datosForm.descripcion,
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock),
        urlImagen: urlFinalImagen,
      };

      console.log("✅ Producto procesado con éxito:", productoCompleto);
      alert(
        `¡El manga "${productoCompleto.nombre}" fue publicado correctamente!`,
      );

      // Limpieza del formulario
      setDatosForm({
        nombre: "",
        genero: "",
        descripcion: "",
        precio: "",
        stock: "",
        urlImagen: "",
      });
      eliminarImagenFile();
    } catch (error) {
      console.error("Error durante la publicación:", error);
      alert(
        "Hubo un error al procesar la imagen. Revisa los datos ingresados.",
      );
    } finally {
      setCargando(false);
    }
  };

  // Renderiza el componente presentacional pasando props y estados
  return (
    <FormProducto
      datosForm={datosForm}
      cargando={cargando}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
      imagenFile={imagenFile}
      eliminarImagenFile={eliminarImagenFile}
    />
  );
}
