const express = require("express");
const morgan = require("morgan");
const store = require("./routes/store.js");
const cors = require("cors");
const { NotFoundError } = require("./utils/errors");

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

//handles all 404 errors that weren't matched by a route
app.use((req, res, next) => {
    return next(new NotFoundError());
});

//Generic error handler - anything that is unhadled will be handled here
app.use((error, req, res, next) => {
    const status = error.status || 400;
    const message = error.message;
    return res.status(status).json({
        error: { message: message, status },
    });
});


module.exports = app;
