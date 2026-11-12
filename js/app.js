(() => {
  "use strict";

  const CLAVE = "biblioteca:reservados";
  const $ = (id) => document.getElementById(id);
  const catalogo = $("catalogo");
  const buscador = $("buscador");
  const genero = $("genero");
  const soloDisponibles = $("soloDisponibles");
  const contador = $("contador");

  // Reservas guardadas en el navegador
  let reservados = new Set();
  try {
    reservados = new Set(JSON.parse(localStorage.getItem(CLAVE)) || []);
  } catch (e) { /* sin almacenamiento disponible */ }

  const guardar = () => {
    try { localStorage.setItem(CLAVE, JSON.stringify([...reservados])); } catch (e) {}
  };

  const normalizar = (t) =>
    t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function llenarGeneros() {
    const generos = [...new Set(LIBROS.map((l) => l.genero))].sort();
    genero.innerHTML = '<option value="">Todos</option>' +
      generos.map((g) => `<option value="${g}">${g}</option>`).join("");
  }

  function crearTarjeta(libro) {
    const reservado = reservados.has(libro.id);
    const art = document.createElement("article");
    art.className = "libro";
    art.style.setProperty("--color", libro.color);
    art.innerHTML = `
      <div class="lomo" aria-hidden="true"></div>
      <div class="contenido">
        <h2></h2>
        <p class="autor"></p>
        <p class="meta">${libro.genero} · ${libro.anio}</p>
        <p class="estado ${reservado ? "reservado" : "disponible"}">
          ${reservado ? "Reservado por ti" : "Disponible"}
        </p>
        <button type="button" class="${reservado ? "secundario" : ""}" data-id="${libro.id}">
          ${reservado ? "Cancelar reserva" : "Reservar"}
        </button>
      </div>`;
    art.querySelector("h2").textContent = libro.titulo;
    art.querySelector(".autor").textContent = libro.autor;
    return art;
  }

  function mostrar() {
    const q = normalizar(buscador.value.trim());
    const lista = LIBROS.filter((l) => {
      const coincide = normalizar(l.titulo + " " + l.autor).includes(q);
      const generoOk = !genero.value || l.genero === genero.value;
      const dispOk = !soloDisponibles.checked || !reservados.has(l.id);
      return coincide && generoOk && dispOk;
    });

    catalogo.innerHTML = "";
    if (!lista.length) {
      catalogo.innerHTML = '<p class="vacio">No hay libros con esos filtros. Prueba con otro título o género.</p>';
    } else {
      lista.forEach((l) => catalogo.appendChild(crearTarjeta(l)));
    }
    contador.textContent = `${lista.length} de ${LIBROS.length} libros`;
  }

  catalogo.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-id]");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    reservados.has(id) ? reservados.delete(id) : reservados.add(id);
    guardar();
    mostrar();
  });

  [buscador, genero, soloDisponibles].forEach((el) =>
    el.addEventListener("input", mostrar)
  );

  llenarGeneros();
  mostrar();
})();
