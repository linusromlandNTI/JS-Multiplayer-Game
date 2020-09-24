import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { stringify } from "querystring";
import WebSocket from "ws";
import fs from "fs";
import https from "https";

let position: number = 0;
let players: Array<object> = [];
players.push(Player("Linus"));

const httpsServer = https.createServer({
  key: fs.readFileSync("/etc/letsencrypt/live/cloudremover.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/cloudremover.com/cert.pem"),
});

httpsServer.on("request", (req, res) => {
  res.writeHead(200);
  res.end("hello HTTPS world\n");
});

const wss = new WebSocket.Server({ server: httpsServer });

function wsServer() {
  wss.on("connection", (ws) => {
    setInterval(sendMessage, 15, "test");

    ws.on("message", (message: string) => {
      try {
        let inputs = JSON.parse(message);

        console.log("\nw: " + inputs.input.w);
        console.log("name: " + inputs.info.name);
        console.log("whole message: " + message);
      } catch (error) {
        console.error(error);
      }
    });
    function sendMessage(message: string) {
      ws.send(message);
    }
  });
}
httpsServer.listen(8069);

wsServer();

const app = express();
const port = 8080; // default port to listen
let msg: string = "hej";
let rec: string;

httpServer();

function httpServer() {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.get("/", (req, res) => {
    res.send(position);
  });

  app.post("/", function (req, res) {
    let message: string = req.body;
    if (message == "d") {
      position = position + 10;
    }
    if (message == "a") {
      position = position - 10;
    }
    res.end();
  });

  app.listen(port, () => {
    console.log(`HTTP Server started on port ${port}`);
  });
}

function Player(name: any) {
  const obj = {
    name: String,
    x: Number,
    y: Number,
  };
  obj.name = name;

  return obj;
}
