const express = require("express");
const router = express.Router();
const responses = require("./responses.controller");

/*          Response            */
//      /scenario/responses
router.post("/", responses.create); // CREATE
router.get("/", responses.find); // READ   ?id={구문번호}&rid={인텐트번호}&response={대답}
router.put("/:id", responses.update); // UPDATE
router.delete("/:id", responses.delete); // DELETE

module.exports = router;
