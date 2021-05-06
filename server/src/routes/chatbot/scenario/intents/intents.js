const express = require("express");
const router = express.Router();
const intent = require("./intents.controller");
const join = require("./intents.join.controller");

/*          Intents            */
//      /scenario/intents
router.post("/", intent.create); // CREATE
router.get("/", intent.find); // READ   ?id={인텐트번호}&title={인텐트제목}
router.put("/:id", intent.update); // UPDATE
router.delete("/:id", intent.delete); // DELETE

// join table get
router.get("/phrases", join.withPhrases);
router.get("/responses", join.withResponses);
router.get("/phrases/responses", join.withPhrasesAndResponses);
router.get("/responses/phrases", join.withPhrasesAndResponses);
module.exports = router;
