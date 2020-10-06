import { Player } from "./classes";

export let players: Array<Player> = [];
export let outData = "";

let areaW = 1500;
let areaH = 800;

let playerW = 30;
let playerH = 54;

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
      players[i].shift = inputs.input.shift;
    }
  }
}

export function onJoin(name: string) {
  console.log("New player!");
  players.push(
    new Player(
      name,
      Math.random() * (areaW - playerW),
      Math.random() * (areaH - playerH)
    )
  );
}

export function onLoop() {
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    let speed = 1;
    let moving = false;
    if (player.shift && player.stamina > 0) speed = 10;

    if (player.w){
      player.y -= speed;
      moving = true;
    } 

    if (player.a){
      player.x -= speed;
      moving = true;
    } 

    if (player.s){
      player.y += speed;
      moving = true;
    } 

    if (player.d){
      player.x += speed;
      moving = true;
    } 

    if(moving && player.shift){
      player.stamina = player.stamina - 1
    } 
    else{
      if(!(player.stamina >= 100)) player.stamina = player.stamina + 1
    } 

    player.x = Math.min(Math.max(player.x, 0), areaW - playerW);
    player.y = Math.min(Math.max(player.y, 0), areaH - playerH);
  }

  outData = generateJson();
}

function generateJson(): string {
  let currentData = {
    info: { areaW: areaW, areaH: areaH, playerW: playerW, playerH: playerH },
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

  return JSON.stringify(currentData);
}
