var serverURL = "http://localhost:8080";

let number = 0;

function onload(){
  document.getElementById("url").value = serverURL
}

function coolio() {
  serverURL = document.getElementById("url").value

  document.getElementById("cool").innerHTML = "not cool";

  var time1 = Date.now();

  //Test GET request
  var request = new XMLHttpRequest();
  request.open("GET", serverURL, true);
  request.onload = function () {
    console.log("response time (ping): " + (Date.now() - time1));
    document.getElementById("cool").innerHTML = request.responseText;
  };
  request.send();

  //Test POST request
  var request2 = new XMLHttpRequest();
  request2.open("POST", "http://localhost:8080", true);
  request2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request2.send("number=" + number);

  request2.onload = function () {

    document.getElementById("theBox").innerHTML = request2.responseText;
    number = request2.responseText
    requestAnimationFrame(coolio)
  }

  
}
