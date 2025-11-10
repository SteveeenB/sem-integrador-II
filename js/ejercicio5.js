// js/ejercicio5.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let num = 0;
let velocidad = 500;

/* ----------  C A N D I D O  (muestra cada par i,j) ---------- */
async function metodoCandido() {
  const n = num;
  let minMoves = Infinity;
  let pasoVis = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      const producto = i * j;
      if (producto === n) {
        const moves = (i - 1) + (j - 1);
        if (moves < minMoves) minMoves = moves;

        // Visual: barras para i y j
        const barras = [i, j];
        dibujarBarras(ctx, barras, n + 2, [0, 1], minMoves, '#58a6ff', '#f78166');
        pasoVis++;
        document.getElementById("info").innerText =
          `Paso ${pasoVis}: i=${i}, j=${j} → moves=${moves} (min=${minMoves})`;
        await dormir(velocidad);
      }
    }
  }

  document.getElementById("info").innerText = `Mínimo movimientos (candido): ${minMoves}`;
}

/* ----------  Ó P T I M O  (1 paso por divisor) ---------- */
async function metodoOptimo() {
  const n = num;
  let mayor = 0;
  let pasoVis = 0;

  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      mayor = i;
      pasoVis++;

      // Visual: mostrar divisor encontrado
      const barras = [i, n / i];
      const moves = i + (n / i) - 2;
      dibujarBarras(ctx, barras, n + 2, [0], moves, '#58a6ff', '#f78166');
      document.getElementById("info").innerText =
        `Paso ${pasoVis}: divisor ${i} → moves=${moves}`;
      await dormir(velocidad);
    }
  }

  const resultado = mayor + (n / mayor) - 2;
  document.getElementById("info").innerText = `Mínimo movimientos (óptimo): ${resultado}`;
}

/* ----------  I N I C I O  ---------- */
function iniciar(tipo) {
  num = parseInt(document.getElementById("nInput").value);
  velocidad = parseInt(document.getElementById("velocidad").value);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (tipo === "candido") metodoCandido();
  else if (tipo === "optimo") metodoOptimo();
}