
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formJugadora");
  const lista = document.getElementById("listaJugadoras");
  let jugadoras = JSON.parse(localStorage.getItem("jugadoras")) || [];

  function render() {
    lista.innerHTML = "";
    jugadoras.forEach((j, i) => {
      const li = document.createElement("li");
      li.textContent = `${j.nombre} (${j.posicion} #${j.dorsal})`;
      const del = document.createElement("button");
      del.textContent = "❌";
      del.onclick = () => {
        jugadoras.splice(i, 1);
        localStorage.setItem("jugadoras", JSON.stringify(jugadoras));
        render();
      };
      li.appendChild(del);
      lista.appendChild(li);
    });
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const posicion = document.getElementById("posicion").value;
    const dorsal = document.getElementById("dorsal").value;
    jugadoras.push({ nombre, posicion, dorsal });
    localStorage.setItem("jugadoras", JSON.stringify(jugadoras));
    form.reset();
    render();
  };

  render();
});
