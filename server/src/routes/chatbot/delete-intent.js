// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');

// Instantiates clients
const intentsClient = new dialogflow.IntentsClient();

exports.deleteIntent = async () => {
    const intentPath = intentsClient.intentPath(process.env.GOOGLE_PROJECT_ID, intentId);

    const request = { name: intentPath };

    // Send the request for deleting the intent.
    const result = await intentsClient.deleteIntent(request);
    console.log(`Intent ${intentPath} deleted`);
    return result;
}