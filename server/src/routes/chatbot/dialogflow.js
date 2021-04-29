const express = require('express');
const router = express.Router();
const structjson = require('./structjson.js');

const dialogflowQuery = require('./query');
const dialogflowCreateIntent = require('./create-intent');

//Text Query Route
router.post('/textQuery', dialogflowQuery.textQuery);
//Event Query Route
router.post('/eventQuery', dialogflowQuery.eventQuery);

//Intent List Route
router.post('/listIntent', dialogflowCreateIntent.createIntent);
module.exports = router;
