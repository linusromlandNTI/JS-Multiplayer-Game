import { config } from "process";
import { Player, Bullet } from "./classes";

export let players: Array<Player> = [];
export let bullets: Array<Bullet> = [];
export let outData = "";
let startTime = Date.now();
let gameConfig = require("../gameConfig.json");

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
      player.mouseY = mouseInput.y;
      player.mouseDown = mouseInput.mouseDown;
    }
  }
}

export function onJoin(name: string) {
  players.push(
    new Player(
      name,
      Math.random() * (gameConfig.gameWidth - gameConfig.playerWidth),
      Math.random() * (gameConfig.gameHeight - gameConfig.playerHeight)
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

    let bullet = bullets[i];

    for (let j = 0; j < players.length; j++) {
      let player = players[j];
      if (
        bullet.x < player.x + gameConfig.playerWidth &&
        bullet.x + gameConfig.bulletWidth > player.x &&
        bullet.y < player.y + gameConfig.playerHeight &&
        bullet.y + gameConfig.bulletHeight > player.y
      ) {
        console.log("Collision!");
        bullets.splice(i, 1);

      }
    }
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

    if (player.mouseDown && player.canShoot) {
      let deltaX = player.mouseX - player.x;
      let deltaY = player.mouseY - player.y;
      let rad = Math.atan2(deltaY, deltaX);

      let randomnessRad = rad + (Math.random() - 0.5) * gameConfig.randomAim;

      let speedX = Math.cos(randomnessRad) * gameConfig.bulletSpeed;
      let speedY = Math.sin(randomnessRad) * gameConfig.bulletSpeed;

      bullets.push(new Bullet(player.x, player.y, speedX, speedY));

      player.canShoot = false;

      setTimeout(returnBullet, gameConfig.bulletRefill, player);
    }

    if (moving && player.shift && player.stamina > -2) {
      player.stamina = player.stamina - gameConfig.staminaUse;
    } else {
      if (!(player.stamina >= gameConfig.staminaMax))
        player.stamina = player.stamina + gameConfig.staminaRefill;
    }

    player.x = Math.min(
      Math.max(player.x, 0),
      gameConfig.gameWidth - gameConfig.playerWidth
    );
    player.y = Math.min(
      Math.max(player.y, 0),
      gameConfig.gameHeight - gameConfig.playerHeight
    );
  }

  outData = generateJson();
}

function returnBullet(player: Player) {
  player.canShoot = true;
}

function generateJson(): string {
  let currentData = {
    info: {
      areaW: gameConfig.gameWidth,
      areaH: gameConfig.gameHeight,
      playerW: gameConfig.playerWidth,
      playerH: gameConfig.playerHeight,
      bulletW: gameConfig.bulletWidth,
      bulletH: gameConfig.bulletHeight,
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
