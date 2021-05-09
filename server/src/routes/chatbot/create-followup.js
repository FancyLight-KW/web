'use strict'

const dialogflow = require('dialogflow');
const update = require('./update-parent');
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
    parentName: '',
  }
*/
const updateParent = async (props) => {
  
} 
exports.createIntent = async (req, res) => {
  // Construct request

  // The path to identify the agent that owns the created intent.
  const agentPath = intentsClient.projectAgentPath(process.env.GOOGLE_PROJECT_ID);

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

  //console.log(trainingPhrases)
  //console.log(message);

  /*
  //update parent intent output===========================================
  let parentOutputName = '';
  let parentIntent;
  try{
    const request = {
      parent: agentPath,
      intentView: 'INTENT_VIEW_FULL',
    }
    
    const [response] = await intentsClient.listIntents(request);
    response.forEach(intent => {    //req.body.displayName : 부모 intent 이름
      if (intent.displayName.toString() === req.body.parentName.toString()) {
        parentIntent = intent;
      }
    })

      let parentOutputName = String(parentIntent.name) + "-followup";
      console.log(parentOutputName);
      parentIntent.outputContexts = [
          {
              name: parentOutputName,
          }
      ];
      const updateIntentRequest = {
        parent: projectAgentPath,
        intent: parentIntent,
        languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE
    }
    const result = await intentsClient.updateIntent(updateIntentRequest);
  }catch(error){
    console.log(error);
  }
  */
  //create child intent input==========================================
  //let inputName = String(req.body.name) + "-followup";
  //console.log(inputName);
  //existingIntent.inputContextNames = [
  //  parentOutputName,
  //];

  //create new intent
  const newdisplayNameString = String(req.body.displayName) + ' - custom'
  const childInputContext = 'projects/itsp-chatbot-app/agent/sessions/-/contexts/WeatherIntent-followup';
  //const newdisplayName = req.body.displayName + ' - custom';
  const intent = {
    displayName: newdisplayNameString,
    trainingPhrases: trainingPhrases,
    messages: [message],
    inputContextNames: [childInputContext],
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
    message: "Followup Intent 생성 성공",
  });
  console.log(`Intent ${response.name} created`);
}

//createIntent();