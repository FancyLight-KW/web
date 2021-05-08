'use strict'

const dialogflow = require('@google-cloud/dialogflow');

// Instantiates the Intent Client
const intentsClient = new dialogflow.IntentsClient();


/*
const newIntent = {
    displayName: 'WeatherIntent',
    trainingPhrasesParts: [
      'Hello, What is weather today?',
      'How is the weather today?',
    ],
    messageTexts: ['Rainy', 'Sunny'],
    inputContextNames: 'asdf',
    outputContexts: 'adsf',
  }
*/
exports.createIntent = async (req, res) => {
  // Construct request

  // The path to identify the agent that owns the created intent.
  const agentPath = intentsClient.agentPath(process.env.GOOGLE_PROJECT_ID);

  const trainingPhrases = [];

  let trainingPhrasesParts = req.body.trainingPhrasesParts;

  trainingPhrasesParts.forEach(trainingPhrasesPart => {
    const part = {
      text: trainingPhrasesPart,
    };

    // Here we create a new training phrase for each provided part.
    const trainingPhrase = {
      type: 'EXAMPLE',
      parts: [part],
    };

    trainingPhrases.push(trainingPhrase);
  });

  const messageText = {
    text: req.body.messageTexts,
  };

  const message = {
    text: messageText,
  };

  const intent = {
    displayName: req.body.displayName,
    trainingPhrases: trainingPhrases,
    messages: [message],
  };

  const createIntentRequest = {
    parent: agentPath,
    intent: intent,
  };

  // Create the intent
  // try{
    const [response] = await intentsClient.createIntent(createIntentRequest);
  // }catch(error){

  // }
  res.send( {
    resultCode: 0,
    message: "dialogflow에 생성 성공",
  });
  console.log(`Intent ${response.name} created`);
}

//createIntent();