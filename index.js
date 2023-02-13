import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {
  ContactGetApi,
  ContactPostApi,
  Register,
  HeadPostApi,
  HeadGetApi,
} from "./controllers/constactController.js";
const app = express();
app.use(bodyParser.json());

//................cors.............

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//......................get request.................

app.get("/getllAll", ContactGetApi);

//....................post request...................

app.post("/contact", ContactPostApi);

// .................Register...........

app.post("/register", Register);

// .................Head tag PostApi...........

app.post("/sethead", HeadPostApi);

// .................Head tag GetApi...........

app.get("/gethead", HeadGetApi);

//................port listen...............

app.listen(5000, () => {
  console.log("app listening on port 5000!");
});
