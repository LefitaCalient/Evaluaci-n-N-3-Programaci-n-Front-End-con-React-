import { useEffect, useState } from "react";
import "./App.css";
import FormularioDesembarque from "./components/FormularioDesembarque";
import TablaDesembarques from "./components/TablaDesembarques";

function App() {
  const [desembarques, setDesembarques] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [nuevo, setNuevo] = useState({
  especie: "",
  embarcacion: "",
  fecha: "",
  kilos: "",
  estado: "pendiente"
});
  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [prioritarios, setPrioritarios] = useState(() => {
    const guardados = localStorage.getItem("prioritarios");

    return guardados
      ? JSON.parse(guardados)
      : [];
  });

  useEffect(() => {
    obtenerDesembarques();
  }, []);

  const obtenerDesembarques = async () => {
    try {
      const respuesta = await fetch(
        `${import.meta.env.VITE_API_URL}/desembarques`
);

      if (!respuesta.ok) {
        throw new Error("Error al obtener datos");
      }

      const datos = await respuesta.json();

      setDesembarques(datos);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

const eliminarDesembarque = async (id) => {
  try {
    await fetch(
      `${import.meta.env.VITE_API_URL}/desembarques/${id}`,
      {
        method: "DELETE",
      }
    );

    setDesembarques(
      desembarques.filter(
        (desembarque) => desembarque.id !== id
      )
    );

  } catch (error) {
    console.log("Error al eliminar:", error);
  }
};

const manejarCambio = (e) => {
  setNuevo({
    ...nuevo,
    [e.target.name]: e.target.value
  });
};

const seleccionarEditar = (desembarque) => {
  setNuevo({
    especie: desembarque.especie,
    embarcacion: desembarque.embarcacion,
    fecha: desembarque.fecha,
    kilos: desembarque.kilos,
    estado: desembarque.estado
  });

  setEditando(desembarque.id);
};

const actualizarDesembarque = async (e) => {
  e.preventDefault();

  if (
  !nuevo.especie ||
  !nuevo.embarcacion ||
  !nuevo.fecha ||
  !nuevo.kilos
) {
  alert("Todos los campos son obligatorios");
  return;
}

if (Number(nuevo.kilos) <= 0) {
  alert("Los kilos deben ser mayores a 0");
  return;
}

  try {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_URL}/desembarques/${editando}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...nuevo,
          kilos: Number(nuevo.kilos)
        })
      }
    );

    const actualizado = await respuesta.json();

    setDesembarques(
      desembarques.map((desembarque) =>
        desembarque.id === editando
          ? actualizado
          : desembarque
      )
    );

    setNuevo({
      especie: "",
      embarcacion: "",
      fecha: "",
      kilos: "",
      estado: "pendiente"
    });

    setEditando(null);

  } catch (error) {
    console.log("Error al actualizar:", error);
  }
};

const agregarDesembarque = async (e) => {
  e.preventDefault();

  if (
  !nuevo.especie ||
  !nuevo.embarcacion ||
  !nuevo.fecha ||
  !nuevo.kilos
) {
  alert("Todos los campos son obligatorios");
  return;
}

if (Number(nuevo.kilos) <= 0) {
  alert("Los kilos deben ser mayores a 0");
  return;
}

  try {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_URL}/desembarques`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...nuevo,
          kilos: Number(nuevo.kilos)
        })
      }
    );

    const datoCreado = await respuesta.json();

    setDesembarques([
      ...desembarques,
      datoCreado
    ]);

    setNuevo({
      especie: "",
      embarcacion: "",
      fecha: "",
      kilos: "",
      estado: "pendiente"
    });

  } catch (error) {
    console.log("Error al agregar:", error);
  }
};

  if (cargando) {
      return <h2>Cargando desembarques...</h2>;
    }

    if (error) {
      return <h2>{error}</h2>;
    }

const totalDesembarques = desembarques.length;

const totalKilos = desembarques.reduce(
  (total, desembarque) =>
    total + Number(desembarque.kilos),
  0
);

const cantidadProcesados = desembarques.filter(
  (desembarque) =>
    desembarque.estado === "procesado"
).length;

const cantidadPendientes = desembarques.filter(
  (desembarque) =>
    desembarque.estado === "pendiente"
).length;

const cantidadRechazados = desembarques.filter(
  (desembarque) =>
    desembarque.estado === "rechazado"
).length;

  const cantidadPrioritarios = prioritarios.length;

    const desembarquesFiltrados = desembarques.filter(
  (desembarque) => {

    const coincideBusqueda =
      desembarque.especie
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      desembarque.embarcacion
        .toLowerCase()
        .includes(busqueda.toLowerCase());


    const coincideEstado =
      estadoFiltro === "todos" ||
      desembarque.estado === estadoFiltro;


    return coincideBusqueda && coincideEstado;
  }
);

const cambiarPrioridad = (id) => {
  let nuevosPrioritarios;

  if (prioritarios.includes(id)) {
    nuevosPrioritarios = prioritarios.filter(
      (prioridad) => prioridad !== id
    );
  } else {
    nuevosPrioritarios = [
      ...prioritarios,
      id
    ];
  }

  setPrioritarios(nuevosPrioritarios);

  localStorage.setItem(
    "prioritarios",
    JSON.stringify(nuevosPrioritarios)
  );
};

  return (
    <div className="contenedor">
      <h1>Registro de Desembarques Pesqueros</h1>

      <div className="estadisticas">

  <div>
    <h3>Total registros</h3>
    <p>{totalDesembarques}</p>
  </div>

  <div>
    <h3>Total kilos</h3>
    <p>{totalKilos.toLocaleString()}</p>
  </div>

  <div>
    <h3>Procesados</h3>
    <p>{cantidadProcesados}</p>
  </div>

  <div>
    <h3>Pendientes</h3>
    <p>{cantidadPendientes}</p>
  </div>

  <div>
    <h3>Rechazados</h3>
    <p>{cantidadRechazados}</p>
  </div>

  <div>
  <h3>Prioritarios</h3>
  <p>{cantidadPrioritarios}</p>
  </div>

</div>

      <input
        className="busqueda"
        type="text"
        placeholder="🔍 Buscar especie o embarcación..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <select
        value={estadoFiltro}
        onChange={(e) => setEstadoFiltro(e.target.value)}
      >

        <option value="todos">
          Todos
        </option>

        <option value="procesado">
          Procesado
        </option>

        <option value="pendiente">
          Pendiente
        </option>

        <option value="rechazado">
          Rechazado
        </option>

      </select>

    <FormularioDesembarque
  nuevo={nuevo}
  manejarCambio={manejarCambio}
  guardarDesembarque={
    editando
      ? actualizarDesembarque
      : agregarDesembarque
  }
  editando={editando}
/>

      {
  desembarquesFiltrados.length > 0 ? (
    <TablaDesembarques
      desembarques={desembarquesFiltrados}
      seleccionarEditar={seleccionarEditar}
      eliminarDesembarque={eliminarDesembarque}
      prioritarios={prioritarios}
      cambiarPrioridad={cambiarPrioridad}
    />
  ) : (
    <h3>No se encontraron desembarques.</h3>
  )
}
    </div>
  );
}

export default App;