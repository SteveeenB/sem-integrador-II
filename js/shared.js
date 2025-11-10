// js/shared.js
function dormir(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function dibujarBarras(ctx, arr, limite, resaltados = [], maxSuma = 0, colorNormal = '#58a6ff', colorResaltado = '#f78166') {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const ancho = canvas.width / arr.length;
  const maxValor = Math.max(...arr, limite);
  arr.forEach((v, i) => {
    const h = (v / maxValor) * 150;
    const x = i * ancho;
    const y = canvas.height - h;
    ctx.fillStyle = resaltados.includes(i) ? colorResaltado : colorNormal;
    ctx.fillRect(x, y, ancho - 2, h);
    ctx.fillStyle = '#c9d1d9';
    ctx.font = '14px "Open Sans"';
    ctx.fillText(v, x + 4, y - 4);
  });
  ctx.fillStyle = '#8b949e';
  ctx.fillText(`Máximo encontrado: ${maxSuma}`, 10, 20);
}