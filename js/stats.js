// js/stats.js
// Funciones compartidas para leer archivos CSV (fixtures, goleadores,
// estadísticas) y pintarlos como tablas o como el cuadro de estadísticas.
// La idea de este archivo es que index.html, statistics.html y
// tournaments.html llamen a estas mismas funciones en vez de repetir el
// código de lectura de CSV en cada página.

// ---- Lectura de CSV ----
// Convierte el texto de un CSV en filas-objeto usando la cabecera como
// nombre de columna (en MAYÚSCULAS, sin espacios), así no importa el
// orden de las columnas ni si el archivo usa "Resultado" o "RESULTADO".
function parseCSV(text) {
  const lines = text
    .replace(/^﻿/, "") // quita el BOM (marca invisible que Excel agrega al guardar CSV)
    .split("\n")
    .map((l) => l.replace(/\r$/, ""))
    .filter((l) => l.trim() !== "");

  if (!lines.length) return { headers: [], rows: [] };

  const rawHeaders = lines[0].split(",").map((h) => h.trim());
  const headers = rawHeaders.map((h) => h.toUpperCase());

  const rows = lines.slice(1).map((line) => {
    const cells = line.split(",").map((c) => c.trim());
    const row = {};
    headers.forEach((h, i) => { row[h] = cells[i] !== undefined ? cells[i] : ""; });
    return row;
  });

  return { headers, rawHeaders, rows };
}

async function fetchCSV(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("No se pudo cargar " + url + " (HTTP " + response.status + ")");
  const text = await response.text();
  return parseCSV(text);
}

// ---- Tabla genérica (sirve para fixtures, goleadores, próximos partidos, etc.) ----
async function renderCsvTable(csvUrl, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  try {
    const { rawHeaders, rows } = await fetchCSV(csvUrl);
    if (!rawHeaders.length) {
      target.innerHTML = "<p>Sin datos por ahora.</p>";
      return;
    }
    if (!rows.length) {
      target.innerHTML = "<p>Sin datos por ahora.</p>";
      return;
    }
    let html = "<table class='tabla'><tr>";
    rawHeaders.forEach((h) => { html += `<th>${h}</th>`; });
    html += "</tr>";
    rows.forEach((row) => {
      html += "<tr>";
      rawHeaders.forEach((h) => { html += `<td>${row[h.toUpperCase()]}</td>`; });
      html += "</tr>";
    });
    html += "</table>";
    target.innerHTML = html;
  } catch (err) {
    console.error(err);
    target.innerHTML = "<p>No se pudo cargar la información.</p>";
  }
}

// ---- Cálculo de estadísticas (PJ, PG, PE, PP, goles, efectividad) ----
// Recibe filas ya parseadas (de parseCSV) con columnas FECHA/RESULTADO/RIVAL/LUGAR.
// Ignora partidos sin resultado todavía (fixture futuro con RESULTADO vacío),
// para que no se cuenten como jugados ni rompan el cálculo.
function computeMatchStats(rows) {
  let jugados = 0, ganados = 0, empatados = 0, perdidos = 0;
  let golesFavor = 0, golesContra = 0;

  rows.forEach((row) => {
    const resultado = (row.RESULTADO || "").trim();
    if (!resultado) return; // partido todavía no jugado: no cuenta

    const partes = resultado.split("-").map((n) => Number(n.trim()));
    if (partes.length !== 2 || partes.some((n) => Number.isNaN(n))) return; // resultado mal escrito: se ignora

    const [gf, gc] = partes;
    jugados++;
    golesFavor += gf;
    golesContra += gc;
    if (gf > gc) ganados++;
    else if (gf < gc) perdidos++;
    else empatados++;
  });

  const diferencia = golesFavor - golesContra;
  const efectividad = jugados ? ((ganados * 3 + empatados) / (jugados * 3) * 100).toFixed(1) : "0.0";
  const promedioFavor = jugados ? (golesFavor / jugados).toFixed(1) : "0.0";
  const promedioContra = jugados ? (golesContra / jugados).toFixed(1) : "0.0";

  return { jugados, ganados, empatados, perdidos, golesFavor, golesContra, diferencia, efectividad, promedioFavor, promedioContra };
}

function statsBoxHtml(stats, showAverages) {
  let extra = "";
  if (showAverages) {
    extra = `
      <li><strong>Promedio Goles a favor:</strong> ${stats.promedioFavor}</li>
      <li><strong>Promedio Goles en contra:</strong> ${stats.promedioContra}</li>`;
  }
  return `
    <div class="estadisticas-box">
      <h2>📊 Estadísticas</h2>
      <ul>
        <li><strong>Partidos jugados:</strong> ${stats.jugados}</li>
        <li><strong>Ganados:</strong> ${stats.ganados}</li>
        <li><strong>Empatados:</strong> ${stats.empatados}</li>
        <li><strong>Perdidos:</strong> ${stats.perdidos}</li>
        <li><strong>Goles a favor:</strong> ${stats.golesFavor}</li>
        <li><strong>Goles en contra:</strong> ${stats.golesContra}</li>
        <li><strong>Diferencia de goles:</strong> ${stats.diferencia}</li>
        <li><strong>Efectividad:</strong> ${stats.efectividad}%</li>${extra}
      </ul>
    </div>`;
}

// options: { showAverages: boolean } - statistics.html muestra promedio de goles, tournaments.html no.
async function renderMatchStats(csvUrl, targetId, options) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const showAverages = !!(options && options.showAverages);
  try {
    const { rows } = await fetchCSV(csvUrl);
    const stats = computeMatchStats(rows);
    target.innerHTML = statsBoxHtml(stats, showAverages);
  } catch (err) {
    console.error(err);
    target.innerHTML = "<p>No se pudo calcular las estadísticas.</p>";
  }
}

// ---- Bloque completo de un campeonato (fixture + goleadores + estadísticas) ----
// config: { fixtureCsv, scorerCsv (opcional), fixtureId, scorerId, statsId }
// Cada llamada es independiente: si el CSV de un campeonato falla o no
// existe, no afecta a los demás campeonatos de la página.
function renderTournamentSection(config) {
  if (config.fixtureCsv && config.fixtureId) {
    renderCsvTable(config.fixtureCsv, config.fixtureId);
    renderMatchStats(config.fixtureCsv, config.statsId, { showAverages: false });
  }
  if (config.scorerCsv && config.scorerId) {
    renderCsvTable(config.scorerCsv, config.scorerId);
  }
}
