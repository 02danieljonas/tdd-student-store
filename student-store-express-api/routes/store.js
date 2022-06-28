const express = require("express");
const Store = require("../models/store.js");
const router = express.Router();

router.get("/", (req, res, next) => {
    try {
        res.status(200).json(Store.products());
    } catch (err) {
        next(err);
    }
});

router.post("/", (req, res, next) => {
    try {
        res.status(201).json(Store.post(req.body));
    } catch (err) {
        next(err);
    }
});

router.get("/:productId", (req, res, next) => {
    try {
        res.status(200).json(Store.product(req.params.productId));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
