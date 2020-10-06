import fs from "fs";
import { config } from "process";

export class Player {
  
  name: string;

  gameConfig = require('../gameConfig.json');
  
  x: number = 0;
  y: number = 0;
  stamina: number
  health: number

  w: boolean = false;
  a: boolean = false;
  s: boolean = false;
  d: boolean = false;
  shift: boolean = false;

  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;

    this.stamina = this.gameConfig.staminaMax;
    this.health = this.gameConfig.health;
  }
}
