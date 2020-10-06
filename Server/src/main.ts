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
    let player = players[i];
    let keyboardInput = inputs.keyboardInput;
    let mouseInput = inputs.mouseInput;
    if (player.name == inputs.info.name) {
      player.w = keyboardInput.w;
      player.a = keyboardInput.a;
      player.s = keyboardInput.s;
      player.d = keyboardInput.d;
      player.shift = keyboardInput.shift;

      player.mouseX = mouseInput.x;
      player.mouseY = mouseInput.Y;
      player.mouseDown = mouseInput.mouseDown;

      let deltaX = player.mouseX - player.x;
      let deltaY = player.mouseY - player.y;
      let rad = Math.atan2(deltaY, deltaX); // In radians
      console.log(rad);
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

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].x += bullets[i].xSpeed;
    bullets[i].y += bullets[i].ySpeed;
  }

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

    if (Math.random() > 0.9) {
      bullets.push(
        new Bullet(
          player.x,
          player.y,
          (Math.random() * (areaH - playerH)) / 100,
          (Math.random() * (areaH - playerH)) / 100
        )
      );
    }
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
