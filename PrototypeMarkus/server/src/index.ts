import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 8080 });

const chunkSize: number = 1000;

console.log("Server started");

let totalRequests = 0;

wss.on("connection", (ws) => {
  var cooldate: number = Date.now();
  
  setInterval(sendMessage, 15, ws)

  ws.on("message", (message) => {
    
    
  });
});


function sendMessage(ws: WebSocket) {

  ws.send(Math.random() * 500);
}