
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formEvaluacion");
  const lista = document.getElementById("listaEvaluaciones");
  let evaluaciones = JSON.parse(localStorage.getItem("evaluaciones")) || [];

  function render() {
    lista.innerHTML = "";
    evaluaciones.forEach((e, i) => {
      const li = document.createElement("li");
      li.textContent = `${e.fecha} - ${e.jugadora}: ${e.nota}`;
      lista.appendChild(li);
    });
  }

  form.onsubmit = (ev) => {
    ev.preventDefault();
    const fecha = document.getElementById("fecha").value;
    const jugadora = document.getElementById("jugadora").value;
    const nota = document.getElementById("nota").value;
    evaluaciones.push({ fecha, jugadora, nota });
    localStorage.setItem("evaluaciones", JSON.stringify(evaluaciones));
    form.reset();
    render();
  };

  render();
});
