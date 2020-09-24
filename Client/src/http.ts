function httpGet() {
  let request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = function () {
    onMessage(request.responseText);
  };

  request.send();
}

function httpPost(message: string) {
  let request = new XMLHttpRequest();
  request.open("POST", "https://node.cloudremover.com", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(`data=${message}`);
}
