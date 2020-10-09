"use strict";

import "./index.css";

const lista = require("./lista.json");

let left = document.querySelector("ul.left-list");
let rigth = document.querySelector("ul.rigth-list");
let list = document.getElementById("lista");
let canto = document.getElementById("canto");
let state;

let selector = true;
lista.forEach((element, index) => {
  let li = document.createElement('li');
  li.innerHTML = `<a href="${index}" class="canto">${element.nombre}</a>`;

  if (selector) {
    left.appendChild(li);
    selector = false;
  } else {
    rigth.appendChild(li);
    selector = true;
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
