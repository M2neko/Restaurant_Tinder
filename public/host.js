import {animalList} from "/animal.js";
const clientname = animalList[Math.floor(Math.random() * animalList.length)];

const url = "wss://jagged-navy-cougar.glitch.me";
const connection = new WebSocket(url);

var firstPlayer = false;

let e = document.getElementById("chat");
e.addEventListener('change', sendNewMsg);

let n = document.getElementById("name");
n.innerHTML = clientname;

window.onload = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", '/play');
  xhr.addEventListener("load", () => {
    console.log(JSON.parse(xhr.responseText));
    let result = JSON.parse(xhr.responseText);
    console.log(result);
    if (result.playing) window.location = "https://jagged-navy-cougar.glitch.me/waiting.html";
  });
  xhr.send(null);
};

function signName(l) {
  let p = document.querySelectorAll('.dispname');
  for (var i = 0; i < p.length; i++) {
    p[i].innerHTML = l[i];
    if (l[i] != "Waiting...") p[i].style.color = "#118AB2";
    else p[i].style.color = "#FC7753";
  }
}

function signHost(f) {
  //console.log(firstPlayer);
  if (!f) {
    if (firstPlayer) return;
    document.getElementById("butn").style.display = "none";
    document.getElementById("wait0").style.display = "block";
  } else firstPlayer = true;
}

function updateHost(f) {
  console.log(firstPlayer);
  if (f) {
    if (!firstPlayer) return;
    document.getElementById("butn").style.display = "block";
    document.getElementById("wait0").style.display = "none";
  } else firstPlayer = false;
}

function sendNewMsg(key) {
  console.log("send");
  let e = document.getElementById("chat");
  let msgObj = {
    type: "message",
    from: clientname,
    msg: e.value
  };
  connection.send(JSON.stringify(msgObj));
  e.value = null;
}

let addMessage = function(message) {
  let text = document.getElementById("chatarea");
  let newline = String.fromCharCode(13, 10);
  //console.log(message);
  //console.log(text.textContent + '&#13;&#10;' + message);
  text.innerHTML = text.textContent == "" ? text.textContent + message : text.textContent + newline + message;
};

connection.onopen = () => {
  connection.send(JSON.stringify({ type: "helloClient" }));
  // Assign the name
  connection.send(JSON.stringify({type: "name", data: [], msg: clientname, first: false, location: "", term: ""}));
};

connection.onerror = error => {
  console.log(`WebSocket error: ${error}`);
};

connection.onclose = function(){
  /*
  let closeObj = {
    type: "closeCmd",
    client: clientname,
    msg: "disconnected",
    data: []
  };
  console.log(closeObj);
  connection.send(JSON.stringify(closeObj));
  */
}
connection.onmessage = event => {
  console.log(event.data);
  if (event.data == "connected!" || event.data == "Disconnected") return;
  let msgObj = JSON.parse(event.data);
  if (msgObj.type == "name") {
    signHost(msgObj.first);
    signName(msgObj.data);
    //addMessage("Search location: " + msgObj.location);
    //addMessage("Search term: " + msgObj.term);
    addMessage("Welcome " + msgObj.msg + "!");
  }
  if (msgObj.type == "nextTinder") {
    window.location = "https://jagged-navy-cougar.glitch.me/tinder.html";
  }
  if (msgObj.type == "message") {
    addMessage(msgObj.from + ": " + msgObj.msg);
  }
  if (msgObj.type == "closeCmd") {
    if (clientname == msgObj.data[0]) {
      firstPlayer = true;
      updateHost(true);
    }
    signName(msgObj.data);
    //addMessage(msgObj.client + " disconnected!");
  }
};

// NEXT HTML
document.querySelector('#butn').addEventListener('click', () => {connection.send(JSON.stringify({ type: "nextTinder" }));});

// Send Onclose
window.onbeforeunload = () => { if (connection) {
  let closeObj = {
    type: "closeCmd",
    client: clientname,
    msg: "disconnected",
    data: []
  };
  console.log(closeObj);
  connection.send(JSON.stringify(closeObj));
}};