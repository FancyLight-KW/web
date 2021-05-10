'use strict'

//newTrainingPhrases

exports.updateIntent = async (req, res) => { try{
    const dialogflow = require('dialogflow');

    const intentsClient = new dialogflow.IntentsClient();
    const projectId = process.env.GOOGLE_PROJECT_ID;
    const projectAgentPath = intentsClient.projectAgentPath(projectId);

    const request = {
        parent: projectAgentPath,
        intentView: 'INTENT_VIEW_FULL',
    }

    let existingIntent = "";

    const [response] = await intentsClient.listIntents(request);

    response.forEach(intent => {    //req.body.displayName : 부모 intent 이름
        if (intent.displayName.toString() === req.body.parentName.toString()) {
            existingIntent = intent;
        }
    })
    
    //==========================================
    //==========outputContext updatee=========
    //==========================================

    console.log('here');
    //if (!existingIntent.outputContexts) {
    //let outputName = String(existingIntent.name) + "-followup";
    let outputName = 'projects/itsp-chatbot-app/agent/sessions/-/contexts/WeatherIntent-followup'
    //console.log(outputName);
    /*
    existingIntent.outputContexts = [
        {
            name: outputName,
        }
    ];
    */
    //}
    console.log(existingIntent.followupIntentInfo);
    /*
    existingIntent.followupIntentInfo = [
        {
            followupIntentInfo: 'projects/itsp-chatbot-app/agent/intents/a2f2e642-87ec-436d-9348-b92c2b6d1d9d',
            parentFollowupIntentName: 'projects/itsp-chatbot-app/agent/intents/acc5f248-8fe3-443b-b5a7-4360dca9d117',
        }
    ]
    */

    //==========================================
    //===============intent update==============
    //==========================================
    const updateIntentRequest = {
        parent: projectAgentPath,
        intent: existingIntent,
        languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE,
    }

    //Send the request for update the intent.

    const result = await intentsClient.updateIntent({
        existingIntent,
        updateMask:{
            path: ['projects/itsp-chatbot-app/agent/intents/acc5f248-8fe3-443b-b5a7-4360dca9d117']
        }
    });
    console.log(result);
} catch (error) {
    console.log(error);
}
}