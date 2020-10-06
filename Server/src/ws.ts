import WebSocket from "ws";
import fs from "fs";
import https from "https";

export class Ws {

  gameConfig = require("../gameConfig.json");

  httpsServer = https.createServer({
    key: fs.readFileSync(this.gameConfig.authKey),
    cert: fs.readFileSync(this.gameConfig.authCert),
  });

  wss: WebSocket.Server;

  constructor(port: number) {
    this.httpsServer.on("request", (req, res) => {
      res.writeHead(200);
      res.end("hello HTTPS world\n");
    });

    this.wss = new WebSocket.Server({ server: this.httpsServer });

    this.httpsServer.listen(port);
    console.log(`WebSocket Server started on port ${port}`);
  }
}
