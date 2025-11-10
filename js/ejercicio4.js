// js/ejercicio4.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let arr = [];
let k = 0;
let velocidad = 500;

/* ----------  C A N D I D O  (muestra cada comparación) ---------- */
async function metodoCandido() {
  const n = arr.length;
  let respuesta = 0;
  let pasoVis = 0; // pasos visuales

  for (let i = 0; i <= n - k - 1; i++) {
    let valido = 0;

    for (let j = i; j < i + k; j++) {
      pasoVis++;
      const cumple = arr[j] < 2 * arr[j + 1];
      if (cumple) valido++;

      // Resaltamos el par que comparamos
      dibujarBarras(ctx, arr, Math.max(...arr) * 2, [j, j + 1], respuesta, '#58a6ff', '#f78166');
      document.getElementById("info").innerText =
        `Paso ${pasoVis}: comparando arr[${j}] < 2*arr[${j + 1}] → ${cumple ? '✓' : '✗'} (${valido}/${k})`;
      await dormir(velocidad);
    }

    if (valido === k) respuesta++;
  }

  document.getElementById("info").innerText = `Total subarreglos válidos (candido): ${respuesta}`;
}

/* ----------  Ó P T I M O  (1 paso por iteración) ---------- */
async function metodoOptimo() {
  const n = arr.length;
  let valido = 0;
  let respuesta = 0;
  let pasoVis = 0;

  for (let i = 0; i < n - 1; i++) {
    pasoVis++;
    if (arr[i] < 2 * arr[i + 1]) {
      valido++;
    } else {
      valido = 0;
    }

    if (valido >= k) respuesta++;

    // Resaltamos el par actual
    dibujarBarras(ctx, arr, Math.max(...arr) * 2, [i, i + 1], respuesta, '#58a6ff', '#f78166');
    document.getElementById("info").innerText =
      `Paso ${pasoVis}: válidos consecutivos = ${valido} (total válidos: ${respuesta})`;
    await dormir(velocidad);
  }

  document.getElementById("info").innerText = `Total subarreglos válidos (óptimo): ${respuesta}`;
}

/* ----------  I N I C I O  ---------- */
function iniciar(tipo) {
  const input = document.getElementById("arrInput").value;
  arr = input.split(",").map(Number);
  k = parseInt(document.getElementById("kInput").value);
  velocidad = parseInt(document.getElementById("velocidad").value);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (tipo === "candido") metodoCandido();
  else if (tipo === "optimo") metodoOptimo();
}