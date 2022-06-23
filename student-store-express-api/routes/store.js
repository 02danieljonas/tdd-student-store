const express = require("express");
const Store = require("../models/store.js");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json(Store.products());
});

router.post("/", (req, res, next) => {
    console.log(req.body)
    res.status(200).json("Store.products()");
});

router.get("/:productId", (req, res, next) => {
    res.status(200).json(Store.product(req.params.productId));
});

module.exports = router;