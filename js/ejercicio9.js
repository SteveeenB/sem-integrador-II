// js/ejercicio9.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let pilas = [];
let jugosos = [];
let velocidad = 500;

/* ----------  C A N D I D O  (búsqueda lineal por cada gusano) ---------- */
async function metodoCandido() {
  const n = pilas.length;
  const m = jugosos.length;
  const result = new Array(m);
  let pasoVis = 0;

  // Prefijos de pilas
  const pref = new Array(n);
  pref[0] = pilas[0];
  for (let i = 1; i < n; i++) pref[i] = pref[i - 1] + pilas[i];

  for (let j = 0; j < m; j++) {
    result[j] = -1;
    for (let i = 0; i < n; i++) {
      pasoVis++;
      dibujarBarras(ctx, pref, Math.max(...pref) + 1, [i], 0, '#58a6ff', '#f78166');
      document.getElementById("info").innerText =
        `Gusano ${j + 1} (${jugosos[j]}) – pila ${i + 1} = ${pref[i]}`;
      await dormir(velocidad);

      if (jugosos[j] <= pref[i]) {
        result[j] = i + 1;
        break;
      }
    }
  }

  document.getElementById("info").innerText =
    `Resultados (candido): [${result.join(', ')}]`;
}

/* ----------  Ó P T I M O  (búsqueda binaria) ---------- */
async function metodoOptimo() {
  const n = pilas.length;
  const m = jugosos.length;
  const pref = new Array(n);
  pref[0] = pilas[0];
  for (let i = 1; i < n; i++) pref[i] = pref[i - 1] + pilas[i];

  const result = new Array(m);
  let pasoVis = 0;

  for (let j = 0; j < m; j++) {
    pasoVis++;
    const g = jugosos[j];

    // Búsqueda binaria
    let izq = 0;
    let der = n - 1;
    let idx = -1;
    while (izq <= der) {
      const mid = Math.floor((izq + der) / 2);
      if (pref[mid] >= g) {
        idx = mid;
        der = mid - 1;
      } else {
        izq = mid + 1;
      }
    }

    result[j] = idx === -1 ? -1 : idx + 1;

    // Visual: resaltamos el índice encontrado
    dibujarBarras(ctx, pref, Math.max(...pref) + 1, [idx], 0, '#58a6ff', '#f78166');
    document.getElementById("info").innerText =
      `Gusano ${j + 1} (${g}) – binario → pila ${result[j]}`;
    await dormir(velocidad);
  }

  document.getElementById("info").innerText =
    `Resultados (óptimo): [${result.join(', ')}]`;
}

/* ----------  I N I C I O  ---------- */
function iniciar(tipo) {
  pilas = document.getElementById("pilasInput").value.split(",").map(Number);
  jugosos = document.getElementById("jugososInput").value.split(",").map(Number);
  velocidad = parseInt(document.getElementById("velocidad").value);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (tipo === "candido") metodoCandido();
  else if (tipo === "optimo") metodoOptimo();
}