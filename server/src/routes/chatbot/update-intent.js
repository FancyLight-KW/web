'use strict'

//newTrainingPhrases

exports.updateIntent = async () => {
    const dialogflow = require('dialogflow');

    const intentsClient = new dialogflow.IntentsClient();
    const projectId = process.env.GOOGLE_PROJECT_ID;
    const projectAgentPath = intentsClient.projectAgentPath(projectId);

    const request = {
        parent: projectAgentPath,
        intentView: 'INTENT_VIEW_FULL',
    }


    const [response] = await intentsClient.listIntents(request);
    // console.log("=============================================");
    // var response_str = JSON.stringify(response);
    // response.array.forEach(element => {
        
    // });
    // console.log(response_str);

    

    /*
    const intent = existingIntent; //get the intent that needs to be updated from the [response];
    // const intent = {
    //     displayName: req.body.displayName,
    //     trainingPhrases: trainingPhrases,
    //     messages: [message],
    //   };

    const trainingPhrases = [];
    let previousTrainingPhrases =
        intent.trainingPhrases.length > 0
            ? intent.trainingPhrases
            : [];

    previousTrainingPhrases.forEach(textdata => {
        newTrainingPhrases.push(textdata.parts[0].text)
    });

    newTrainingPhrases.forEach(phrase => {
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

    intent.trainingPhrases = trainingPhrases;

    const updateIntentRequest = {
        intent: intent,
        intentView: 'INTENT_VIEW_FULL'
    }

    //Send the request for update the intent.
    const result = await intentsClient.updateIntent(updateIntentRequest);
    console.log(result);

    */
}