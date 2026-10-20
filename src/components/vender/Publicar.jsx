import { FormProductoContainer } from "./FormProductoContainer";

const Publicar = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#-a66946] mb-2">
          Publicá tus Mangas en YuukiMangas 📦🌸
        </h1>
        <p className="text-slate-600">
          Completá los datos y subí la foto del tomo que querés publicar.
        </p>
      </div>

      {/* Renderizamos el formulario contenedor */}
      <FormProductoContainer />
    </div>
  );
};

export default Publicar;
