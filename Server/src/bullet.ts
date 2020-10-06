import { Player } from "./player";

export class Bullet {
  x: number = 0;
  y: number = 0;

  xSpeed: number = 0;
  ySpeed: number = 0;

  originPlayer: Player;

  constructor(
    originPlayer: Player,
    x: number,
    y: number,
    xSpeed: number,
    ySpeed: number
  ) {
    this.originPlayer = originPlayer;

    this.x = x;
    this.y = y;

    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }
}
