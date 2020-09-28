import { Player } from "./classes";
import { Ws } from "./classes";
import { Http } from "./classes";

let position: number = 0;
let players: Array<Player> = [];

let ws;
let http;
createHttpServer();
createWsServer();

function createHttpServer() {
  http = new Http();

  http.app.post("/", function (req, res) {
    onMessage(req.body.data);
    res.end();
  });
}

function createWsServer() {
  ws = new Ws();

  ws.wss.on("message", (message: string) => {
    onMessage(message);
  });
}

function onMessage(message: string) {
  try {
    let inputs = JSON.parse(message);
    if (validPlayer(inputs.info.name.toString())) {
      console.log(
        `User ${inputs.info.name} is moving! \nW = ${inputs.input.w}\nA = ${inputs.input.a}\nS = ${inputs.input.s}\nD = ${inputs.input.d}`
      );
    } else {
      players.push(new Player(inputs.info.name));
    }
  } catch (error) {
    console.error(error);
  }
}

//Check if player with name exists
function validPlayer(name: any) {
  players.forEach((player) => {
    if (player.name == name) {
      return true;
    }
  });

  return false;
}
