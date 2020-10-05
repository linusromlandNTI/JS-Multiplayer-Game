let pWidth = 20;
let pHeight = 20;

function render(message: string) {
  var c = <HTMLCanvasElement>document.getElementById("mainCanvas");
  var ctx = c.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, c.width, c.height);

    ctx.font = "14px Arial";
    ctx.textAlign = "center";

    let jsonMessage = JSON.parse(message);

    //console.log("render message: " + message + "len" + jsonMessage.players[2].name);

    for (let i = 0; i < jsonMessage.players.length; i++) {
      let player = jsonMessage.players[i];

      let name = player.name;
      if (name.length > 15) name = name.substr(0, 15);
      ctx.fillText(name, player.x+(pWidth/2), player.y-(pHeight/2)); 

      drawRect(ctx, player.x, player.y, pWidth, pHeight);

      

      
    }
  }
}

function drawRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fill();
  ctx.stroke();
}
