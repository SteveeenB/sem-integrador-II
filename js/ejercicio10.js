// js/ejercicio10.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let palabras = [];
let velocidad = 500;

/* ----------  C A N D I D O  (comparación carácter a carácter) ---------- */
async function metodoCandido() {
  const cant = palabras.length;
  if (cant === 0) {
    document.getElementById("info").innerText = "Sin palabras";
    return;
  }

  const primera = palabras[0];
  const minLen = primera.length;
  let prefijo = "";
  let pasoVis = 0;

  // Barras: longitud de cada palabra
  const barras = palabras.map(p => p.length);

  for (let i = minLen; i >= 1; i--) {
    prefijo = primera.slice(0, i);
    let valido = true;

    for (let p = 1; p < cant; p++) {
      for (let c = 0; c < i; c++) {
        pasoVis++;
        const charPrim = prefijo[c];
        const charAct = palabras[p][c];

        // Resaltamos la palabra que estamos chequeando y el carácter
        dibujarBarras(ctx, barras, Math.max(...barras) + 1, [p], i, '#58a6ff', '#f78166');
        document.getElementById("info").innerText =
          `Paso ${pasoVis}: prefijo "${prefijo}" – palabra ${p} carácter ${c} (${charAct}) vs (${charPrim})`;
        await dormir(velocidad);

        if (charAct !== charPrim) {
          valido = false;
          break;
        }
      }
      if (!valido) break;
    }

    if (valido) {
      document.getElementById("info").innerText = `Resultado (candido): "${prefijo}"`;
      return;
    }
  }

  document.getElementById("info").innerText = `Resultado (candido): ""`;
}

/* ----------  Ó P T I M O  (divide y vencerás) ---------- */
async function metodoOptimo() {
  if (palabras.length === 0) {
    document.getElementById("info").innerText = "Sin palabras";
    return;
  }

  let pasoVis = 0;

  const res = await dividePrefijo(0, palabras.length - 1, pasoVis);
  document.getElementById("info").innerText = `Resultado (óptimo): "${res}"`;
}

async function dividePrefijo(izq, der, pasoVis) {
  if (izq === der) return palabras[izq];

  const mitad = Math.floor((izq + der) / 2);
  const prefIzq = await dividePrefijo(izq, mitad, pasoVis);
  const prefDer = await dividePrefijo(mitad + 1, der, pasoVis);

  return await comunDos(prefIzq, prefDer, pasoVis);
}

async function comunDos(str1, str2, pasoVis) {
  const lim = Math.min(str1.length, str2.length);
  let idx = 0;

  while (idx < lim) {
    pasoVis++;
    if (str1[idx] !== str2[idx]) break;
    idx++;

    // Visual: mostramos el carácter que coincide
    const barras = [idx];
    dibujarBarras(ctx, barras, lim + 1, [0], idx, '#58a6ff', '#f78166');
    document.getElementById("info").innerText =
      `Comparando "${str1}" vs "${str2}" – carácter ${idx - 1} coincide`;
    await dormir(velocidad);
  }

  return str1.slice(0, idx);
}

/* ----------  I N I C I O  ---------- */
function iniciar(tipo) {
  const input = document.getElementById("palabrasInput").value;
  palabras = input.split(",");
  velocidad = parseInt(document.getElementById("velocidad").value);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (tipo === "candido") metodoCandido();
  else if (tipo === "optimo") metodoOptimo();
}