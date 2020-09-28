export class Player {
  name: string;
  id: string;

  x: number = 0;
  y: number = 0;

  constructor(name: string) {
    this.name = name;

    this.id = Math.random().toString(36).slice(2).toString();

    console.log("New Player Created named " + name + " with id " + this.id);
  }
}
