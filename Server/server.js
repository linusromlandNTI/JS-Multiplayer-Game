var http = require("http");
var fs = require("fs");
var qs = require("querystring");

//create a server object:
http
  .createServer(function (req, res) {
    res.write("Hello World!"); //write a response to the client

    getPost(req);

    res.end(); //end the response
  })
  .listen(6969); //the server object listens on port 8080

//cool mostly copy pasted thing
function getPost(req) {
  if (req.method == "POST") {
    var body = "";

    req.on("data", function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) req.connection.destroy();
    });

    req.on("end", function () {
      // use post['blah'], etc.
      var JsonIn = JSON.parse(body);
      console.log(JsonIn);
    });
  }
}
