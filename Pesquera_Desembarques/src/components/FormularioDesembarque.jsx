function FormularioDesembarque({
  nuevo,
  manejarCambio,
  guardarDesembarque,
  editando
}) {
  return (
    <form className="formulario" onSubmit={guardarDesembarque}>

      <input
        name="especie"
        placeholder="Especie"
        value={nuevo.especie}
        onChange={manejarCambio}
      />

      <input
        name="embarcacion"
        placeholder="Embarcación"
        value={nuevo.embarcacion}
        onChange={manejarCambio}
      />

      <input
        type="date"
        name="fecha"
        value={nuevo.fecha}
        onChange={manejarCambio}
      />

      <input
        type="number"
        name="kilos"
        placeholder="Kilos"
        value={nuevo.kilos}
        onChange={manejarCambio}
      />

      <select
        name="estado"
        value={nuevo.estado}
        onChange={manejarCambio}
      >
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

      <button type="submit">
        {editando
          ? "Actualizar desembarque"
          : "Agregar desembarque"}
      </button>

    </form>
  );
}

export default FormularioDesembarque;