"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const time = require("moment");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const route = require("./routes");
route(app);

require("dotenv").config();
const port = process.env.API_PORT;

app.listen(port, () =>
  console.log(
    'Server started at PORT "' +
      port +
      '" [' +
      time().format("DD/MM/YYYY HH:mm:ss") +
      " UTC+7]"
  )
);
