/// <reference path="http.ts" />
/// <reference path="ws.ts" />

let ws: boolean = false; //WS or HTTP
let url: string = "wss://cloudremover.com:8069"; //Default url, changeable by user

//Start game loop
function start() {
  
  if(ws){
    wsConnect()
  }
  
  gameLoop()
}

//Running every frame
function gameLoop() {
  sendToServer("placeholder"); //Insert Input JSon data here

  if (!ws) {
    httpGet();
  }

  requestAnimationFrame(gameLoop); //Loop next frame
}

function onMessage(message: string){
  console.log("ws " + ws + " says: " + message)
}

//Send to HTTP or WS server
function sendToServer(message: string) {
  if (ws) {
    wsConnection.send(message)
  } else {
    httpPost(message)
  }
}

//Checking for key inputs
document.addEventListener("keydown", function (event) {
  sendToServer(event.key);
});

function changeProtocol(){

  let checkBox = <HTMLInputElement> document.getElementById("protocolCheck")
  if(checkBox){
    ws = checkBox.checked
  }

  if(ws){
    wsConnect()
  }else{
    wsClose()
  }

  console.log(ws)
}

function changeURL(){
  let urlInput = <HTMLInputElement> document.getElementById("url")
  if(urlInput){
    url = urlInput.value
  }
}