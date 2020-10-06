//Render canvas from JSON from server
function render(message: string) {
  //Parse message into JSON
  let jsonMessage = JSON.parse(message);

  //Get canvas from HTML
  var c = <HTMLCanvasElement>document.getElementById("mainCanvas");

  //Get sizes from JSON
  c.width = jsonMessage.info.areaW;
  c.height = jsonMessage.info.areaH;
  let pWidth = jsonMessage.info.playerW;
  let pHeight = jsonMessage.info.playerH;

  //Draw if canvas exists
  var ctx = c.getContext("2d");
  if (ctx) {
    //Disable antialiasing on images
    ctx.imageSmoothingEnabled = false;

    //Clear canvas
    ctx.clearRect(0, 0, c.width, c.height);

    //Set font defaults
    ctx.font = "14px Arial";
    ctx.textAlign = "center";

    ctx.fillText(jsonMessage.info.time, c.width/2, 10)

    //Loop through list of players and draw everyone
    for (let i = 0; i < jsonMessage.players.length; i++) {
      let player = jsonMessage.players[i];
      if (player.stamina < 0) player.stamina = 0;
      let name = player.name;

      if (name == username) {
        //Draw stamina bar
        drawRect(ctx, 10, 10, 150, 25, false, "black");
        drawRect(ctx, 10, 10, 150 * (player.stamina / 100), 25, true, "green");
      }

      //Limit name to 15 characters
      if (name.length > 15) name = name.substr(0, 15);
      //Draw name
      ctx.fillText(name, player.x + pWidth / 2, player.y - 20);
      //Draw health bar
      drawRect(ctx, player.x, player.y - 6, pWidth, 4, false, "black");
      drawRect(
        ctx,
        player.x,
        player.y - 6,
        pWidth * (player.health / 100),
        4,
        true,
        "red"
      );

      //Draw player as image
      const image = new Image();
      image.src = "res/guy.png";
      ctx.drawImage(image, player.x, player.y, pWidth, pHeight);
    }
  }
}

//Draw rectangle
function drawRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  filled: boolean,
  color: string
) {
  let defaultColor = "black";

  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  if (filled) ctx.fill();
  else ctx.stroke();

  ctx.strokeStyle = defaultColor;
  ctx.fillStyle = defaultColor;
}
