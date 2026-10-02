const Asistentes = ({ personas }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
      {personas.map((persona, index) => (
        <li
          key={index}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3"
        >
          <span className="text-3xl">{persona.emoji || "👤"}</span>
          <div>
            <h4 className="font-bold ">{persona.nombre}</h4>
            <p className="text-sm ">{persona.tarea}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Asistentes;
