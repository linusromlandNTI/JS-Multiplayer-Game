var serverURL = "https://node.cloudremover.com";



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
  request2.open("POST", serverURL, true);
  request2.setRequestHeader("Content-type", "application/json");

  var data = '{ "Users" : [' +
  '{ "firstName":"John" , "lastName":"Doe" },' +
  '{ "firstName":"Anna" , "lastName":"Smith" },' +
  '{ "firstName":"Peter" , "lastName":"Jones" } ]}'; 
  request2.send(JSON.stringify(data));
}
