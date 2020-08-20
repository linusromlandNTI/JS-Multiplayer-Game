const serverURL = "node.cloudremover.com"

function coolio() {
    document.getElementById('cool').innerHTML = 'not cool'

    var time1 = Date.now()

    //Test GET request
    var request = new XMLHttpRequest()
    request.open('GET', serverURL, true)
    request.onload = function() {
        console.log("response time (ping): " + (Date.now() - time1))
        document.getElementById('cool').innerHTML = request.responseText
    }
    request.send()

    //Test POST request
    var request2 = new XMLHttpRequest()
    request2.open('POST', serverURL, true)
    request2.setRequestHeader("Content-type", "application/json");

    var data = { "McLissLiss": "Cool" };
    request2.send(JSON.stringify(data))
}