import {
    SAVE_MESSAGE,
} from '../actions/message_actions';

export default function (state = {messages:[]}, action) {
    switch (action.type) {
        case SAVE_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            }
        default:
            return state;
    }
}