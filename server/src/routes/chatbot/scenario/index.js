const express = require("express");
const router = express.Router();

const intent = require("./intents/intents");
const phrase = require("./phrases/phrases");
const response = require("./responses/responses");

router.use("/intents", intent);
router.use("/phrases", phrase);
router.use("/responses", response);

module.exports = router;
