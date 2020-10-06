import { textChangeRangeIsUnchanged } from "typescript";

export class Bullet {
  id: string;

  x: number = 0;
  y: number = 0;

  xSpeed: number = 0;
  ySpeed: number = 0;

  constructor(id: string, x: number, y: number, xSpeed: number, ySpeed: number) {
    this.id = name;
    this.x = x;
    this.y = y;

    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    
  }
}
