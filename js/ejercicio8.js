// js/ejercicio8.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let ratings = [];
let k = 0;
let velocidad = 500;

/* ----------  C A N D I D O  (doble bucle, muestra cada chequeo) ---------- */
async function metodoCandido() {
  const n = ratings.length;
  const indices = new Array(k);
  let contador = 0;
  let pasoVis = 0;

  for (let i = 0; i < n; i++) {
    let existe = false;

    for (let j = 0; j < contador; j++) {
      pasoVis++;
      const idx = indices[j] - 1;
      dibujarBarras(ctx, ratings, Math.max(...ratings) + 1, [i, idx], contador, '#58a6ff', '#f78166');
      document.getElementById("info").innerText =
        `Paso ${pasoVis}: ¿ratings[${i}]==ratings[${idx}]? ${ratings[i] === ratings[idx] ? 'SÍ→descartado' : 'NO'}`;
      await dormir(velocidad);

      if (ratings[i] === ratings[idx]) {
        existe = true;
        break;
      }
    }

    if (!existe && contador < k) {
      indices[contador] = i + 1;
      contador++;
      dibujarBarras(ctx, ratings, Math.max(...ratings) + 1, indices.map(id => id - 1), contador, '#58a6ff', '#f78166');
      document.getElementById("info").innerText = `Nuevo único: índice ${i + 1} (total ${contador}/${k})`;
      await dormir(velocidad);
    }

    if (contador === k) break;
  }

  const res = contador === k ? indices : null;
  document.getElementById("info").innerText =
    `Resultado (candido): ${res ? '[' + res.join(', ') + ']' : 'null'}`;
}

/* ----------  Ó P T I M O  (TablaHash simulada) ---------- */
async function metodoOptimo() {
  const n = ratings.length;
  const vistos = new Set();
  const resultado = new Array(k);
  let contador = 0;
  let pasoVis = 0;

  for (let i = 0; i < n && contador < k; i++) {
    pasoVis++;
    const v = ratings[i];

    if (!vistos.has(v)) {
      vistos.add(v);
      resultado[contador] = i + 1;
      contador++;

      dibujarBarras(ctx, ratings, Math.max(...ratings) + 1, [i], contador, '#58a6ff', '#f78166');
      document.getElementById("info").innerText =
        `Paso ${pasoVis}: nuevo único ratings[${i}] = ${v} → índices ${resultado.slice(0, contador).join(',')}`;
      await dormir(velocidad);
    }
  }

  const res = contador === k ? resultado : null;
  document.getElementById("info").innerText =
    `Resultado (óptimo): ${res ? '[' + res.join(', ') + ']' : 'null'}`;
}

/* ----------  I N I C I O  ---------- */
function iniciar(tipo) {
  const input = document.getElementById("ratingsInput").value;
  ratings = input.split(",").map(Number);
  k = parseInt(document.getElementById("kInput").value);
  velocidad = parseInt(document.getElementById("velocidad").value);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (tipo === "candido") metodoCandido();
  else if (tipo === "optimo") metodoOptimo();
}