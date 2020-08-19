function coolio() {
    document.getElementById('cool').innerHTML = 'not cool'

    var time1 = Date.now()


    var request = new XMLHttpRequest()
    request.open('GET', 'https://node.romland.space', true)

    request.onload = function () {
        console.log("response time (ping): " + Date.now() - time1)
        var cool = request.responseText
        document.getElementById('cool').innerHTML = cool
    }
    request.send()
}