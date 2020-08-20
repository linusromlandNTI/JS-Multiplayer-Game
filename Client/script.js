function coolio() {
    document.getElementById('cool').innerHTML = 'not cool'

    var time1 = Date.now()

    //Test GET request
    var request = new XMLHttpRequest()
    request.open('GET', 'https://node.romland.space', true)
    request.onload = function () {
        console.log("response time (ping): " + (Date.now() - time1))
        var cool = request.responseText
        document.getElementById('cool').innerHTML = cool
    }
    request.send()

    //Test POST request
    var request2 = new XMLHttpRequest()
    request2.open('POST', 'https://node.romland.space', true)
    request2.setRequestHeader("Content-type", "application/json");

    var data = {"McLissLiss" : "Cool"};
    request2.send(JSON.stringify(data))
}