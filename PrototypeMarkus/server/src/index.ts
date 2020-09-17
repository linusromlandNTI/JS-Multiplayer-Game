import WebSocket from "ws";
import Fs from 'fs';
import Https from 'https'

const httpsServer = Https.createServer({
  key: Fs.readFileSync("/etc/letsencrypt/live/cloudremover.com/privkey.pem"),
  cert: Fs.readFileSync("/etc/letsencrypt/live/cloudremover.com/cert.pem")
});

const wss = new WebSocket.Server({ server: httpsServer });

httpsServer.on('request', (req, res) => {
  res.writeHead(200);
  res.end('hello HTTPS world\n');
});


const chunkSize: number = 1000;

console.log("Server started");

let position: number = 0;

wss.on("connection", (ws) => {
  var cooldate: number = Date.now();

  setInterval(sendMessage, 15, ws)

  ws.on("message", (message: any) => {
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

httpsServer.listen(4430);