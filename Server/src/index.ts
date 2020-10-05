import { Ws, Http } from "./classes";
import { onMessage, onJoin, onLoop, players, outData } from "./main";

let ws;
let http;
createHttpServer();
createWsServer();

setInterval(onLoop, 15);

function createHttpServer() {
  http = new Http(8080);

  http.app.post("/", function (req, res) {
    onPost(req.body.data);
    res.end();
  });

  http.app.get("/", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(outData);
  });
}

function createWsServer() {
  ws = new Ws(8069);

  ws.wss.on("connection", (wsLib) => {
    setInterval(sendMessage, 15);

    function sendMessage() {
      wsLib.send(outData);
    }

    wsLib.on("message", (message: string) => {
      onPost(message);
    });
  });
}

function onPost(message: string) {
  try {
    let inputs = JSON.parse(message);
    if (existingPlayer(inputs.info.name.toString())) {
      onMessage(message);
    } else {
      onJoin(inputs.info.name);
    }
  } catch (error) {
    console.error(error);
  }
}

//Check if player with name exists
function existingPlayer(name: string) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].name == name) {
      return true;
    }
  }
  return false;
}
