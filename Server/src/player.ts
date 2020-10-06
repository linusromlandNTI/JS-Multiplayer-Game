import fs from "fs";
import { config } from "process";

export class Player {
  
  name: string;
  //id: string;

  config: JSON = JSON.parse(fs.readFileSync('gameConfig.json', 'utf8'));
  //config = require('../gameConfig.json');
  
  x: number = 0;
  y: number = 0;
  stamina: number = 100;
  health: number = 100;

  w: boolean = false;
  a: boolean = false;
  s: boolean = false;
  d: boolean = false;
  shift: boolean = false;

  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;

    this.health = Math.random() * 100;

    //this.id = Math.random().toString(36).slice(2).toString();

    console.log("New Player Created named " + name);

    console.log(config);
  }
}
