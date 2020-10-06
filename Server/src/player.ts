export class Player {
  name: string;
  //id: string;

  x: number = 0;
  y: number = 0;
  stamina: number = 100;


  w: boolean = false;
  a: boolean = false;
  s: boolean = false;
  d: boolean = false;
  shift: boolean = false;

  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;

    //this.id = Math.random().toString(36).slice(2).toString();

    console.log("New Player Created named " + name);
  }
}
