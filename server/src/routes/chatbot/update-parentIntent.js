'use strict'

//newTrainingPhrases

exports.updateIntent = async (req, res) => { try{
    const dialogflow = require('dialogflow');
    let client_email = process.env.GOOGLE_CLIENT_EMAIL;
    let private_key = process.env.GOOGLE_PRIVATE_KEY;
    const intentsClient = new dialogflow.IntentsClient();
    const projectId = process.env.GOOGLE_PROJECT_ID;
    const projectAgentPath = intentsClient.projectAgentPath(projectId);

    const request = {
        parent: projectAgentPath,
        intentView: 'INTENT_VIEW_FULL',
    }

    let existingIntent;

    const [response] = await intentsClient.listIntents(request);

    //console.log(response);
    response.forEach(intent => {    //req.body.displayName : 부모 intent 이름
        if (intent.displayName.toString() === req.body.parentIntentName.toString()) {
            existingIntent = intent;
            existingIntent.name = intent.name;
            //console.log(`existingIntent.name: ${existingIntent.name}`);
            //console.log(existingIntent.followupIntentInfo);
        }
        //console.log(`intent name ${intent.displayName}: ${intent.name}`);

    })
    
    //==========================================
    //==========outputContext updatee=========
    //==========================================
    
    console.log('here');
    //if (!existingIntent.outputContexts) {
        //let outputName = String(existingIntent.name) + "-followup";
    let outputName = 'projects/itsp-chatbot-app/agent/sessions/-/contexts/computersystemproblem-followup'
    console.log(outputName);
    existingIntent.outputContexts = [
        {
            name: outputName,
        }
    ];
    //}
    //==========================================
    //===============intent update==============
    //==========================================
    const updateIntentRequest = {
        parent: projectAgentPath,
        intent: existingIntent,
        //languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE
    }

    //Send the request for update the intent.

    const result = await intentsClient.updateIntent({
        updateIntentRequest,
        updateMask: {
            paths: ['rootFollowupIntentName'],
          },
        });
    console.log(result);
} catch (error) {
    console.log(error);
}
}