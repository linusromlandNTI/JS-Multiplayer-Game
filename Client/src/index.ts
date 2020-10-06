//Import other TS files
/// <reference path="http.ts" />
/// <reference path="ws.ts" />
/// <reference path="input.ts" />
/// <reference path="render.ts" />

//Changeable default values
let ws: boolean = true; //WS or HTTP
let url: string = "wss://cloudremover.com:8069"; //Default url, changeable by user
let spectator = false;

//Setup unchangable variables
let username: string;
let previousData = {};

//Run when body is loaded
function onHtmlLoad() {
  //Setup default values in input fields
  let urlInput = <HTMLInputElement>document.getElementById("url");
  if (urlInput) {
    urlInput.value = url;
  }

  let protocolCheck = <HTMLInputElement>(
    document.getElementById("protocolCheck")
  );
  if (protocolCheck) {
    protocolCheck.checked = ws;
  }

  let spectatorCheck = <HTMLInputElement>(
    document.getElementById("spectatorCheck")
  );
  if (spectatorCheck) {
    spectatorCheck.checked = spectator;
  }
}

//Attempt connection to server
async function connect() {
  //Return if username is not entered when not spectator
  let usernameInput = <HTMLInputElement>document.getElementById("username");
  username = usernameInput.value;
  if ((username == "" || username == null) && !spectator) {
    window.alert("Choose a username");
    return;
  }

  //Hide menu and show game
  let joinMenu = document.getElementById("joinMenu");
  if (joinMenu) {
    joinMenu.style.display = "none";
  }
  let mainCanvas = document.getElementById("mainCanvas");
  if (mainCanvas) {
    mainCanvas.style.display = "block";
  }

  //Connect to WebSocket if chosen
  if (ws) {
    await wsConnect();
  }

  //Start game loop
  gameLoop();
}

//Run every frame
function gameLoop() {
  //Send data if not spectator
  if (!spectator) {
    let usernameInput = <HTMLInputElement>document.getElementById("username");
    username = usernameInput.value;

    let currentData = {
      info: { name: username },
      keyboardInput: {
        w: keys[0][1],
        a: keys[1][1],
        s: keys[2][1],
        d: keys[3][1],
        shift: keys[4][1],
      },
      mouseInput: {
        x: mouseX,
        y: mouseY,
        mouseDown: mouseDown,
      },
    };

    //Send data only if data is different from last data sent
    if (!(JSON.stringify(previousData) == JSON.stringify(currentData))) {
      sendToServer(JSON.stringify(currentData));
    }
    previousData = currentData;
  }

  //Request next data if using HTTP
  if (!ws) {
    httpGet();
  }

  //Loop at next frame
  requestAnimationFrame(gameLoop);
}

//Run when getting message from server
function onMessage(message: string) {
  render(message);
}

//Send to HTTP or WS server
function sendToServer(message: string) {
  if (ws) {
    if (wsConnection) wsConnection.send(message);
  } else {
    httpPost(message);
  }
}
