const url = 'ws://127.0.0.1:8080'
const connection = new WebSocket(url)

connection.onopen = () => {
  connection.send("hej")
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

var i = 0

connection.onmessage = (e) => {
  console.log(e.data)

    connection.send(i)
    i = i+1
}