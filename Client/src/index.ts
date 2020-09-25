/// <reference path="http.ts" />
/// <reference path="ws.ts" />
/// <reference path="input.ts" />

let ws: boolean = true; //WS or HTTP
let url: string = "wss://cloudremover.com:8069"; //Default url, changeable by user
let move = document.getElementById("moveable");
let username: string;

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

let previousData = {};

//Running every frame
function gameLoop() {
  let username = <HTMLInputElement>document.getElementById("username");
  
  if (username == null) {
    window.alert("Choose a username")
  } else {
    var currentData = {
      info: { name: username.value },
      input: { w: w, a: a, s: s, d: d },
    };
  
    //Optimisation to only send data if data is different from last data sent
    if (!(JSON.stringify(previousData) == JSON.stringify(currentData))) {
      
      sendToServer(JSON.stringify(currentData));
    }
    previousData = currentData;
  
    if (!ws) {
      httpGet();
    }
    //}
  

    requestAnimationFrame(gameLoop); //Loop next frame
  }

  function onMessage(message: string) {
    //console.log("ws " + ws + " says: " + message);
    if (move) {
      move.style.width = parseInt(message) + "px";
    }
  }

  //Send to HTTP or WS server
  function sendToServer(message: string) {
    if (ws) {
      if (wsConnection) wsConnection.send(message);
    } else {
      httpPost(message);
    }
  }
}
