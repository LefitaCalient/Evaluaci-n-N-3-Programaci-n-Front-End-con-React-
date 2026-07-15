function TablaDesembarques({
  desembarques,
  seleccionarEditar,
  eliminarDesembarque,
  prioritarios,
  cambiarPrioridad
}) {

  return (
    <table>

      <thead>
        <tr>
          <th>ID</th>
          <th>Especie</th>
          <th>Embarcación</th>
          <th>Fecha</th>
          <th>Kilos</th>
          <th>Estado</th>
          <th>Prioridad</th>
          <th>Acciones</th>
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

  <td>
    <span className={`estado ${desembarque.estado}`}>
      {desembarque.estado}
    </span>
  </td>

  <td>
    <button
      onClick={() => cambiarPrioridad(desembarque.id)}
    >
      {prioritarios.includes(desembarque.id)
        ? "★ Prioritario"
        : "☆ Marcar"}
    </button>
  </td>

  <td>
    <button className="btn-editar"
  onClick={() =>
    seleccionarEditar(desembarque)
  }
>
  Editar
</button>


<button className="btn-eliminar"
  onClick={() =>
    eliminarDesembarque(desembarque.id)
  }
>
  Eliminar
</button>
  </td>

</tr>

        ))}

      </tbody>

    </table>
  );
}

export default TablaDesembarques;