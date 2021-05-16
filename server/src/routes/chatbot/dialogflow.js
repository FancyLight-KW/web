'use strict'

const express = require('express');
const router = express.Router();
const structjson = require('./structjson.js');

const dialogflowQueryIntent = require('./query-intent');
const dialogflowCreateIntent = require('./create-intent');
const dialogflowListIntent = require('./list-intent');
const dialogflowDeleteIntent = require('./delete-intent');
const dialogflowUpdateIntent = require('./update-intent');
const dialogflowcreateFollowupIntent = require('./create-followup');
const dialogflowUpdateParentIntent = require('./update-parentIntent');
//const dialogflowFullfilment = require('./fulfillment');

//Text Query Route
router.post('/textQuery', dialogflowQueryIntent.textQuery);
//Event Query Route
router.post('/eventQuery', dialogflowQueryIntent.eventQuery);

//Intent List Route
router.get('/listIntent',dialogflowListIntent.listIntents);

//Create Intent route
router.post('/createIntent',dialogflowCreateIntent.createIntent);

//Create Followup Intent route
router.post('/createFollowupIntent',dialogflowcreateFollowupIntent.createIntent);

//Update Intent route
router.post('/updateIntent', dialogflowUpdateIntent.updateIntent);

//Update Followup Intent Route
router.post('/updateParentIntent', dialogflowUpdateParentIntent.updateIntent);

//Delete Intent Route
router.post('/deleteIntent',dialogflowDeleteIntent.deleteIntent);

//router.post('/fulfillment', dialogflowFullfilment.dialogflowFirebaseFulfillment)
module.exports = router;
