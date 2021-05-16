// Imports the Dialogflow library
const dialogflow = require("@google-cloud/dialogflow");

// Instantiates clients
const intentsClient = new dialogflow.IntentsClient();
const projectId = process.env.GOOGLE_PROJECT_ID;

async function searchIntentId(intentDisplayName) {
  const intentPath = intentsClient.agentPath(projectId);
  const request = {
    parent: intentPath,
  };

  //intent name = projects/itsp-chatbot-app/agent/intents/e7e341af-c309-4833-a651-a4c5cc4c9c7b
  try {
    const [intents] = await intentsClient.listIntents(request);
    intents.forEach((intent) => {
      console.log(intent.displayName);
      if (intent.displayName.toString() === intentDisplayName.toString()) {
        var nameArray = intent.name.split("/");
        console.log(`=======searched intent name: ${intent.name}`);
        console.log(
          `=======searched intent displayname: ${intent.displayName}`
        );
        console.log(`=======searched intent id: ${nameArray[4]}`);
        return nameArray[4];
      }
    });
  } catch (error) {
    console.log("intent id search failed");
  }
}
exports.deleteIntent = async (req, res) => {
  //search intent id
  const agentPath = intentsClient.agentPath(projectId);
  const agentrequest = {
    parent: agentPath,
  };
  let intentId = "";
  try {
    const [intents] = await intentsClient.listIntents(agentrequest);
    intents.forEach((intent) => {
      console.log(intent.displayName);
      if (intent.displayName.toString() === req.body.intentName.toString()) {
        var nameArray = intent.name.split("/");
        //console.log(`=======searched intent name: ${intent.name}`);
        //console.log(`=======searched intent displayname: ${intent.displayName}`);
        //console.log(`=======searched intent id: ${nameArray[4]}`);
        intentId = nameArray[4];
      }
    });
  } catch (error) {
    console.log("intent id search failed");
  }
  //console.log(`intent name: ${req.body.displayName}`);
  //let intentId = searchIntentId(req.body.displayName);

  const intentPath = intentsClient.intentPath(projectId, intentId);

  const intentrequest = { name: intentPath };

  // Send the request for deleting the intent.
  try {
    const result = await intentsClient.deleteIntent(intentrequest);
    console.log(`Intent ${intentPath} deleted`);
    res.send({
      resultCode: 0,
      message: "Intent 제거 성공",
    });
  } catch (error) {
    console.log("intent not found");
  }
};
