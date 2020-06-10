window.onload = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", '/result');
  xhr.addEventListener("load", () => {
    console.log(JSON.parse(xhr.responseText));
    let result = JSON.parse(xhr.responseText);
    let rests, votes, numPlayers;
    let container = document.getElementsByClassName("bar-container");
    console.log(container[0]);
    numPlayers = result.players;
    /*let tmp = 4; test bar width*/
    for (var i = 0; i < 8; i++) {
      
      // Rests
      rests = 'result' + (i + 1).toString();
      document.getElementById(rests).innerHTML = result.rests[i];
      
      // Votes
      votes = 'vote' + (i + 1).toString();
      document.getElementById(votes).innerHTML = result.votes[i].toString();
      let perce = Math.round((result.votes[i]/numPlayers)*100) + "%";
      /*let perce = Math.round((result.votes[i]/tmp)*100) + "%";*/
      let current = document.getElementById(i+"#");
      /*console.log(current);
      console.log(numPlayers);
      console.log(result.votes[i]/numPlayers);
      console.log(Math.round((result.votes[i]/numPlayers)*100));
      console.log(result.votes[i]);
      console.log(perce);*/
      current.style.width = perce;
    }
    
    
    document.getElementById("rest1").src = result.pick.image_url;
    document.getElementById("restname1").innerHTML = result.pick.name;
    document.getElementById("dollar1").innerHTML = ((result.pick.hasOwnProperty('price')) ? result.pick.price : '?');;
    document.getElementById("rating1").src = getRating(result.pick.rating);
    document.getElementById("location1").innerHTML = result.pick.location.display_address[0] + ', ' + result.pick.location.display_address[1];
    document.getElementById("review1").innerHTML = result.pick.review_count.toString() + ' reviews';
    
    document.querySelector("#bun").addEventListener("click", () => {
      window.location = "https://jagged-navy-cougar.glitch.me";
    });
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