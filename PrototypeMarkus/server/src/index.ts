import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 8080 });

const chunkSize: number = 1000;

console.log("Server started");

let position: number = 0;

wss.on("connection", (ws) => {
  var cooldate: number = Date.now();

  setInterval(sendMessage, 15, ws)

  ws.on("message", (message) => {
    console.log(message.toString());

    if (message == "d") {
      position = position + 10;
    } if (message == "a") {
      position = position - 10

    }
  });
});

let positionLast: number
function sendMessage(ws: WebSocket) {
  //if (!(position == positionLast)) {
  ws.send(position);
  // }
  // positionLast = position;
}