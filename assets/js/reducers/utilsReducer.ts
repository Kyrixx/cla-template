import  { Types } from '../actions/types';

const defaultState = {
    modalState: false
};

export default function utilsReducer(state = defaultState, action) {
    switch(action.type) {
        case Types.ShowBugSubmitModal: {
            return {
                ...state,
                modalState: action.payload.modalState,
            }
        }

        case Types.HideBugSubmitModal: {
            return {
                ...state,
                modalState: action.payload.modalState,
            }
        }

        default: {
            return state;
        }
    }
}