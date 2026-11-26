import FormProductoContainer from "../products/FormProductoContainer";

/**
 * Vista Publicar
 * Permite a los usuarios cargar mangas al catálogo directamente.
 * Usa el contenedor de formulario unificado en Tailwind CSS.
 */
const Publicar = () => {
  return (
    <div className="py-8 max-w-xl mx-auto px-4">
      <div className="bg-white border-2 border-[#BDD9A9] rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-2xl font-black text-[#A66946] text-center mb-1">
          📦 Publicar Manga
        </h2>
        <p className="text-xs text-stone-500 text-center mb-6">
          Completa los datos del tomo para sumarlo a la colección de YuukiMangas.
        </p>

        <FormProductoContainer />
      </div>
    </div>
  );
};

export default Publicar;
