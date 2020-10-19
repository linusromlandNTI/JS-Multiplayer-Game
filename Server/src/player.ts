export class Player {
  name: string;

  gameConfig = require("../gameConfig.json");

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

    this.stamina = this.gameConfig.staminaMax;
    this.health = this.gameConfig.health;
  }
}
