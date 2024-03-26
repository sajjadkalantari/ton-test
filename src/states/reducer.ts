// reducer.ts
import { SET_MENU_VISIBILITY, SET_USER } from './actions';

interface ApplicationState {
    showMenu: boolean;
    user: any
}

const initialState: ApplicationState = {
    showMenu: true,
    user: {}
};

const appReducer = (state = initialState, action: any): ApplicationState => {
    switch (action.type) {
        case SET_MENU_VISIBILITY:
            return {
                ...state,
                showMenu: action.payload,
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default appReducer;
