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
const { search } = require('./dialogflow');

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
    response.sort((a, b) => {
      var nameA = a.displayName.toUpperCase(); // ignore upper and lowercase
      var nameB = b.displayName.toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      // 이름이 같을 경우
      return 0;
    });
    let trainingPhrases = {};
    let messageTexts = {};
    let inputContexts = {};
    let outputContext = {};
    let childDegree = {};
    let result = [];
    let childCardinality = {};
    let cardinalCount = 0;
    let cardinalityNum = [];
    // response.forEach((intent)=> {
    //   let cardinalCount = 0;
    //   if(intent.displayName.includes(' - custom')){
        
    //     let temp = intent.displayName.toString().substr(intent.displayName.length-1, 1);
    //     //console.log(temp);
    //     let displayNameWithoutNum;
    //     if (!isNaN(temp)) {  //끝에 숫자가 있다면
    //       //console.log(intent.displayName.slice(intent.displayName - 1, -1));
    //       displayNameWithoutNum = intent.displayName.slice(0, intent.displayName.length - 2)
          
    //     } else {
    //       displayNameWithoutNum = intent.displayName;
    //     }
    //     cardinalCount++;
    //     //search parent
    //     let parentIntentDisplayName = displayNameWithoutNum.slice(0, -9);
    //     //console.log(intent.displayName);
    //     //console.log(parentIntentDisplayName);

    //     if(!childCardinality[parentIntentDisplayName]){
    //       childCardinality[parentIntentDisplayName] = ['1'];
    //     }else{
    //       childCardinality[parentIntentDisplayName].push('1');
    //     }

    //   }
    // })

    response.forEach((intent)=> {
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
        //console.log(message.text.text);
        const instantMessageTextArray = message.text.text;
        let gatheredTexts = [];
        
        instantMessageTextArray.forEach((each) => {
          gatheredTexts.push([each]);
        })
        //console.log(gatheredTexts);
        if(!messageTexts[intent.displayName]){
          messageTexts[intent.displayName] = gatheredTexts;
        }else{
          messageTexts[intent.displayName].push(gatheredTexts);
        }
        //messageTexts.push([intent.displayName, message.text.text]);
        //console.log(message.text.text);
          //messageTexts.push([intent.displayName, element.text]);
      })


      //
      let cardinalCount = 0;
      if(intent.displayName.includes(' - custom')){
        
        let temp = intent.displayName.toString().substr(intent.displayName.length-1, 1);
        //console.log(temp);
        let displayNameWithoutNum;
        if (!isNaN(temp)) {  //끝에 숫자가 있다면
          //console.log(intent.displayName.slice(intent.displayName - 1, -1));
          displayNameWithoutNum = intent.displayName.slice(0, intent.displayName.length - 2)
          
        } else {
          displayNameWithoutNum = intent.displayName;
        }
        cardinalCount++;
        //search parent
        let parentIntentDisplayName = displayNameWithoutNum.slice(0, -9);
        //console.log(intent.displayName);
        //console.log(parentIntentDisplayName);

        if(!childCardinality[parentIntentDisplayName]){
          childCardinality[parentIntentDisplayName] = ['1'];
        }else{
          childCardinality[parentIntentDisplayName].push('1');
        }

      }
      //
      //inputcontext listing==================================
      /*
      intent.inputContextNames.forEach((contexts) => {
        let contextName = String(contexts);
        let inputArrayWithFollowup = contextName.split('/');
        //console.log(inputArrayWithFollowup);
        //let inputArrayWithFollowupString = String(inputArrayWithFollowup);
        //let inputContextNameArray = inputArrayWithFollowupString.split('-');
        let inputContextName = inputArrayWithFollowup[6];
        if(!inputContexts[intent.displayName]){
          inputContexts[intent.displayName] = [inputContextName];
        }else{
          inputContexts[intent.displayName].push(inputContextName);
        }
        //inputContexts[intent.displayName].push([contexts]);
        //console.log(contexts);
      })
      */
      //outputcontext listing==================================
      /*
      intent.outputContexts.forEach((contexts) => {
        let contextName = String(contexts.name);
        var outputArrayWithFollowup = contextName.split('/');
        //console.log(outputArrayWithFollowup);
        //let outputArrayWithFollowupString = String(outputArrayWithFollowup);
        //let outputContextNameArray = outputArrayWithFollowupString.split('-');
        let outputContextName = outputArrayWithFollowup[6];
        if(!outputContext[intent.displayName]){
          outputContext[intent.displayName] = [outputContextName];
        }else{
          outputContext[intent.displayName].push(outputContextName);
        }
        //outputContext[intent.displayName].push([contexts.name]);
        //console.log(contexts);
        
        //
      }
      */
      //console.log(`displayname: ${intent.displayName}
      //followupinfo: ${intent.followupIntentInfo}`);
      //console.log(intent.displayName);
      //console.log(intent.name);
      //console.log('루트팔로업인텐트');
      //console.log(intent.rootFollowupIntentName);
      //console.log('패런트팔로업인텐트');
      //console.log(intent.parentFollowupIntentName);
      //console.log(intent.followupIntentInfo);
      //var displayName = String(intent.displayName);
      var count = intent.displayName.match(/custom/g);
      if(count != null) {
        childDegree[intent.displayName] = count.length;
      }

      //자식이 없는 인텐트의 card num을 0으로 채움
      
      if(!childCardinality[intent.displayName]){
        cardinalityNum[intent.displayName] = 0;
      }else{
        cardinalityNum[intent.displayName] = childCardinality[intent.displayName].length;
      }
      //console.log(intent.displayName);
      //console.log(childCardinality[intent.displayName]);
      //console.log(cardinalityNum);

      result.push({
        intentName: intent.displayName,
        trainingPhrases: trainingPhrases[intent.displayName],
        messageTexts: messageTexts[intent.displayName],
        inputContexts: inputContexts[intent.displayName],
        outputContext: outputContext[intent.displayName],
        childDegree: childDegree[intent.displayName],
        cardinalityNum: cardinalityNum[intent.displayName],
      });
    })
   // console.log(cardinalityNum);
    result.sort((a, b) => {
      var nameA = a.intentName.toUpperCase(); // ignore upper and lowercase
      var nameB = b.intentName.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // 이름이 같을 경우
      return 0;
    });

    // if(!subIntents[result[i].displayName]){
    //   subIntents[result[i].displayName] = result[j]
    // }else{
    //   subIntents.push(result[j]);
    // }

    /*
    let newResult = [];
    for(let i = 0; i < result.length; i++){
      newResult.push(result[i]);
      if(result[i].outputContext){
        let parentIntent = result[i];
        let childIntents = searchChild(result, result[i], ++i);
        for(let j = i+1; j < result.length; j++){ //find child
          if(parentIntent.outputContext === result[j].inputContexts){ //found child intent
            childIntents.push(result[j]);
            result.splice(j, 1);
          }
        }
        newResult.childIntents = childIntents;
      }
    }
*/
    let childIntents = [];
    //for문안에서 순회하며 호출
    const searchChild = (intentArray, childIntents, index, childIndex, degree) =>{
      if(!intentArray[index].outputContext){  //자식이 없다면
        console.log(childIntents);
        return childIntents[intentArray[index].displayName].push(intentArray[index]); //부모 - 자식
      }else{  //자식이 있다면
        let parentIntent = intentArray[index];
        for(let i = 0; i < intentArray.length; i++){  //let intent in intentArray
          //console.log(parentIntent);
          let childIntent = intentArray[i];
          if(parentIntent.outputContext === childIntent.inputContexts){
            if(!childIntents[parentIntent.displayName]){
              childIntents[parentIntent.displayName] = childIntent;
            }else{
              //childIntents.push(childIntent);
            }
            //intentArrayWithChild.splice(i, 1);
          }
          
        }
        return searchChild(intentArray, childIntents, ++index, childIndex, degree); //[parentIntent.displayName]
      }


      let childArray = [];
      for(let i = index; i < intentArray.length; i++){
        if(intentArray[i].inputContexts === parentIntent.outputContext){
          childArray.push(intentArray[i]);
        }
      }
      return childArray;
    }
    
    //let childIntentsResult = searchChild(result, childIntents, 0, 0, 0);
    //console.log(childIntentsResult);
    /*
    console.log("trainingPhrases here");
    console.log(trainingPhrases);
    console.log("messageText here");
    console.log(messageTexts);
    console.log("inputContexts here");
    console.log(inputContexts);
    console.log("outputContexts here");
    console.log(outputContext);
    */

    //console.log(result);
    res.send({
      result: result});
    /*
    res.send({
      trainingPhrases: trainingPhrases,
      messageTexts: messageTexts,
      inputContexts: inputContexts,
      outputContext: outputContext,
    })
    */
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