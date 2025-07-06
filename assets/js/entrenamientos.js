
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formEntrenamiento");
  const lista = document.getElementById("listaEntrenamientos");
  let entrenamientos = JSON.parse(localStorage.getItem("entrenamientos")) || [];

  function render() {
    lista.innerHTML = "";
    entrenamientos.forEach((e, i) => {
      const li = document.createElement("li");
      li.textContent = `${e.fecha} - ${e.nombre}`;
      lista.appendChild(li);
    });
  }

  form.onsubmit = (ev) => {
    ev.preventDefault();
    const fecha = document.getElementById("fecha").value;
    const archivo = document.getElementById("archivoPDF").files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = () => {
        entrenamientos.push({ fecha, nombre: archivo.name, data: reader.result });
        localStorage.setItem("entrenamientos", JSON.stringify(entrenamientos));
        form.reset();
        render();
      };
      reader.readAsDataURL(archivo);
    }
  };

  window.exportarEntrenamientos = function () {
    let csv = "Fecha,Nombre de archivo\n";
    entrenamientos.forEach(e => {
      csv += `${e.fecha},${e.nombre}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "entrenamientos.csv";
    a.click();
  };

  render();
});
