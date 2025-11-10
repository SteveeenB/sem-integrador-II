// js/ejercicio1.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let hoteles = [];
let dinero = 0;
let velocidad = 500;

async function metodoCandido() {
  let max = 0;
  const n = hoteles.length;

  for (let i = 0; i < n; i++) {
    let suma = hoteles[i];

    for (let j = i; j < n; j++) {
      if (j !== i) suma += hoteles[j];

      dibujarBarras(ctx, hoteles, dinero, Array.from({ length: j - i + 1 }, (_, k) => i + k), max);
      document.getElementById("info").innerText = `Evaluando subarreglo [${i}..${j}] = ${suma}`;
      await dormir(velocidad);

      if (suma <= dinero && suma > max) {
        max = suma;
      }
    }
  }

  document.getElementById("info").innerText = `Máximo gasto posible: ${max}`;
}

async function metodoOptimo() {
  let izq = 0, der = 0, suma = 0, max = 0;
  const n = hoteles.length;

  while (der < n) {
    if (suma + hoteles[der] <= dinero) {
      suma += hoteles[der];
      if (suma > max) max = suma;
      der++;
    } else {
      suma -= hoteles[izq];
      izq++;
    }

    const resaltados = [];
    for (let i = izq; i < der; i++) resaltados.push(i);
    dibujarBarras(ctx, hoteles, dinero, resaltados, max);
    document.getElementById("info").innerText = `Ventana [${izq}..${der - 1}] = ${suma}`;
    await dormir(velocidad);
  }

  document.getElementById("info").innerText = `Máximo gasto posible: ${max}`;
}

function iniciar(tipo) {
  const input = document.getElementById("hotelesInput").value;
  hoteles = input.split(",").map(Number);
  dinero = parseInt(document.getElementById("dineroInput").value);
  velocidad = parseInt(document.getElementById("velocidad").value);

  if (tipo === "candido") metodoCandido();
  else if (tipo === "optimo") metodoOptimo();
}