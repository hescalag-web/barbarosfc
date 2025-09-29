fetch("data/fixture.json")
  .then(r => r.json())
  .then(partidos => {
    const container = document.getElementById("fixture");
    partidos.forEach(p => {
      container.innerHTML += `<p>${p.fecha} - ${p.rival} : ${p.resultado}</p>`;
    });
  });
