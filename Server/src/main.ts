import { Player } from "./classes";

export let players: Array<Player> = [];

export let outData = "";

export function onMessage(message: string) {
  let inputs = JSON.parse(message);
  console.log(
    `User ${inputs.info.name} is moving! \nW = ${inputs.input.w}\nA = ${inputs.input.a}\nS = ${inputs.input.s}\nD = ${inputs.input.d}`
  );

  for (let i = 0; i < players.length; i++) {
    if (players[i].name == inputs.info.name) {
      players[i].w = inputs.input.w;
      players[i].a = inputs.input.a;
      players[i].s = inputs.input.s;
      players[i].d = inputs.input.d;
    }
  }
}

export function onJoin(name: string) {
  console.log("New player!");
  players.push(new Player(name));
}

export function onLoop() {
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    if(player.w) player.y -= 1;
    if(player.a) player.x -= 1;
    if(player.s) player.y += 1;
    if(player.d) player.x += 1;
  }
  outData = generateJson()
}

function generateJson(): string {
  let currentData = {
    players: [{ name: "tmp", x: 1, y: 1 }],
  };

  for (let i = 0; i < players.length; i++) {
    currentData.players.push({
      name: players[i].name,
      x: players[i].x,
      y: players[i].y,
    });
  }

  currentData.players.shift(); //Removes template data, TODO: make it without this

  return JSON.stringify(currentData)
}
