import { useState } from "react";
import FormProducto from "./FormProducto";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, COLECCION_PRODUCTOS } from "../../firebase/config";

/**
 * Componente FormProductoContainer
 * Manejador del CRUD de productos (creación y edición) conectado a Firestore ("mangas").
 * Soporta:
 * 1) Subida de archivo binario desde la PC hacia ImgBB (o fallback a Base64 si falla la API).
 * 2) Inserción directa de URL/enlace web de la imagen.
 */
const estadoInicial = {
  nombre: "",
  precio: "",
  stock: "",
  categoria: "",
  descripcion: "",
  imagen: "",
};

// API Key válida para el endpoint de ImgBB
const IMGBB_API_KEY_DEFAULT = "4bc89d90e5ba2ca799b0f1339650ce18";

const FormProductoContainer = ({ productoAEditar, onProductoAgregado }) => {
  const [datosForm, setDatosForm] = useState(() =>
    productoAEditar ? { ...estadoInicial, ...productoAEditar } : estadoInicial
  );
  const [imagenFile, setImagenFile] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});

  // Sincronización durante el renderizado si productoAEditar cambia externamente
  const [prevProductoAEditar, setPrevProductoAEditar] = useState(productoAEditar);
  if (productoAEditar !== prevProductoAEditar) {
    setPrevProductoAEditar(productoAEditar);
    setDatosForm(
      productoAEditar ? { ...estadoInicial, ...productoAEditar } : estadoInicial
    );
    setImagenFile(null);
    setErrores({});
  }

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: null }));
    }
  };

  const manejarCambioImagen = (evento) => {
    const archivo = evento.target.files && evento.target.files[0];
    setImagenFile(archivo || null);
    if (archivo && errores.imagen) {
      setErrores((prev) => ({ ...prev, imagen: null }));
    }
  };

  const eliminarImagenFile = () => {
    setImagenFile(null);
    const input = document.getElementById("file-upload");
    if (input) input.value = "";
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!datosForm.nombre?.trim()) {
      nuevosErrores.nombre = "El nombre del manga es obligatorio.";
    }

    if (!datosForm.precio) {
      nuevosErrores.precio = "El precio es obligatorio.";
    } else if (Number(datosForm.precio) <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor a 0.";
    }

    if (datosForm.stock === "" || datosForm.stock === undefined) {
      nuevosErrores.stock = "El stock es obligatorio.";
    } else if (Number(datosForm.stock) < 0) {
      nuevosErrores.stock = "El stock no puede ser un número negativo.";
    }

    if (!datosForm.categoria?.trim()) {
      nuevosErrores.categoria = "Debes ingresar una categoría o género.";
    }

    if (!datosForm.descripcion?.trim()) {
      nuevosErrores.descripcion = "La sinopsis o descripción es requerida.";
    }

    // Se requiere tener al menos o un archivo subido o una URL válida ingresada
    const tieneUrl = Boolean(datosForm.imagen?.trim());
    if (!productoAEditar && !imagenFile && !tieneUrl) {
      nuevosErrores.imagen =
        "Debes seleccionar una imagen desde tu PC o pegar el link de una URL.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Convierte un archivo local a Data URL Base64 como alternativa segura
  const convertirABase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const subirImagenImgbb = async (file) => {
    // Si la variable de entorno es una URL de perfil en vez de una clave alfanumérica, usamos la key por defecto
    const envKey = import.meta.env.VITE_IMGBB_API_KEY;
    const esClaveValida =
      envKey && !envKey.includes("http") && envKey.trim().length >= 20;
    const apiKey = esClaveValida ? envKey.trim() : IMGBB_API_KEY_DEFAULT;

    const formData = new FormData();
    formData.append("image", file);

    const respuesta = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const datos = await respuesta.json();
    if (!datos.success) {
      console.warn(
        "ImgBB falló:",
        datos.error?.message,
        "- Se usará Data URL Base64."
      );
      // Fallback: si ImgBB rechaza la imagen o el formato, convertimos a Base64 para no bloquear al usuario
      return await convertirABase64(file);
    }
    return datos.data.url;
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    if (!validarFormulario()) return;

    setCargando(true);

    try {
      let urlImagenFinal = datosForm.imagen?.trim() || "";

      // Si el usuario eligió un archivo desde su PC, intentamos subirlo a ImgBB
      if (imagenFile) {
        urlImagenFinal = await subirImagenImgbb(imagenFile);
      }

      const datosAEnviar = {
        nombre: datosForm.nombre.trim(),
        descripcion: datosForm.descripcion.trim(),
        categoria: datosForm.categoria.trim(),
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock),
        imagen: urlImagenFinal,
      };

      if (productoAEditar) {
        // Actualizar en Firestore
        const docRef = doc(db, COLECCION_PRODUCTOS, productoAEditar.id);
        await updateDoc(docRef, datosAEnviar);

        alert("¡Manga actualizado con éxito en Firestore!");
        if (onProductoAgregado) {
          onProductoAgregado({ id: productoAEditar.id, ...datosAEnviar }, true);
        }
      } else {
        // Crear nuevo en Firestore
        const docRef = await addDoc(
          collection(db, COLECCION_PRODUCTOS),
          datosAEnviar
        );

        alert("¡Manga publicado con éxito en Firestore!");
        if (onProductoAgregado) {
          onProductoAgregado({ id: docRef.id, ...datosAEnviar }, false);
        }
      }

      setDatosForm(estadoInicial);
      setImagenFile(null);
    } catch (error) {
      console.error("Error al procesar producto:", error);
      alert("Hubo un error al guardar el producto en Firebase: " + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w-full">
      <FormProducto
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        manejarCambioImagen={manejarCambioImagen}
        eliminarImagenFile={eliminarImagenFile}
        imagenFile={imagenFile}
        datosForm={datosForm}
        cargando={cargando}
        esEdicion={!!productoAEditar}
        errores={errores}
      />
    </div>
  );
};

export default FormProductoContainer;
