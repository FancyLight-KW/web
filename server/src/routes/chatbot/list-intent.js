// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';


//messages OK
//input OK
//output OK
//phrases OK
//displayname

/**
 * List of all intents in the specified project.
 * @param {string} projectId The project to be used
 */

  // [START dialogflow_list_intents]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = 'The Project ID to use, e.g. 'YOUR_GCP_ID';

  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const intentsClient = new dialogflow.IntentsClient();

exports.listIntents = async (req, res) => {
  try {
    // Construct request

    const intentsClient = new dialogflow.IntentsClient();
    const projectId = process.env.GOOGLE_PROJECT_ID;
    const projectAgentPath = intentsClient.projectAgentPath(projectId);

    const request = {
      parent: projectAgentPath,
      intentView: 'INTENT_VIEW_FULL',
    }

    let existingIntent = "";

    const [response] = await intentsClient.listIntents(request);

    let trainingPhrases = {};
    let messageTexts = {};
    let inputContexts = {};
    let outputContext = {};
    response.forEach((intent)=> {
      //console.log(intent);
      //phrase listing==================================
      intent.trainingPhrases.forEach((phrase) => {
        let trainingPhrasesPart = [];
        phrase.parts.forEach((element) => {
          trainingPhrasesPart.push(element.text);
        })
        if(!trainingPhrases[intent.displayName]){
          trainingPhrases[intent.displayName] = [trainingPhrasesPart];
        }else{
          trainingPhrases[intent.displayName].push(trainingPhrasesPart);
        }
      })

      //message listing==================================
      intent.messages.forEach((message) => {
        if(!messageTexts[intent.displayName]){
          messageTexts[intent.displayName] = [message.text.text];
        }else{
          messageTexts[intent.displayName].push([message.text.text]);
        }
        //messageTexts.push([intent.displayName, message.text.text]);
        //console.log(message.text.text);
          //messageTexts.push([intent.displayName, element.text]);
      })
      
      //inputcontext listing==================================
      intent.inputContextNames.forEach((contexts) => {
        if(!inputContexts[intent.displayName]){
          inputContexts[intent.displayName] = [contexts];
        }else{
          inputContexts[intent.displayName].push([contexts]);
        }
        //inputContexts[intent.displayName].push([contexts]);
        //console.log(contexts);
      })

      //outputcontext listing==================================
      intent.outputContexts.forEach((contexts) => {
        if(!outputContext[intent.displayName]){
          outputContext[intent.displayName] = [contexts.name];
        }else{
          outputContext[intent.displayName].push([contexts.name]);
        }
        //outputContext[intent.displayName].push([contexts.name]);
        //console.log(contexts);
      })
    })
    
    
    console.log("trainingPhrases here");
    console.log(trainingPhrases);
    console.log("messageText here");
    console.log(messageTexts);
    console.log("inputContexts here");
    console.log(inputContexts);
    console.log("outputContexts here");
    console.log(outputContext);
    
    res.send({
      trainingPhrases: trainingPhrases,
      messageTexts: messageTexts,
      inputContexts: inputContexts,
      outputContext: outputContext,
    })
    //console.log(`trainingphrases: ${trainingPhrases}`);

    /*
    // The path to identify the agent that owns the intents.
    const projectAgentPath = intentsClient.agentPath(process.env.GOOGLE_PROJECT_ID);
  
    console.log(projectAgentPath);
  
    const request = {
      parent: projectAgentPath,
    };
  
    // Send the request for listing intents.
    const [response] = await intentsClient.listIntents(request);
    console.log("=================");
    console.log(response);
    //var response_str = JSON.stringify(response);
    //console.log(response_str);
    response.forEach(intent => {
      console.log('====================');
      console.log(`Intent name: ${intent.name}`);
      console.log(`Intent id: ${intent.id}`);
      console.log(`Intent display name: ${intent.displayName}`);
      
      console.log("parameters");
      console.log(JSON.stringify(intent.parameters));
      console.log("messgaes");
      console.log(JSON.stringify(intent.messages));
      // intent.outputContexts.forEach(context => {
      //   console.log(JSON.stringify(context));
      // }); 
      // intent.messages.forEach(message => {
      //   console.log(JSON.stringify(message));
      // }); 
      // console.log('Parameters:------');
      // intent.parameters.forEach(parameter => {
      //   console.log(JSON.stringify(parameter));
      // }); 
      // console.log(`Intent parameters: ${intent.parameters}`);

      //console.log(`Action: ${intent.action}`);
      //console.log(`Root folowup intent: ${intent.rootFollowupIntentName}`);
      //console.log(`Parent followup intent: ${intent.parentFollowupIntentName}`);
  
       console.log('Input contexts:');
       intent.inputContextNames.forEach(inputContextName => {
         console.log(`\tName: ${inputContextName}`);
       });
  
       console.log('Output contexts:');
       intent.outputContexts.forEach(outputContext => {
         console.log(`\tName: ${outputContext.name}`);
       });
    });
  }catch(error){
    console.log(error);
  }
  */
}catch(error){
  console.log(error);
}
}