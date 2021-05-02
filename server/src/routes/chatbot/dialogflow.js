const express = require('express');
const router = express.Router();
const structjson = require('./structjson.js');

const dialogflowQuery = require('./query');
const dialogflowCreateIntent = require('./create-intent');
const dialogflowListIntent = require('./list-intent');
const dialogflowDeleteIntent = require('./delete-intent');

//Text Query Route
router.post('/textQuery', dialogflowQuery.textQuery);
//Event Query Route
router.post('/eventQuery', dialogflowQuery.eventQuery);

//Intent List Route
router.get('/listIntent',dialogflowListIntent.listIntents);

//Delete Intent Route
router.get('/deleteIntent',dialogflowDeleteIntent.deleteIntent);
module.exports = router;
