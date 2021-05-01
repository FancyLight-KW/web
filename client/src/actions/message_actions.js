import * as actionTypes from '../constants/chatActionTypes'

export function saveMessage(dataToSubmit) {
   
    return {
        type: actionTypes.SAVE_MESSAGE,
        payload: dataToSubmit
    }
}
