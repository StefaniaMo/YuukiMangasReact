import { useState } from "react";
import FormProducto from "./FormProducto";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, COLECCION_PRODUCTOS } from "../../firebase/config";

/**
 * Componente FormProductoContainer
 * Manejador del CRUD de productos (creación y edición) conectado a Firestore ("mangas").
 * Soporta carga de portadas a ImgBB mediante API key y validaciones de formulario.
 */
const estadoInicial = {
  nombre: "",
  precio: "",
  stock: "",
  categoria: "",
  descripcion: "",
  imagen: "",
};

const FormProductoContainer = ({ productoAEditar, onProductoAgregado }) => {
  const [datosForm, setDatosForm] = useState(() =>
    productoAEditar ? { ...estadoInicial, ...productoAEditar } : estadoInicial
  );
  const [imagen, setImagen] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});

  // Maneja la sincronización cuando cambia productoAEditar durante el renderizado (sin useEffect innecesario)
  const [prevProductoAEditar, setPrevProductoAEditar] = useState(productoAEditar);
  if (productoAEditar !== prevProductoAEditar) {
    setPrevProductoAEditar(productoAEditar);
    setDatosForm(
      productoAEditar ? { ...estadoInicial, ...productoAEditar } : estadoInicial
    );
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
    setImagen(archivo || null);
    if (archivo && errores.imagen) {
      setErrores((prev) => ({ ...prev, imagen: null }));
    }
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

    if (!productoAEditar && !imagen) {
      nuevosErrores.imagen = "Debes seleccionar una imagen para la portada.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const subirImagenImgbb = async (file) => {
    const apiKey =
      import.meta.env.VITE_IMGBB_API_KEY || "4bc89d90e5ba2ca799b0f1339650ce18";
    const formData = new FormData();
    formData.append("image", file);

    const respuesta = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const datos = await respuesta.json();
    if (!datos.success) {
      throw new Error("No se pudo subir la imagen a ImgBB.");
    }
    return datos.data.url;
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    if (!validarFormulario()) return;

    setCargando(true);

    try {
      let urlImagen = datosForm.imagen || "";

      // Si el usuario seleccionó un nuevo archivo de imagen
      if (imagen) {
        urlImagen = await subirImagenImgbb(imagen);
      }

      const datosAEnviar = {
        nombre: datosForm.nombre.trim(),
        descripcion: datosForm.descripcion.trim(),
        categoria: datosForm.categoria.trim(),
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock),
        imagen: urlImagen,
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
      setImagen(null);
    } catch (error) {
      console.error("Error al procesar producto:", error);
      alert("Hubo un error al guardar el producto en Firebase.");
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
        datosForm={datosForm}
        cargando={cargando}
        esEdicion={!!productoAEditar}
        errores={errores}
      />
    </div>
  );
};

export default FormProductoContainer;
