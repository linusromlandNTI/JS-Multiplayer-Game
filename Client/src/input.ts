let w = false;
let a = false;
let s = false;
let d = false;
let shift = false;

//Checking for key inputs
document.addEventListener("keydown", function (event) {
  switch (event.key.toLowerCase()) {
    case "w":
      w = true;
      break;
    case "a":
      a = true;
      break;
    case "s":
      s = true;
      break;
    case "d":
      d = true;
      break;
    case "d":
      d = true;
      break;
    case "shift":
      shift = true;
      break;
  }
});

document.addEventListener("keyup", function (event) {
  switch (event.key.toLowerCase()) {
    case "w":
      w = false;
      break;
    case "a":
      a = false;
      break;
    case "s":
      s = false;
      break;
    case "d":
      d = false;
      break;
    case "shift":
      shift = false;
      break;
  }
});

function changeProtocol() {
  let checkBox = <HTMLInputElement>document.getElementById("protocolCheck");
  if (checkBox) {
    ws = checkBox.checked;
  }

  console.log(ws);
}

function changeURL() {
  let urlInput = <HTMLInputElement>document.getElementById("url");
  if (urlInput) {
    url = urlInput.value;
  }
}
