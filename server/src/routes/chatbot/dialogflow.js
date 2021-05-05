'use strict'

const express = require('express');
const router = express.Router();
const structjson = require('./structjson.js');

const dialogflowQueryIntent = require('./query-intent');
const dialogflowCreateIntent = require('./create-intent');
const dialogflowListIntent = require('./list-intent');
const dialogflowDeleteIntent = require('./delete-intent');
const dialogflowUpdateIntent = require('./update-intent');
//Text Query Route
router.post('/textQuery', dialogflowQueryIntent.textQuery);
//Event Query Route
router.post('/eventQuery', dialogflowQueryIntent.eventQuery);

//Intent List Route
router.get('/listIntent',dialogflowListIntent.listIntents);

//Create Intent route
router.post('/createIntent',dialogflowCreateIntent.createIntent);

//Update Intent route
router.post('/updateIntent', dialogflowUpdateIntent.updateIntent);

//Delete Intent Route
router.post('/deleteIntent',dialogflowDeleteIntent.deleteIntent);
module.exports = router;
