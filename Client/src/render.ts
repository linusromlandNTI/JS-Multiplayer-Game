//Changeable default values
let renderScale = 1;

//Unchangable variables
let playerX = 0;
let playerY = 0;
let windowWidth = 0;
let windowHeight = 0;
let areaW = 0;
let areaH = 0;
let xMult = 0;
let yMult = 0;

function onWindowResize() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}

//Render canvas from JSON from server
function render(message: string) {
  //Parse message into JSON
  let jsonMessage = JSON.parse(message);

  //Get canvas from HTML
  var c = <HTMLCanvasElement>document.getElementById("mainCanvas");

  //Get sizes from JSON
  c.width = renderScale * windowWidth;
  c.height = renderScale * windowHeight;
  let pWidth = jsonMessage.info.playerW;
  let pHeight = jsonMessage.info.playerH;

  xMult = (renderScale * window.innerWidth) / jsonMessage.info.areaW;
  yMult = (renderScale * window.innerHeight) / jsonMessage.info.areaH;

  //Draw if canvas exists
  var ctx = c.getContext("2d");
  if (ctx) {
    //Disable antialiasing on images
    ctx.imageSmoothingEnabled = false;

    //Clear canvas
    ctx.clearRect(0, 0, c.width, c.height);

    //Draw game or lobby depending on game state
    if (jsonMessage.info.inGame) {
      ctx.font = 30 * xMult + "px Arial";
      ctx.textAlign = "center";

      //Draw timer
      ctx.fillText(
        (jsonMessage.info.time / 1000).toFixed().toString(),
        c.width / 2,
        30 * yMult
      );

      //Loop through list of players and draw everyone
      for (let i = 0; i < jsonMessage.players.length; i++) {
        let player = jsonMessage.players[i];

        if (!player.dead) {
          //Draw alive player
          let name = player.name;

          //Do special stuff if player is this client
          if (name == username && !spectator) {
            playerX = player.x;
            playerY = player.y;

            //Clamp stamina to min 0
            let stamina = player.stamina;
            if (stamina < 0) stamina = 0;

            //Draw stamina bar
            drawRect(
              ctx,
              10 * xMult,
              10 * yMult,
              150 * xMult,
              25 * yMult,
              false,
              "black"
            );
            drawRect(
              ctx,
              10 * xMult,
              10 * yMult,
              150 * (stamina / 100) * xMult,
              25 * yMult,
              true,
              "green"
            );
          }
          //Draw player
          drawPlayer(
            ctx,
            player,
            player.x * xMult,
            player.y * yMult,
            pWidth * xMult,
            pHeight * yMult,
            "res/guy.png",
            true,
            true
          );
        } else {
          //Draw dead player
          drawPlayer(
            ctx,
            player,
            player.x * xMult,
            player.y * yMult,
            pHeight * xMult,
            pWidth * yMult,
            "res/deadGuy.png",
            false,
            false
          );
        }
      }

      //Draw all bullets
      for (let i = 0; i < jsonMessage.bullets.length; i++) {
        let bullet = jsonMessage.bullets[i];

        const image = new Image();
        image.src = "res/bullet.gif";

        //Rotate canvas and stuff to draw bullet rotated, very strange, but works
        ctx.save();
        ctx.translate(bullet.x * xMult, bullet.y * yMult);
        ctx.translate(
          (jsonMessage.info.bulletW * xMult) / 2,
          (jsonMessage.info.bulletH * yMult) / 2
        );
        ctx.rotate(bullet.angle);
        ctx.translate(
          (-jsonMessage.info.bulletW * xMult) / 2,
          (-jsonMessage.info.bulletH * yMult) / 2
        );
        ctx.drawImage(
          image,
          0,
          0,
          jsonMessage.info.bulletW * xMult,
          jsonMessage.info.bulletH * yMult
        );
        ctx.restore();
      }
    } else {
      //In lobby
      ctx.font = "30px Arial";
      ctx.textAlign = "left";

      //Draw timer
      ctx.fillText("Winner: " + jsonMessage.info.winner, 30, 60);
      //Loop through list of players and draw everyone
      for (let i = 0; i < jsonMessage.players.length; i++) {
        let player = jsonMessage.players[i];
        drawPlayer(
          ctx,
          player,
          i * (pWidth + 50) + 50,
          200,
          pWidth,
          pHeight,
          "res/guy.png",
          true,
          false
        );
      }
    }
  }
}

//Draw player
function drawPlayer(
  ctx: CanvasRenderingContext2D,
  player: any,
  x: number,
  y: number,
  width: number,
  height: number,
  src: string,
  drawName: boolean,
  drawHealth: boolean
) {
  //Draw name
  if (drawName) {
    //Limit name to 15 characters
    let name = player.name;
    if (name.length > 15) name = name.substr(0, 15);

    //Draw name text
    ctx.font = 16 * xMult + "px Arial";
    ctx.textAlign = "center";
    ctx.fillText(name, x + width / 2, y - 10 * yMult);
  }

  //Draw health bar
  if (drawHealth) {
    drawRect(ctx, x, y - 6 * yMult, width, 4 * yMult, false, "black");
    drawRect(
      ctx,
      x,
      y - 6 * yMult,
      width * (player.health / 100),
      4 * yMult,
      true,
      "red"
    );
  }

  //Draw player as image
  const image = new Image();
  image.src = src;
  ctx.drawImage(image, x, y, width, height);
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
