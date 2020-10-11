"use strict";

import "./index.css";
// import * as fs from "fs-web";
// import fs from "fs";
const fs = require("fs-web");
const lista = require("./lista.json");

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

let loadCanto = (item) => {
  let cartilla = document.getElementById("cartilla");

  state = lista[item.getAttribute("href")];
  cartilla.style.backgroundColor = state.color;
  let texto = require(`./cantos/${state.canto}.html`);
  cartilla.innerHTML = texto;

  list.style.display = "none";
  canto.style.display = "block";
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
