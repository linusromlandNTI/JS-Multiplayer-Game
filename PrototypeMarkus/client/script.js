const url = "wss://cloudremover.com:8069";
const connection = new WebSocket(url);

connection.onopen = () => {
    connection.send("hej");
};

connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`);
};

var i = 0;

document.addEventListener('keydown', function(event) {
    document.getElementById("moveable").innerHTML = event.key;

    connection.send(event.key);
});

connection.onmessage = (e) => {
    console.log(e.data)

    let widthOfElement = parseFloat(e.data)

    document.getElementById("moveable").style.width = widthOfElement + "px"
};