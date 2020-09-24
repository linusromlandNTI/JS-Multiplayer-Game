import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import { stringify } from "querystring";
import WebSocket from "ws";
import fs from 'fs';
import https from 'https'

let position: number = 0;

const httpsServer = https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/cloudremover.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/cloudremover.com/cert.pem")
});

httpsServer.on('request', (req, res) => {
    res.writeHead(200);
    res.end('hello HTTPS world\n');
});

const wss = new WebSocket.Server({ server: httpsServer });

function wsServer() {
    wss.on("connection", (ws) => {

        setInterval(ws.send, 15, ws)

        ws.on("message", (message: string) => {
            console.log(message)
        });
        function sendMessage(ws: WebSocket) {
            ws.send(position);
          }
    });
}
httpsServer.listen(8069);

wsServer()

const app = express();
const port = 8080; // default port to listen
let msg: string = "hej";
let rec: string;

httpServer();

function httpServer() {
    app.use(cors())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get("/", (req, res) => {
        res.send(position);
    });

    app.post('/', function (req, res) {
        let message: string = req.body
        if (message == "d") {
            position = position + 10;
          } if (message == "a") {
            position = position - 10
          }        res.end()
    })

    app.listen(port, () => {
        console.log(`HTTP Server started on port ${port}`);
    });
}

