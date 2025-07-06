
document.addEventListener('DOMContentLoaded', () => {
  const mostrarFormularioBtn = document.getElementById('mostrarFormularioBtn');
  const formulario = document.getElementById('formularioEquipo');

  mostrarFormularioBtn.addEventListener('click', () => {
    formulario.style.display = formulario.style.display === 'none' ? 'block' : 'none';
  });

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const equipo = {
      id: Date.now(),
      nombre: document.getElementById('nombre').value,
      club: document.getElementById('club').value,
      categoria: document.getElementById('categoria').value,
      pabellon: document.getElementById('pabellon').value,
      federacion: document.getElementById('federacion').value,
      temporada: document.getElementById('temporada').value,
      foto: document.getElementById('foto').value
    };
    let equipos = JSON.parse(localStorage.getItem('equipos')) || [];
    equipos.push(equipo);
    localStorage.setItem('equipos', JSON.stringify(equipos));
    formulario.reset();
    formulario.style.display = 'none';
    mostrarEquipos();
  });

  mostrarEquipos();
});

function mostrarEquipos() {
  const lista = document.getElementById('listaEquipos');
  const equipos = JSON.parse(localStorage.getItem('equipos')) || [];
  lista.innerHTML = '';
  equipos.forEach(eq => {
    const div = document.createElement('div');
    div.className = 'equipo-card';
    div.innerHTML = `
      <div>
        <strong>${eq.nombre}</strong> (${eq.temporada})
        <br/><small>${eq.club} – ${eq.categoria}</small>
      </div>
      <div class="acciones">
        <button class="entrar-btn" onclick="entrarEquipo(${eq.id})">Entrar</button>
        <button class="btn-mini btn-editar" onclick="editarEquipo(${eq.id})">✏️</button>
        <button class="btn-mini btn-eliminar" onclick="eliminarEquipo(${eq.id})">🗑️</button>
      </div>
    `;
    lista.appendChild(div);
  });
}

function entrarEquipo(id) {
  localStorage.setItem('equipoActivo', id);
  window.location.href = 'dashboard.html';
}

function eliminarEquipo(id) {
  let equipos = JSON.parse(localStorage.getItem('equipos')) || [];
  equipos = equipos.filter(eq => eq.id !== id);
  localStorage.setItem('equipos', JSON.stringify(equipos));
  mostrarEquipos();
}

function editarEquipo(id) {
  alert('Función para editar el equipo próximamente disponible.');
}
