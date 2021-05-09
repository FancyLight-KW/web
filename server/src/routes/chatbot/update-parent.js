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
        if (intent.displayName.toString() === req.body.displayName.toString()) {
            existingIntent = intent;
        }
    })

    //==========================================
    //==========inputContext updatee=========
    //==========================================

    if (!existingIntent.outputContexts) {
        let outputName = String(existingIntent.name) + "-followup";
        console.log(outputName);
        existingIntent.outputContexts = [
            {
                name: outputName,
            }
        ];
    }

    //==========================================
    //===============intent update==============
    //==========================================
    const updateIntentRequest = {
        parent: projectAgentPath,
        intent: existingIntent,
        languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE
    }

    //Send the request for update the intent.

    const result = await intentsClient.updateIntent(updateIntentRequest);
    console.log(result);
} catch (error) {
    console.log(error);
}
}