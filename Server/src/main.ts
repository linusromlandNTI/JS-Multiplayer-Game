import { Player, Bullet } from "./classes";

export let players: Array<Player> = [];
export let bullets: Array<Bullet> = [];
export let outData = "";
let startTime = Date.now();
let gameConfig = require("../gameConfig.json");

let areaW = gameConfig.gameWidth;
let areaH = gameConfig.gameHeight;

let playerW = 30;
let playerH = 54;

let gameTime = gameConfig.roundTime;

export function onMessage(message: string) {
  let inputs = JSON.parse(message);

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
  players.push(
    new Player(
      name,
      Math.random() * (areaW - playerW),
      Math.random() * (areaH - playerH)
    )
  );
}

export function onLoop() {
  if (Date.now() >= startTime + gameTime) {
    players = [];
    bullets = [];
    startTime = Date.now();
  }

  bullets.push(
    new Bullet(
      Math.random() * (areaW - playerW),
      Math.random() * (areaH - playerH),
      Math.random() * (areaH - playerH),
      Math.random() * (areaH - playerH)
    )
  );

  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    let speed = gameConfig.speedBase;
    let moving = false;
    if (player.shift && player.stamina > 0) speed = gameConfig.speedSprint;

    if (player.w) {
      player.y -= speed;
      moving = true;
    }

    if (player.a) {
      player.x -= speed;
      moving = true;
    }

    if (player.s) {
      player.y += speed;
      moving = true;
    }

    if (player.d) {
      player.x += speed;
      moving = true;
    }

    if (moving && player.shift && player.stamina > -2) {
      player.stamina = player.stamina - gameConfig.staminaUse;
    } else {
      if (!(player.stamina >= gameConfig.staminaMax))
        player.stamina = player.stamina + gameConfig.staminaRefill;
    }

    player.x = Math.min(Math.max(player.x, 0), areaW - playerW);
    player.y = Math.min(Math.max(player.y, 0), areaH - playerH);
  }

  outData = generateJson();
}

function generateJson(): string {
  let currentData = {
    info: {
      areaW: areaW,
      areaH: areaH,
      playerW: playerW,
      playerH: playerH,
      time: gameTime - (Date.now() - startTime),
    },
    players: [{ name: "tmp", x: 1, y: 1, stamina: 1, health: 1 }],
    bullets: [{ x: 1, y: 1 }],
  };

  for (let i = 0; i < players.length; i++) {
    currentData.players.push({
      name: players[i].name,
      x: players[i].x,
      y: players[i].y,
      stamina: players[i].stamina,
      health: players[i].health,
    });
  }

  for (let i = 0; i < bullets.length; i++) {
    currentData.bullets.push({
      x: bullets[i].x,
      y: bullets[i].y,
    });
  }

  currentData.players.shift(); //Removes template data, TODO: make it without this
  currentData.bullets.shift(); //Removes template data, TODO: make it without this

  return JSON.stringify(currentData);
}
