
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAsistencia");
  const lista = document.getElementById("listaAsistencias");
  let asistencias = JSON.parse(localStorage.getItem("asistencias")) || [];

  function render() {
    lista.innerHTML = "";
    asistencias.forEach((a) => {
      const li = document.createElement("li");
      li.textContent = `${a.fecha} - ${a.jugadora}: ${a.estado}`;
      lista.appendChild(li);
    });
  }

  form.onsubmit = (ev) => {
    ev.preventDefault();
    const fecha = document.getElementById("fecha").value;
    const jugadora = document.getElementById("jugadora").value;
    const estado = document.getElementById("estado").value;
    asistencias.push({ fecha, jugadora, estado });
    localStorage.setItem("asistencias", JSON.stringify(asistencias));
    form.reset();
    render();
  };

  window.exportarAsistencia = function () {
    const resumen = {};

    asistencias.forEach(({ fecha, jugadora, estado }) => {
      const mes = fecha.slice(0, 7); // yyyy-mm
      const key = `${jugadora}_${mes}`;
      if (!resumen[key]) resumen[key] = { presente: 0, ausente: 0, justificado: 0 };
      if (estado === "Presente") resumen[key].presente++;
      if (estado === "Ausente") resumen[key].ausente++;
      if (estado === "Justificado") resumen[key].justificado++;
    });

    let csv = "Jugadora,Mes,Presente,Ausente,Justificado\n";
    for (const key in resumen) {
      const [jugadora, mes] = key.split("_");
      const r = resumen[key];
      csv += `${jugadora},${mes},${r.presente},${r.ausente},${r.justificado}\n`;
    }

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "asistencia_mensual.csv";
    a.click();
  };

  render();
});
