const express = require("express");
const morgan = require("morgan");
const store = require("./routes/store.js");
const cors = require("cors");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.use("/store", store);

app.get("/", (req, res, next) => {
    res.status(200).json({ ping: "pong" });
});

module.exports = app;
