"use strict";
var id = "";

window.onload = () => {
  id = randomString();
  document.getElementById("link2").innerHTML =
    "https://jagged-navy-cougar.glitch.me/host.html?id=" + id;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", '/play');
  xhr.addEventListener("load", () => {
    let result = JSON.parse(xhr.responseText);
    console.log(result);
    if (result.playing && result.client != 0) {
      window.location = "https://jagged-navy-cougar.glitch.me/waiting.html";
    }
  });
  xhr.send(null);
};

// --------------------------RandomString-----------------------------------------
// Availability: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

function randomString() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 22; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// --------------------------------------------------------------------------------

document.querySelector("#butn2").addEventListener("click", () => {
  window.location = "https://jagged-navy-cougar.glitch.me/search.html";
});

document.querySelector("#link3").addEventListener("click", () => {
  const url = "https://jagged-navy-cougar.glitch.me/host.html?id=" + id;
  var subject = "Invitation to RestaurantTinder";
  var body = "Here is the link to join the Game:) " + url;
  window.open("mailto:test@example.com?subject=" + subject + "&body=" + body);
});

document.querySelector("#link4").addEventListener("click", () => {
  const url = "https://jagged-navy-cougar.glitch.me/host.html?id=" + id;
  const el = document.createElement("textarea");
  el.value = url;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  console.log("link copied");
  alert("Copied the text: " + url);
});
