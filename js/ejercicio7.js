// js/ejercicio7.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let x = 0;
let k = 0;
let velocidad = 500;

/* ----------  C A N D I D O  (barra fija y visible) ---------- */
async function metodoCandido() {
  const numStr = String(x).repeat(k);
  const numUnido = BigInt(numStr);
  let pasoVis = 0;

  // Barra base: siempre visible
  const barraBase = Number(numUnido);
  const maxBarra = Math.max(barraBase, 10);

  if (numUnido <= 1n) {
    dibujarBarras(ctx, [barraBase], maxBarra, [], 0, '#58a6ff', '#f78166');
    document.getElementById("info").innerText = "Paso 0: num ≤ 1 → no primo";
    return;
  }

  // Dibujamos la barra del número que vamos a probar
  dibujarBarras(ctx, [barraBase], maxBarra, [], 0, '#58a6ff', '#58a6ff');
  document.getElementById("info").innerText = `Probando si ${numUnido} es primo...`;
  await dormir(velocidad);

  for (let i = 2; i < numUnido; i++) {
    pasoVis++;
    const esDiv = numUnido % BigInt(i) === 0n;

    // Barra del divisor que probamos (siempre visible)
    const barraDiv = i;
    dibujarBarras(ctx, [barraDiv], maxBarra, [0], 0, '#58a6ff', '#f78166');
    document.getElementById("info").innerText =
      `Paso ${pasoVis}: probando divisor ${i} → ${esDiv ? 'NO primo' : 'sigue'}`;
    await dormir(velocidad);

    if (esDiv) {
      document.getElementById("info").innerText = `Resultado (candido): NO es primo`;
      return;
    }
  }

  document.getElementById("info").innerText = `Resultado (candido): SÍ es primo`;
}

/* ----------  Ó P T I M O  (igual que antes) ---------- */
async function metodoOptimo() {
  let pasoVis = 0;

  if (x === 1) {
    const esPrimo = k === 2;
    dibujarBarras(ctx, [1], 3, [], 0, '#58a6ff', '#f78166');
    document.getElementById("info").innerText =
      `Paso ${++pasoVis}: x=1 → k debe ser 2 → ${esPrimo ? 'SÍ' : 'NO'} primo`;
    await dormir(velocidad);
    document.getElementById("info").innerText = `Resultado (óptimo): ${esPrimo ? 'SÍ' : 'NO'} es primo`;
    return;
  }

  if (k > 1) {
    dibujarBarras(ctx, [x], x + 2, [], 0, '#58a6ff', '#f78166');
    document.getElementById("info").innerText = `Paso ${++pasoVis}: k>1 → NO primo`;
    await dormir(velocidad);
    document.getElementById("info").innerText = `Resultado (óptimo): NO es primo`;
    return;
  }

  // k=1 → verificar si x es primo
  const esPrimoX = esPrimoHasta(x);
  dibujarBarras(ctx, [x], x + 2, [], 0, '#58a6ff', '#f78166');
  document.getElementById("info").innerText =
    `Paso ${++pasoVis}: verificando si x=${x} es primo → ${esPrimoX ? 'SÍ' : 'NO'}`;
  await dormir(velocidad);
  document.getElementById("info").innerText = `Resultado (óptimo): ${esPrimoX ? 'SÍ' : 'NO'} es primo`;
}

/* ----------  A Y U D A  ---------- */
function esPrimoHasta(num) {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

/* ----------  I N I C I O  ---------- */
function iniciar(tipo) {
  x = parseInt(document.getElementById("xInput").value);
  k = parseInt(document.getElementById("kInput").value);
  velocidad = parseInt(document.getElementById("velocidad").value);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (tipo === "candido") metodoCandido();
  else if (tipo === "optimo") metodoOptimo();
}