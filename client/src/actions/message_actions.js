export const SAVE_MESSAGE = 'save_message';

export function saveMessage(dataToSubmit) {
   
    return {
        type: SAVE_MESSAGE,
        payload: dataToSubmit
    }
}
