import { Player } from "./classes";
import { Ws } from "./classes";
import { Http } from "./classes";

let players: Array<Player> = [];

let ws;
let http;
createHttpServer();
createWsServer();

let data = "";
setInterval(generateJson, 15);


function createHttpServer() {
  http = new Http(8080);

  http.app.post("/", function (req, res) {
    onMessage(req.body.data);
    res.end();
  });

  http.app.get("/", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  });
}

function createWsServer() {
  ws = new Ws(8069);

  ws.wss.on("connection", (wsLib) => {
    setInterval(sendMessage, 15, data);

    function sendMessage(message: string) {
      wsLib.send(message);
    }

    wsLib.on("message", (message: string) => {
      onMessage(message);
    });
  });
}

//TODO: FIX!
function generateJson() {

  let currentData = {
    players: [{ name: "tmp", x: 1, y: 1 }]
  };

  for (let i = 0; i < players.length; i++) {
    currentData.players.push({
      name: players[i].name,
      x: players[i].x,
      y: players[i].y,
    });
  }
  

  currentData.players.shift(); //Removes template data, TODO: make it without this


  data = JSON.stringify(currentData);

  //console.log(JSON.stringify(currentData));
  //console.log(data);
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
      generateJson();
    }
  } catch (error) {
    console.error(error);
  }
}

//Check if player with name exists
function validPlayer(name: string) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].name == name) {
      return true;
    }
  }
  return false;
}
