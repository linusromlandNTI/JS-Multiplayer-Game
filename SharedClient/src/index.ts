/// <reference path="http.ts" />
/// <reference path="ws.ts" />
/// <reference path="input.ts" />


let ws: boolean = true; //WS or HTTP
let url: string = "wss://cloudremover.com:8069"; //Default url, changeable by user

function onHtmlLoad() {
  let urlInput = <HTMLInputElement>document.getElementById("url");
  if (urlInput) {
    urlInput.value = url;
  }

  let checkBox = <HTMLInputElement>document.getElementById("protocolCheck");
  if (checkBox) {
    checkBox.checked = ws;
  }
}

//Start game loop
async function start() {
  if (ws) {
    await wsConnect();
  }

  gameLoop();
}

//Running every frame
function gameLoop() {
  var inputData =
    '{"w":' + w + ', "a":' + a + ', "s":' + s + ', "d":' + d + "}";

  sendToServer(inputData); //Insert Input JSon data here

  if (!ws) {
    httpGet();
  }

  requestAnimationFrame(gameLoop); //Loop next frame
}

function onMessage(message: string) {
  console.log("ws " + ws + " says: " + message);
}

//Send to HTTP or WS server
function sendToServer(message: string) {
  if (ws) {
    if (wsConnection) wsConnection.send(message);
  } else {
    httpPost(message);
  }
}

