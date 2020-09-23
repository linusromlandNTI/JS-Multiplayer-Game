import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import { stringify } from "querystring";
import WebSocket from "ws";
import fs from 'fs';
import https from 'https'


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

        ws.on("message", (message: any) => {
            console.log(message.toString());
        });
    });
}
httpsServer.listen(8069);



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
        res.send(msg);
    });

    app.post('/', function (req, res) {
        rec = req.body
        res.end()
    })

    app.listen(port, () => {
        console.log(`HTTP Server started on port ${port}`);
    });
}

