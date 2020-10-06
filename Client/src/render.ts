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

    //Loop through list of players and draw everyone
    for (let i = 0; i < jsonMessage.players.length; i++) {
      let player = jsonMessage.players[i];

      let name = player.name;
      //Limit name to 15 characters
      if (name.length > 15) name = name.substr(0, 15);
      //Draw name
      ctx.fillText(name, player.x + pWidth / 2, player.y - pHeight / 2);

      //Draw player as image
      const image = new Image();
      image.src = "res/guy.png";
      ctx.drawImage(image, player.x, player.y, pWidth, pHeight);
    }
  }
}
