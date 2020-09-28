import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

export class Http {
  app = express();
  //msg: string = "hej";

  constructor(port: number) {
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

    this.app.listen(port, () => {
      console.log(`HTTP Server started on port ${port}`);
    });
  }
}
