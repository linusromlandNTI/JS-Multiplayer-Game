import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

export class Http {
  app = express();
  port = 8080; // default port to listen
  msg: string = "hej";

  constructor() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    this.app.get("/", (req, res) => {
      res.send("hej");
    });

    this.app.listen(this.port, () => {
      console.log(`HTTP Server started on port ${this.port}`);
    });
  }
}
