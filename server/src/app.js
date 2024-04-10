const path = require("path");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const accessLogStream = fs.createWriteStream("access.log", { flags: "a" });

const api = require("./routes/api");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
