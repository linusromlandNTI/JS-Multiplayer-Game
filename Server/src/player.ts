import { Bullet } from "./classes";

let gameConfig = require("../gameConfig.json");

export class Player {
  name: string;

  points = 0;

  x: number = 0;
  y: number = 0;
  stamina: number;
  health: number;

  w: boolean = false;
  a: boolean = false;
  s: boolean = false;
  d: boolean = false;
  shift: boolean = false;

  mouseAngle: number = 0;
  mouseDown: boolean = false;

  canShoot = true;

  dead = false;
  dieTime = 0;

  latestInput = 0;

  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;

    this.stamina = gameConfig.staminaMax;
    this.health = gameConfig.health;
  }

  move() {
    let speed = gameConfig.speedBase;
    let moving = false;
    if (this.shift && this.stamina > 0) speed = gameConfig.speedSprint;

    if (this.w) {
      this.y -= speed;
      moving = true;
    }

    if (this.a) {
      this.x -= speed;
      moving = true;
    }

    if (this.s) {
      this.y += speed;
      moving = true;
    }

    if (this.d) {
      this.x += speed;
      moving = true;
    }

    if (moving && this.shift && this.stamina > -2) {
      this.stamina = this.stamina - gameConfig.staminaUse;
    } else {
      if (!(this.stamina >= gameConfig.staminaMax))
        this.stamina = this.stamina + gameConfig.staminaRefill;
    }

    this.x = Math.min(
      Math.max(this.x, 0),
      gameConfig.gameWidth - gameConfig.playerWidth
    );
    this.y = Math.min(
      Math.max(this.y, 0),
      gameConfig.gameHeight - gameConfig.playerHeight
    );
  }

  shoot(): Array<number> {
    if (this.mouseDown && this.canShoot) {
      let rad = this.mouseAngle;

      //Add a bit of randomness to bullet trajectory
      let randomnessRad = rad + (Math.random() - 0.5) * gameConfig.randomAim;
      let speedX = Math.cos(randomnessRad) * gameConfig.bulletSpeed;
      let speedY = Math.sin(randomnessRad) * gameConfig.bulletSpeed;

      this.canShoot = false;
      setTimeout(this.returnBullet, gameConfig.bulletRefill);

      return [this.x, this.y, speedX, speedY];
    }
    return [];
  }

  private returnBullet() {
    this.canShoot = true;
  }
}
