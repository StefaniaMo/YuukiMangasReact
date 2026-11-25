const TarjetaContacto = ({ persona }) => {
  const { nombre, puesto, email, foto } = persona;

  return (
    <div className="bg-white border-2 border-[#BDD9A9] rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-3">
      <img
        src={foto}
        alt={nombre}
        // Imagen por defecto si no encuentra la foto local
        className="w-20 h-20 rounded-full object-cover border-2 border-[#A66946]"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/80?text=Perfil";
        }}
      />

      <div className="flex flex-col items-center">
        <h4 className="m-0 text-[#2d2623] text-base font-bold">{nombre}</h4>

        <span className="mt-1 bg-[#F2C5BB] text-[#A66946] px-2.5 py-0.5 rounded-full text-xs font-semibold">
          {puesto}
        </span>

        <p className="mt-2 text-xs text-stone-500">
          ✉️{" "}
          <a
            href={`mailto:${email}`}
            className="text-[#A66946] hover:underline transition-colors"
          >
            {email}
          </a>
        </p>
      </div>
    </div>
  );
};

export default TarjetaContacto;
