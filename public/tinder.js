'use strict';

var data = [];
var voteList = [];
var removeList = [];
var restl = 8;
var firstVote = true;

window.onload = () => {
  //document.getElementsByClassName("tinder--card")[0].remove();
  let xhr = new XMLHttpRequest();
  xhr.open("GET", '/info');
  xhr.addEventListener("load", () => {
    let restaurant = JSON.parse(xhr.responseText);
    data = restaurant.data;
    voteList = restaurant.vote;
    firstVote = restaurant.first;
    
    //console.log(data);
    //console.log(voteList);
    //console.log(firstVote);
    
    for (var i = 0; i < data.length; i++) {
      if (!data[i]) {
        restl = i;
        break;
      }
    }
    
    if (firstVote && restl < 8) {
      for (var i = 0; i < 8; i++) {
        if (restl <= i) removeList.push(i);
      }
    }
    console.log(removeList);
    
    for (var i = 0; i < voteList.length; i++) {
      if ((voteList[i] == 0) && (!firstVote)) removeList.push(i);
    }
    
    for (var i = 0; i < removeList.length; i++) {
      document.getElementsByClassName("tinder--card")[removeList[i] - i].remove();
    }
    
    let img, name, rating, dollar, location, reviews, chosen;
    for (var i = 0; i < 8; i++) {
      if (removeList.includes(i)) continue;
      
      // Images
      img = 'rest' + (i + 1).toString();
      document.getElementById(img).src = data[i].image_url;
      
      // Names
      name = 'restname' + (i + 1).toString();
      document.getElementById(name).innerHTML = data[i].name;
      
      // Ratings
      rating = 'rating' + (i + 1).toString();
      document.getElementById(rating).src = getRating(data[i].rating);
      
      // Prices
      dollar = 'dollar' + (i + 1).toString();
      document.getElementById(dollar).innerHTML = ((data[i].hasOwnProperty('price')) ? data[i].price : '?');
      
      // Locations
      location = 'location' + (i + 1).toString();
      document.getElementById(location).innerHTML = data[i].location.display_address[0] + ', ' + data[i].location.display_address[1];
      
      // Reviews
      reviews = 'review' + (i + 1).toString();
      document.getElementById(reviews).innerHTML = data[i].review_count.toString() + ' reviews';
      
      // Chosen
      chosen = 'choose' + (i + 1).toString();
      document.getElementById(chosen).innerHTML = firstVote ? '0 chosen' : (voteList[i] + ' chosen');
    }
  });
  xhr.send(null);
};

function getRating(e) {
  switch (e) {
    // Asssets created by Jean from Noun Project
    case 0:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F0.png?v=1591398893926";
    case 0.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F1.png?v=1591398893926";
    case 1:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F2.png?v=1591398893926";
    case 1.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F3.png?v=1591398893926";
    case 2:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F4.png?v=1591398893926";
    case 2.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F5.png?v=1591398893926";
    case 3:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F6.png?v=1591398893926";
    case 3.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F7.png?v=1591398893926";
    case 4:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F8.png?v=1591398893926";
    case 4.5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F9.png?v=1591398893926";
    case 5:
      return "https://cdn.glitch.com/60cbf0c8-51a4-497f-a391-d3bf5e32e6be%2F10.png?v=1591398893926";
    default:
      return "/";
  }
}

var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');

const url = "wss://jagged-navy-cougar.glitch.me";
const connection = new WebSocket(url);

//----------------------- Reference: https://codepen.io/RobVermeer/pen/japZpY.js -------------------------
function initCards(card, index) {
  var newCards = document.querySelectorAll('.tinder--card:not(.removed)');
  // All cards selected
  if (newCards.length == 0) {stopTinder(); return;}
  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
  });
  
  tinderContainer.classList.add('loaded');
}

initCards();

allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');
    
    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      initCards();
    }
  });
});

function createButtonListener(love) {
  return function (event) {
    
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];

    card.classList.add('removed');

    if (love) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }

    initCards();

    event.preventDefault();
  };
}

var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);

// -----------------------------------------------------------------------------------------

function wait() {
  document.getElementById('tindercards').style.display = "none";
  document.getElementById('waitingimg').style.display = "block";
}

// All cards selected
function stopTinder() {
  var selections = [];
  let cards = document.querySelectorAll('.tinder--card');
  let sel;
  let count = 0;
  for (var i = 0; i < 8; i++) {
    // Add nope or love to list
    if (removeList.includes(i)) {
      selections.push(false);
    } else {
      sel = cards[count].style.transform[10] == '-' ? false : true;
      selections.push(sel);
      count += 1;
    }
  }
  console.log(selections);
  let cmdObj = {
    type: "result",
    choice: selections,
    complete: false,
    finish: false
  };
  connection.send(JSON.stringify(cmdObj));
  wait();
  //window.location = "https://jagged-navy-cougar.glitch.me/tinder.html";
}

connection.onopen = () => {
  connection.send(JSON.stringify({ type: "tinder" }));
};

connection.onerror = error => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = event => {
  console.log(event.data);
  if (event.data == "connected!" || event.data == "Disconnected") return;
  let msgObj = JSON.parse(event.data);
  if (msgObj.type == "result") {
    if (msgObj.complete) {
      if (msgObj.finish) window.location = "https://jagged-navy-cougar.glitch.me/result.html";
      else window.location = "https://jagged-navy-cougar.glitch.me/tinder.html";
    }
    
  }
};