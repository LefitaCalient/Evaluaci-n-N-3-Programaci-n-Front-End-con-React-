import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [desembarques, setDesembarques] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerDesembarques();
  }, []);

  const obtenerDesembarques = async () => {
    try {
      const respuesta = await fetch(
        "https://automatic-space-invention-q7qqrqgqgvpjh97rv-3001.app.github.dev/desembarques"
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

  if (cargando) {
    return <h2>Cargando desembarques...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="contenedor">
      <h1>Registro de Desembarques Pesqueros</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Especie</th>
            <th>Embarcación</th>
            <th>Fecha</th>
            <th>Kilos</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {desembarques.map((desembarque) => (
            <tr key={desembarque.id}>
              <td>{desembarque.id}</td>
              <td>{desembarque.especie}</td>
              <td>{desembarque.embarcacion}</td>
              <td>{desembarque.fecha}</td>
              <td>{desembarque.kilos}</td>
              <td>{desembarque.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;