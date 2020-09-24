import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import { stringify } from "querystring";

const app = express();
const port = 6969; // default port to listen

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.send("cool cool f u");
});

app.post('/', function (req, res) {
    console.log(req.body)
    res.end()
})

export class StartHTTP {
    public name(): void {
        app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    }
}