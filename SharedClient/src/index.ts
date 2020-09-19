/// <reference path="http.ts" />
/// <reference path="ws.ts" />

let ws: boolean = true; //WS or HTTP
let url: string = "wss://cloudremover.com:8069"; //Default url, changeable by user

//Start game loop
function start() {
  gameLoop();
}

//Running every frame
function gameLoop() {
  sendToServer("placeholder"); //Insert Input JSon data here

  if (!ws) {
    httpGet();
  }

  requestAnimationFrame(gameLoop); //Loop next frame
}

//Checking for key inputs
document.addEventListener("keydown", function (event) {
  sendToServer(event.key);
});

//Send to HTTP or WS server
function sendToServer(message: string) {
  if (ws) {
    wsConnection.send(message);
  } else {
    httpPost(message);
  }
}
