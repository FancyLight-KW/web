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

    response.forEach(intent => {
        if (intent.displayName.toString() === req.body.displayName.toString()) {
            existingIntent = intent;
            //console.log(intent.trainingPhrases);
            //console.log(intent.messages);
        }
    })

    //==========================================
    //==========training phrases update=========
    //==========================================
    let updatedTrainingPhrases = req.body.updatedTrainingPhrasesParts;

    const trainingPhrases = [];
    let previousTrainingPhrases =
    existingIntent.trainingPhrases.length > 0
            ? existingIntent.trainingPhrases
            : [];

    //previousTrainingPhrases.forEach(textdata => {
    //    newTrainingPhrases.push(textdata.parts[0].text)
    //});

    updatedTrainingPhrases.forEach(phrase => {
        const part = {
            text: phrase
        };

        //Here we create a new training phrase for each provided part.
        const trainingPhrase = {
            type: 'EXAMPLE',
            parts: [part]
        }
        trainingPhrases.push(trainingPhrase);
    });

    existingIntent.trainingPhrases = trainingPhrases;
    //==========================================
    //===============message update=============
    //==========================================
    let updatedMessageTexts = req.body.updatedMessageTexts;
    let array = [];
    let previousMessages =
    existingIntent.messages.length > 0
            ? existingIntent.messages
            : [];

    //previousMessages.forEach(textdata => {
    //    newMessageTexts.push(textdata.parts[0].text)
    //});
    
    updatedMessageTexts.forEach(messagepart => {
        array.push(messagepart);
        //Here we create a new training phrase for each provided part.

        //messages.push(message);
    });
    const text = {
        text: array
    };
    const messages = [{
        platform: 'PLATFORM_UNSPECIFIED',
        text: text,
        message: 'text',
    }];
    console.log(messages);
    existingIntent.messages = messages;

    //==========================================
    //===============intent update==============
    //==========================================
    const updateIntentRequest = {
        parent: projectAgentPath,
        intent: existingIntent,
        outputContexts: [output],
        languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE
    }

    //Send the request for update the intent.

    const result = await intentsClient.updateIntent(updateIntentRequest);
    console.log(result);

    res.send({
        resultCode: 0,
        message: 'Update 성공',
    })
} catch (error) {
    console.log(error);
}
}