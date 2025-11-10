// js/ejercicio3.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let secuencia = [];
let velocidad = 500;

/* ----------  C A N D I D O  ---------- */
function metodoCandido() {
  const n = secuencia.length;
  const a = new Array(n);
  let paso = 0;
  let pos = 0;

  function procesarPaso() {
    if (pos >= n) {
      document.getElementById("info").innerText = `Resultado (candido): [${a.join(', ')}]`;
      return;
    }

    if (pos % 2 === 0) a[pos] = secuencia[pos / 2];
    else a[pos] = secuencia[n - 1 - Math.floor(pos / 2)];

    paso++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja TODAS las barras
    const definedValues = a.filter(v => v !== undefined);
    const maxVal = Math.max(...definedValues, 1);
    const ancho = canvas.width / a.length;
    a.forEach((v, i) => {
      if (v !== undefined) {
        const h = Math.max((v / maxVal) * 120, 20); // altura mínima 20 px
        ctx.fillStyle = i === pos ? '#FF6F00' : '#58a6ff'; // naranja vs azul
        ctx.fillRect(i * ancho, canvas.height - h, ancho - 2, h);
        ctx.fillStyle = '#fff';
        ctx.font = '14px "Open Sans"';
        ctx.fillText(v, i * ancho + 4, canvas.height - h - 4);
      }
    });

    document.getElementById("info").innerText = `Paso ${paso}: a[${pos}] = ${a[pos]}`;
    pos++;
    requestAnimationFrame(() => setTimeout(procesarPaso, velocidad));
  }

  procesarPaso();
}

/* ----------  Ó P T I M O  ---------- */
function metodoOptimo() {
  const n = secuencia.length;
  const a = new Array(n);
  let pos = 0, l = 0, r = n - 1;
  let paso = 0;

  function procesarPaso() {
    if (l > r) {
      document.getElementById("info").innerText = `Resultado (óptimo): [${a.join(', ')}]`;
      return;
    }

    a[pos] = secuencia[l];
    if (pos + 1 < n) a[pos + 1] = secuencia[r];
    const resaltados = [];
    if (pos < n) resaltados.push(pos);
    if (pos + 1 < n) resaltados.push(pos + 1);

    paso++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const definedValues = a.filter(v => v !== undefined);
    const maxVal = Math.max(...definedValues, 1);
    const ancho = canvas.width / a.length;
    a.forEach((v, i) => {
      if (v !== undefined) {
        const h = Math.max((v / maxVal) * 120, 20);
        ctx.fillStyle = resaltados.includes(i) ? '#FF6F00' : '#58a6ff';
        ctx.fillRect(i * ancho, canvas.height - h, ancho - 2, h);
        ctx.fillStyle = '#fff';
        ctx.font = '14px "Open Sans"';
        ctx.fillText(v, i * ancho + 4, canvas.height - h - 4);
      }
    });

    document.getElementById("info").innerText = `Paso ${paso}: l=${l}, r=${r} → a[${pos}..${pos + 1}]`;
    pos += 2; l++; r--;
    requestAnimationFrame(() => setTimeout(procesarPaso, velocidad));
  }

  procesarPaso();
}

/* ----------  INICIO  ---------- */
function iniciar(tipo) {
  const input = document.getElementById("secuenciaInput").value;
  secuencia = input.split(",").map(Number);
  velocidad = parseInt(document.getElementById("velocidad").value);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (tipo === "candido") metodoCandido();
  else if (tipo === "optimo") metodoOptimo();
}