const express = require("express");
const router = express.Router();
const user = require("../controllers/user_controller.js");

// Create a new User
router.post("/", user.create);

// Retrieve all users
router.get("/", user.findAll);

// Retrieve a single User with userId
router.get("/:userId", user.findOne);

// Update a User with userId
//router.put("/:userId", user.update);

// Delete a User with userId
router.delete("/:userId", user.delete);

// Create a new User
router.delete("/", user.deleteAll);

module.exports = router;
