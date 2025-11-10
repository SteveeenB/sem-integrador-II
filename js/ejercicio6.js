// js/ejercicio6.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let casos = [];
let velocidad = 500;

/* ----------  C A N D I D O  (paso a paso por caso) ---------- */
async function metodoCandido() {
  const result = [];
  let pasoVis = 0;

  for (const c of casos) {
    const vec = new Array(c + 1).fill(0);
    vec[0] = 0;

    for (let k = 1; k <= c; k++) {
      let num = k;
      let suma = 0;
      while (num > 0) {
        suma += num % 10;
        num = Math.floor(num / 10);
      }
      vec[k] = suma + vec[k - 1];

      pasoVis++;
      dibujarBarras(ctx, vec, Math.max(...vec), [k], vec[k], '#58a6ff', '#f78166');
      document.getElementById("info").innerText =
        `Caso ${c} – paso ${k}: vec[${k}] = ${vec[k]}`;
      await dormir(velocidad);
    }

    result.push(vec[c]);
  }

  document.getElementById("info").innerText =
    `Resultados (candido): [${result.join(', ')}]`;
}

/* ----------  Ó P T I M O  (consulta directa) ---------- */
async function metodoOptimo() {
  // Precomputamos la secuencia hasta el máximo caso
  const maxCase = Math.max(...casos);
  const vec = new Array(maxCase + 1).fill(0);
  vec[0] = 0;

  for (let i = 1; i <= maxCase; i++) {
    let num = i;
    let suma = 0;
    while (num > 0) {
      suma += num % 10;
      num = Math.floor(num / 10);
    }
    vec[i] = suma + vec[i - 1];
  }

  // Animación: mostramos solo los índices solicitados
  const result = casos.map(c => vec[c]);
  let pasoVis = 0;

  for (const c of casos) {
    pasoVis++;
    const valor = vec[c];
    dibujarBarras(ctx, [valor], valor, [0], valor, '#58a6ff', '#f78166');
    document.getElementById("info").innerText =
      `Caso ${c} – consulta directa: ${valor}`;
    await dormir(velocidad);
  }

  document.getElementById("info").innerText =
    `Resultados (óptimo): [${result.join(', ')}]`;
}

/* ----------  I N I C I O  ---------- */
function iniciar(tipo) {
  const input = document.getElementById("casosInput").value;
  casos = input.split(",").map(Number);
  velocidad = parseInt(document.getElementById("velocidad").value);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (tipo === "candido") metodoCandido();
  else if (tipo === "optimo") metodoOptimo();
}