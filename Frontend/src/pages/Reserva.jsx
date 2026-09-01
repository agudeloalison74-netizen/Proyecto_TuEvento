import { useState } from "react";

function Reserva() {

  const [formulario, setFormulario] = useState({
    fecha_evento: "",
    hora_evento: "",
    numero_invitados: "",
    direccion_evento: "",
    descripcion_evento: "",
  });

  const handleChange = (e) => {

    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Datos de reserva:", formulario);

    alert("Reserva preparada correctamente.");

  };

  return (

    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="mb-4">
                Reservar servicio
              </h2>

              <p className="text-muted">
                Completa los datos de tu evento.
              </p>

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Fecha del evento
                    </label>

                    <input
                      type="date"
                      name="fecha_evento"
                      className="form-control"
                      value={formulario.fecha_evento}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Hora del evento
                    </label>

                    <input
                      type="time"
                      name="hora_evento"
                      className="form-control"
                      value={formulario.hora_evento}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Número de invitados
                  </label>

                  <input
                    type="number"
                    name="numero_invitados"
                    className="form-control"
                    min="1"
                    value={formulario.numero_invitados}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Dirección del evento
                  </label>

                  <input
                    type="text"
                    name="direccion_evento"
                    className="form-control"
                    value={formulario.direccion_evento}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Descripción
                  </label>

                  <textarea
                    name="descripcion_evento"
                    className="form-control"
                    rows="4"
                    value={formulario.descripcion_evento}
                    onChange={handleChange}
                  />

                </div>

                <button
                  type="submit"
                  className="btn"
                  style={{
                    backgroundColor: "#6C2BD9",
                    color: "#FFFFFF",
                  }}
                >
                  Continuar con la reserva
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Reserva;