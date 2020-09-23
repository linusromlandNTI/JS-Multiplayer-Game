import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import { stringify } from "querystring";
const app = express();
const port = 8080; // default port to listen

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send("cool cool f u");
} );

app.post('/', function (req, res) {
    console.log("\nNew POST request! \n\n" + req.body.number)
    res.end()
})

// start the Express server
app.listen( port, () => {
    console.log(`server started at http://localhost:${ port }`);
} );