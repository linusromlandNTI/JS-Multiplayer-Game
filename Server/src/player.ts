export class Player {
  name: string;
  id: string;

  x: Number = 0;
  y: Number = 0;

  constructor(name: string) {
    this.name = name;

    this.id = Math.random().toString(36).slice(2).toString();

    console.log("New Player Created named " + name + " with id " + this.id);
  }
}
