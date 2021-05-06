const express = require("express");
const router = express.Router();
const intent = require("./phrases.controller");

/*          Intents            */
//      /scenario/phrases
router.post("/", intent.create); // CREATE
router.get("/", intent.find); // READ   ?id={구문번호}&rid={인텐트번호}&phrase={구문}
router.put("/:id", intent.update); // UPDATE
router.delete("/:id", intent.delete); // DELETE

module.exports = router;
