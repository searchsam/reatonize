"use strict";

import "./index.css";

const lista = require("./lista.json");

let left = document.querySelector("ul.left-list");
let center = document.querySelector("ul.center-list");
let rigth = document.querySelector("ul.rigth-list");
let list = document.getElementById("lista");
let canto = document.getElementById("canto");
let state;

let selector = 0;
lista.forEach((element, index) => {
  let li = document.createElement('li');
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

document.querySelectorAll(".canto").forEach(item => {
  item.addEventListener("click", event => {
    event.preventDefault();
    list.style.display = "none";
    canto.style.display = "block";
    state = lista[item.getAttribute("href")];
  });
});
