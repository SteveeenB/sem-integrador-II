// js/ejercicio11.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let arr = [];
let x = 0;
let velocidad = 500;

/* ----------  C A N D I D O  (recorrido único) ---------- */
async function metodoCandido() {
  let primera = -1;
  let ultima = -1;
  const n = arr.length;
  let pasoVis = 0;

  for (let i = 0; i < n; i++) {
    pasoVis++;
    const esX = arr[i] === x;

    // Resaltamos el índice que revisamos
    dibujarBarras(ctx, arr, Math.max(...arr) + 1, [i], 0, '#58a6ff', '#f78166');
    document.getElementById("info").innerText =
      `Paso ${pasoVis}: índice ${i} → ${esX ? '¡encontrado!' : 'no es x'}`;
    await dormir(velocidad);

    if (esX) {
      if (primera === -1) primera = i;
      ultima = i;
    }
  }

  const res = primera === -1 ? null : [primera, ultima];
  document.getElementById("info").innerText =
    `Resultado (candido): ${res ? '[' + res.join(', ') + ']' : 'null'}`;
}

/* ----------  Ó P T I M O  (dos búsquedas binarias) ---------- */
async function metodoOptimo() {
  const n = arr.length;
  let pasoVis = 0;

  // Búsqueda binaria de la primera aparición
  let izq = 0;
  let der = n - 1;
  let primera = -1;

  while (izq <= der) {
    pasoVis++;
    const mid = Math.floor((izq + der) / 2);
    const valMid = arr[mid];

    dibujarBarras(ctx, arr, Math.max(...arr) + 1, [mid], 0, '#58a6ff', '#f78166');
    document.getElementById("info").innerText =
      `Primera: mid=${mid} val=${valMid} vs x=${x}`;
    await dormir(velocidad);

    if ((mid === 0 || arr[mid - 1] < x) && valMid === x) {
      primera = mid;
      break;
    } else if (x <= valMid) {
      der = mid - 1;
    } else {
      izq = mid + 1;
    }
  }

  // Búsqueda binaria de la última aparición
  izq = 0;
  der = n - 1;
  let ultima = -1;

  while (izq <= der) {
    pasoVis++;
    const mid = Math.floor((izq + der) / 2);
    const valMid = arr[mid];

    dibujarBarras(ctx, arr, Math.max(...arr) + 1, [mid], 0, '#58a6ff', '#f78166');
    document.getElementById("info").innerText =
      `Última: mid=${mid} val=${valMid} vs x=${x}`;
    await dormir(velocidad);

    if ((mid === n - 1 || arr[mid + 1] > x) && valMid === x) {
      ultima = mid;
      break;
    } else if (x >= valMid) {
      izq = mid + 1;
    } else {
      der = mid - 1;
    }
  }

  const res = primera === -1 ? null : [primera, ultima];
  document.getElementById("info").innerText =
    `Resultado (óptimo): ${res ? '[' + res.join(', ') + ']' : 'null'}`;
}

/* ----------  I N I C I O  ---------- */
function iniciar(tipo) {
  const input = document.getElementById("arrInput").value;
  arr = input.split(",").map(Number);
  x = parseInt(document.getElementById("xInput").value);
  velocidad = parseInt(document.getElementById("velocidad").value);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (tipo === "candido") metodoCandido();
  else if (tipo === "optimo") metodoOptimo();
}