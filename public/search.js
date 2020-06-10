"use strict";

import {categoryList} from "/category.js";

document.querySelector("#forgot").addEventListener("click", () => {
  window.location = "https://jagged-navy-cougar.glitch.me/game.html";
});

document.querySelector("#butn3").addEventListener("click", function() {
  let search_location = document.getElementById("textarea1").textContent == "" ? "Davis, ca" : document.getElementById("textarea1").textContent;
  let search_term = document.getElementById("textarea2").value == "" ? "Cafes" : document.getElementById("textarea2").value;
  let xhr = new XMLHttpRequest();
  let info = {
    location: search_location,
    term: search_term
  };
  xhr.open("POST", "/search", true);
  xhr.setRequestHeader("content-Type", "application/json;charset=UTF-8");
  xhr.onloadend = function(e) {
    window.location = "https://jagged-navy-cougar.glitch.me/host.html";
  };
  console.log(info);
  xhr.send(JSON.stringify(info));
});

// Autocompletion
// Reference: https://leaverou.github.io/awesomplete
var input = document.getElementById("textarea2");
var awesomplete = new Awesomplete(input);
awesomplete.list = categoryList;