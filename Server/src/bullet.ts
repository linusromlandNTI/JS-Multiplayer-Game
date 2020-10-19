import { Player } from "./player";
let gameConfig = require("../gameConfig.json");

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

  collides(player: Player): boolean {
    return (
      this.originPlayer != player &&
      this.x < player.x + gameConfig.playerWidth &&
      this.x + gameConfig.bulletWidth > player.x &&
      this.y < player.y + gameConfig.playerHeight &&
      this.y + gameConfig.bulletHeight > player.y
    );
  }

  outOfGameArea(): boolean {
    return (
      this.x < -100 ||
      this.x > gameConfig.gameWidth + 100 ||
      this.y < -100 ||
      this.y > gameConfig.gameHeight + 100
    );
  }
}
