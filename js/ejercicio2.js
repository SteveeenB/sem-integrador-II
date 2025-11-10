// js/ejercicio2.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let num = 0;
let velocidad = 500;

async function metodoCandido() {
  const n = num;
  let uno = -1;
  let resultado = 0;

  for (let i = 1; i <= n; i++) {
    resultado += uno * i;
    uno *= -1;

    // Visual: barra por cada paso
    const barras = Array.from({ length: i }, (_, k) => k + 1);
    const valores = barras.map(v => (v % 2 === 0 ? -v : v));
    dibujarBarras(ctx, valores, n, [], resultado, '#58a6ff', '#f78166');
    document.getElementById("info").innerText = `Paso ${i}: resultado = ${resultado}`;
    await dormir(velocidad);
  }

  document.getElementById("info").innerText = `Resultado final (candido): ${resultado}`;
}

async function metodoOptimo() {
  let resultado;
  const n = num;

  if (n % 2 === 0) {
    resultado = n / 2;
  } else {
    resultado = ((n + 1) / 2) * -1;
  }

  // Visual: mostrar solo la barra final
  const valores = [resultado];
  dibujarBarras(ctx, valores, n, [], resultado, '#58a6ff', '#f78166');
  document.getElementById("info").innerText = `Resultado final (óptimo): ${resultado}`;
}

function iniciar(tipo) {
  num = parseInt(document.getElementById("numInput").value);
  velocidad = parseInt(document.getElementById("velocidad").value);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (tipo === "candido") metodoCandido();
  else if (tipo === "optimo") metodoOptimo();
}