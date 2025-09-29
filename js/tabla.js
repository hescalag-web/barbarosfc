fetch("data/tabla.json")
  .then(r => r.json())
  .then(data => {
    const tabla = document.getElementById("tabla");
    data.posiciones.forEach(eq => {
      tabla.innerHTML += `<p>${eq.equipo} - ${eq.puntos} pts</p>`;
    });

    const goleadores = document.getElementById("goleadores");
    data.goleadores.forEach(g => {
      goleadores.innerHTML += `<p>${g.jugador} - ${g.goles} goles</p>`;
    });
  });
