"use strict";

import "./index.css";

const html2pdf = require("html2pdf.js");
const lista = require("./lista.json");
const tonos = [
  "Do", //0
  "Reb", //1
  "Re", //2
  "Mib", //3
  "Mi", //4
  "Fa", //5
  "Fa#", //6
  "Sol", //7
  "Lab", //8
  "La", //9
  "Sib", //10
  "Si" //11
];

let left = document.querySelector("ul.left-list");
let center = document.querySelector("ul.center-list");
let rigth = document.querySelector("ul.rigth-list");
let list = document.getElementById("lista");
let canto = document.getElementById("canto");
let state;

let selector = 0;
lista.forEach((element, index) => {
  let li = document.createElement("li");
  li.innerHTML = `<a href="${index}" class="canto">${element.nombre}</a>`;

  if (selector == 0) {
    left.appendChild(li);
    selector = 1;
  } else if (selector == 1) {
    center.appendChild(li);
    selector = 2;
  } else if (selector == 2) {
    rigth.appendChild(li);
    selector = 0;
  }
});

let loadCanto = item => {
  let cartilla = document.getElementById("cartilla");
  let reproductor = document.createElement("AUDIO");

  state = lista[item.getAttribute("href")];
  let audio = require(`./cantos/${state.canto}.mp3`);
  if (reproductor.canPlayType("audio/mpeg")) {
    reproductor.setAttribute("src", audio.default);
  } else {
    reproductor.setAttribute("src", `./cantos/${state.canto}.ogg`);
  }
  reproductor.setAttribute("controls", "controls");
  reproductor.style.verticalAlign = "text-top";
  document.getElementById("audio").appendChild(reproductor);

  cartilla.style.backgroundColor = state.color;
  let texto = require(`./cantos/${state.canto}.html`);
  cartilla.innerHTML = texto;

  list.style.display = "none";
  canto.style.display = "block";
};

let toggleDisplay = element => {
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
};

let getTono = tonoName => {
  let iterator = tonos.entries();
  for (let e of iterator) {
    if (e[1] == tonoName) return e[0];
  }
};

let ajustTono = (item, intervalo) => {
  let tonoActual = getTono(item.textContent);
  let tonoTemp = tonoActual + intervalo;
  if (tonoTemp > 11) {
    tonoTemp = tonoTemp - 12;
  }
  return tonoTemp;
};

document.querySelectorAll(".canto").forEach(item => {
  item.addEventListener("click", event => {
    event.preventDefault();
    loadCanto(item);
  });
});

document.getElementById("indice").addEventListener("click", event => {
  event.preventDefault();
  canto.style.display = "none";
  list.style.display = "block";
});

document.getElementById("transporta").addEventListener("click", event => {
  event.preventDefault();
  toggleDisplay(document.getElementById("codeNavPopover"));
});

document.querySelectorAll(".popover-link").forEach(item => {
  item.addEventListener("click", event => {
    event.preventDefault();
    let diferencia = 11 - state.tono;
    let nuevoTono = parseInt(item.getAttribute("href"));
    state.tono = nuevoTono;
    let intervalo = diferencia + (nuevoTono + 1);
    if (intervalo > 11) {
      intervalo = intervalo - 12;
    }

    document.querySelectorAll("chord").forEach(item => {
      let acorde = ajustTono(item, intervalo);
      item.textContent = tonos[acorde];
    });

    toggleDisplay(document.getElementById("codeNavPopover"));
  });
});

let pixelsToMM = element => {
    var width = parseInt(window.getComputedStyle(element, null).width);
    var height = parseInt(window.getComputedStyle(element, null).height);
    return [Math.floor((height * 630) / 840), Math.floor((width * 630) / 840)];
};

document.getElementById("descargar").addEventListener("click", event => {
  var element = document.getElementById("cartilla");
  var opt = {
    margin: 0,
    filename: `${state.canto}.pdf`,
    image: {type: "png", quality: 0.98},
    html2canvas: {scale: 2},
    jsPDF: {format: pixelsToMM(element), orientation: "landscape"}
  };

  // New Promise-based usage:
  html2pdf()
    .set(opt)
    .from(element)
    .save();
});
