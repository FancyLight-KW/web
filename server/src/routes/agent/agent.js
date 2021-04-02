const express = require("express");
const router = express.Router();
const agent = require("./agent.controller");

// host/agent/
router.get("/:agentId", agent.findAllUSerDisposeRequest);
