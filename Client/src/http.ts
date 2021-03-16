//Send GET request to server
function httpGet() {
  let request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = function () {
    onMessage(request.responseText);
  };

  request.send();
}

//Send POST request to server
function httpPost(message: string) {
  let request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(`data=${message}`);
}
