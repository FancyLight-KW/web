'use strict'

const dialogflow = require('dialogflow');
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
exports.createIntent = async (req, res) => { try{
  // Construct request

  // The path to identify the agent that owns the created intent.
  const projectId = process.env.GOOGLE_PROJECT_ID;
  const projectAgentPath = intentsClient.projectAgentPath(projectId);

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

  //==========================================
  //==========create followup intent=========
  //==========================================
  var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi
  var regSpace = / /gi;
  let nameWithoutSCin;
  let nameWithoutSCout;
  let intent;
  //==========================================
  //==========make context name=========
  //==========================================

  if(req.body.displayName.includes(' - custom')){ //자식 인텐트에 팔로업 생성시
    let tempExpectedForNum = req.body.displayName.toString().substr(req.body.displayName.length-1, 1);
    let displayNameWithoutNum;
    if(!isNaN(tempExpectedForNum)){  //끝에 숫자가 있다면
      displayNameWithoutNum = req.body.displayName.slice(0, req.body.displayName.length-2)
    }else{
      displayNameWithoutNum = req.body.displayName;
    }
  

  let parentNameForContext = displayNameWithoutNum.slice(0, -9); //부모 이름으로 파싱

  if(reg.test(displayNameWithoutNum)){
    nameWithoutSCin = parentNameForContext.replace(reg, ""); // 찾은 특수 문자를 제거
    nameWithoutSCout = displayNameWithoutNum.replace(reg, ""); // 찾은 특수 문자를 제거
  }else{
    nameWithoutSCin = parentNameForContext;
    nameWithoutSCout = displayNameWithoutNum;
  }
  //공백 제거
  let nameWithoutSCESin;
  let nameWithoutSCESout;
  // test() ㅡ 찾는 문자열이 들어있는지 확인
  if(regSpace.test(nameWithoutSCout)){
    nameWithoutSCESout = nameWithoutSCout.replace(/ /g, "");  //찾은 공백을 제거
    nameWithoutSCESin = nameWithoutSCin.replace(/ /g, "");
  }else{
    nameWithoutSCESout = nameWithoutSCout;
    nameWithoutSCESin = nameWithoutSCin;
  }

  //making contexts
  let headContext = 'projects/itsp-chatbot-app/agent/sessions/-/contexts/';
  const inputContext = headContext + nameWithoutSCESin + '-followup'
  const outputContext = headContext + nameWithoutSCESout + '-followup'
  //const inputContext ='projects/itsp-chatbot-app/agent/sessions/-/contexts/computersystemproblem-custom-followup';
  //const outputContext = 'projects/itsp-chatbot-app/agent/sessions/-/contexts/computersystemproblem-custom-custom-followup';
  //const newdisplayNameString = String(req.body.displayName) + ' - custom'
  //const newdisplayName = req.body.displayName + ' - custom';
  
    const request = {
      parent: projectAgentPath,
      intentView: 'INTENT_VIEW_FULL',
    }

    const [response] = await intentsClient.listIntents(request);
    //==========================================
    //===========search parent intent==========
    //==========================================
    let parentIntentDisplayName = displayNameWithoutNum.slice(0, -9);
    let parentIntent = "";
    response.forEach(intents => {
      if (intents.displayName.toString() === parentIntentDisplayName.toString()) {
        parentIntent = intents;
      }
    })
    //==========================================
    //==========search root intent=========
    //==========================================
    let rootIntentFollowup = 'projects/itsp-chatbot-app/agent/intents/6096902f-3fa6-4846-87f7-9e440cb1e7c9';
    //get rid of  - custom
    //replace(/ - custom/gi, "")
    let rootIntentdisplayName = displayNameWithoutNum.split(' ');
    let rootIntent;
    response.forEach(intents => {
      //console.log(intent.displayName);
      if (intents.displayName.toString() === rootIntentdisplayName[0].toString()) {
        rootIntent = intents;
      }
    })

    let parentIntentFollowup = 'projects/itsp-chatbot-app/agent/intents/a5dd602f-eacf-43b8-b222-49cfd678a278';
    //console.log(parentIntentFollowup);

    //console.log(parentIntent.name);

    intent = {
      displayName: req.body.displayName,
      trainingPhrases: trainingPhrases,
      messages: [message],
      rootFollowupIntentName: rootIntent.name,
      parentFollowupIntentName: parentIntent.name,
      inputContextNames: [inputContext],
      outputContexts: [{
        name: outputContext,
        lifespanCount: 5,
        parameters: null
      }],
    };
  } else {  //루트 인텐트에 팔로업 생성시
    if(reg.test(req.body.displayName)){
      nameWithoutSCout = req.body.displayName.replace(reg, ""); // 찾은 특수 문자를 제거
    }else{
      nameWithoutSCout = req.body.displayName;
    }
    //공백 제거
    let nameWithoutSCESout;
    if(regSpace.test(nameWithoutSCout)){
      nameWithoutSCESout = nameWithoutSCout.replace(/ /g, "");  //찾은 공백을 제거
    }else{
      nameWithoutSCESout = nameWithoutSCout;
    }
    let header = 'projects/itsp-chatbot-app/agent/sessions/-/contexts/';
    const outputContext = header + nameWithoutSCESout + '-followup'

    intent = {
      displayName: req.body.displayName,
      trainingPhrases: trainingPhrases,
      messages: [message],
      outputContexts: [{
        name: outputContext,
        lifespanCount: 5,
        parameters: null
      }],
    };
  }

  const createIntentRequest = {
    parent: projectAgentPath,
    intent: intent,
    //inputContextNames: [inputContext],
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
}catch(error){
  console.log(`error: ${error}`)
  res.send( {
    resultCode: 1,
    message: "Followup Intent 생성 실패",
  });
}
}