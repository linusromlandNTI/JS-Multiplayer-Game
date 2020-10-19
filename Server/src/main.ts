import { Player, Bullet } from "./classes";

export let players: Array<Player> = [];
export let bullets: Array<Bullet> = [];
export let outData = "";
let gameConfig = require("../gameConfig.json");

export function onMessage(message: string) {
  let inputs = JSON.parse(message);

  for (let i = 0; i < players.length; i++) {
    let player = players[i];

    if (player.name == inputs.info.name) {
      player.latestInput = Date.now();

      if (player.dead && Date.now() - player.dieTime > gameConfig.reviveTime) {
        player.dead = false;
        player.health = gameConfig.health;
      }

      let keyboardInput = inputs.keyboardInput;
      let mouseInput = inputs.mouseInput;
      player.w = keyboardInput.w;
      player.a = keyboardInput.a;
      player.s = keyboardInput.s;
      player.d = keyboardInput.d;
      player.shift = keyboardInput.shift;

      player.mouseAngle = mouseInput.angle;
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
  let currentTime = Date.now();
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].x += bullets[i].xSpeed;
    bullets[i].y += bullets[i].ySpeed;

    let bullet = bullets[i];

    //Remove bullet if out of play area
    if (bullet.outOfGameArea()) {
      bullets.splice(i, 1);
    }

    //Check collision with all players
    for (let j = 0; j < players.length; j++) {
      let player = players[j];

      if (bullet.collides(player)) {
        if (player.health <= 0) {
          player.dead = true;
          player.dieTime = currentTime;

          //Give points to killer
          bullet.originPlayer.points += 1;
        } else {
          bullets.splice(i, 1);
          player.health -= gameConfig.bulletDamage;
        }
      }
    }
  }

  for (let i = 0; i < players.length; i++) {
    let player = players[i];

    if (currentTime - player.latestInput > gameConfig.timeout) {
      players.splice(i, 1);
    }

    if (player.dead) continue;

    //Move player
    player.move();

    if (player.mouseDown && player.canShoot) {
      let rad = player.mouseAngle;

      //Add a bit of randomness to bullet trajectory
      let randomnessRad = rad + (Math.random() - 0.5) * gameConfig.randomAim;
      let speedX = Math.cos(randomnessRad) * gameConfig.bulletSpeed;
      let speedY = Math.sin(randomnessRad) * gameConfig.bulletSpeed;

      bullets.push(new Bullet(player, player.x, player.y, speedX, speedY));

      player.canShoot = false;

      setTimeout(returnBullet, gameConfig.bulletRefill, player);
    }
  }
  outData = generateJson();
}

function resetGame() {
  players = [];
  bullets = [];
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
    },
    players: [{ name: "tmp", x: 1, y: 1, stamina: 1, health: 1, dead: false }],
    bullets: [{ x: 1, y: 1, angle: 1 }],
  };

  for (let i = 0; i < players.length; i++) {
    currentData.players.push({
      name: players[i].name,
      x: players[i].x,
      y: players[i].y,
      stamina: players[i].stamina,
      health: players[i].health,
      dead: players[i].dead,
    });
  }

  for (let i = 0; i < bullets.length; i++) {
    currentData.bullets.push({
      x: bullets[i].x,
      y: bullets[i].y,
      angle: Math.atan2(bullets[i].ySpeed, bullets[i].xSpeed),
    });
  }

  currentData.players.shift();
  currentData.bullets.shift();

  return JSON.stringify(currentData);
}
