const express = require("express");
const router = express.Router();
const request = require("../controllers/Request/Requests.controller");

router.post("/newRequest/", request.create);
router.get("/getAllRequest/", request.findAll);
<<<<<<< HEAD
=======
router.get("/getRequest/:userId", request.findOne);
router.put("/updateRequest/:requestId", request.update);
router.delete("/deleteRequest/:requestId", request.delete);
>>>>>>> 9c873893f08cd58d63756fbf55d14569e8c9a663
module.exports = router;
