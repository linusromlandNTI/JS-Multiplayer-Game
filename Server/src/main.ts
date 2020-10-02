import { Player } from "./classes";

export let players: Array<Player> = [];

export let data = {
  players: [{ name: "tmp", x: 1, y: 1 }],
};

export function onMessage(message: string) {
  console.log("New Message!");
}

export function onJoin(name: string) {
  console.log("New player!");
  players.push(new Player(name));

  data.players.push({
    name: name,
    x: 10,
    y: 15,
  });
}

export function onLoop() {
  console.log("Coool loooooop");
}

