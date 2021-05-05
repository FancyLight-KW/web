/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const projectId = 'The Project ID to use, e.g. 'YOUR_GCP_ID';
// const displayName = 'The display name of the intent, e.g. 'MAKE_RESERVATION';
// const trainingPhrasesParts = 'Training phrases, e.g. 'How many people are staying?';
// const messageTexts = 'Message texts for the agent's response when the intent is detected, e.g. 'Your reservation has been confirmed';

// (
//   projectId = 'YOUR_PROJECT_ID',
//   displayName = 'YOUR_INTENT_DISPLAY_NAME',
//   trainingPhrasesParts = [
//     'Hello, What is weather today?',
//     'How is the weather today?',
//   ],
//   messageTexts = ['Rainy', 'Sunny']
// )
// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');

// Instantiates the Intent Client
const intentsClient = new dialogflow.IntentsClient();

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