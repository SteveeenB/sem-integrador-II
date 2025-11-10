// js/ejercicio12.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let arr = [];
let velocidad = 500;

/* ----------  I T E R A T I V O  (un solo recorrido) ---------- */
async function metodoIterativo() {
  const n = arr.length;
  let menor = arr[0];
  let mayor = arr[0];
  let pasoVis = 0;

  for (let i = 1; i < n; i++) {
    pasoVis++;
    const v = arr[i];

    // Resaltamos el índice que revisamos
    dibujarBarras(ctx, arr, Math.max(...arr) + 1, [i], 0, '#58a6ff', '#f78166');
    document.getElementById("info").innerText =
      `Paso ${pasoVis}: arr[${i}] = ${v} → menor=${menor} mayor=${mayor}`;
    await dormir(velocidad);

    if (v < menor) menor = v;
    if (v > mayor) mayor = v;
  }

  document.getElementById("info").innerText =
    `Resultado (iterativo): [menor=${menor}, mayor=${mayor}]`;
}

/* ----------  R E C U R S I V O  (divide y vencerás) ---------- */
async function metodoRecursivo() {
  const res = await minMaxRec(arr, 0, arr.length - 1, 0);
  document.getElementById("info").innerText =
    `Resultado (recursivo): [menor=${res[0]}, mayor=${res[1]}]`;
}

async function minMaxRec(a, l, r, pasoVis) {
  if (l === r) return [a[l], a[l]];
  if (r === l + 1) {
    pasoVis++;
    dibujarBarras(ctx, a, Math.max(...a) + 1, [l, r], 0, '#58a6ff', '#f78166');
    document.getElementById("info").innerText =
      `Comparando índices ${l} y ${r}`;
    await dormir(velocidad);
    return a[l] < a[r] ? [a[l], a[r]] : [a[r], a[l]];
  }

  const mid = Math.floor((l + r) / 2);
  const [minIzq, maxIzq] = await minMaxRec(a, l, mid, pasoVis);
  const [minDer, maxDer] = await minMaxRec(a, mid + 1, r, pasoVis);

  pasoVis++;
  dibujarBarras(ctx, a, Math.max(...a) + 1, [l, r], 0, '#58a6ff', '#f78166');
  document.getElementById("info").innerText =
    `Combinando [${l}..${mid}] y [${mid + 1}..${r}] → min(${minIzq},${minDer}) max(${maxIzq},${maxDer})`;
  await dormir(velocidad);

  return [Math.min(minIzq, minDer), Math.max(maxIzq, maxDer)];
}

/* ----------  I N I C I O  ---------- */
function iniciar(tipo) {
  const input = document.getElementById("arrInput").value;
  arr = input.split(",").map(Number);
  velocidad = parseInt(document.getElementById("velocidad").value);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (tipo === 'iterativo') metodoIterativo();
  else if (tipo === 'recursivo') metodoRecursivo();
}