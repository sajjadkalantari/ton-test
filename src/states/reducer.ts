// reducer.ts
import { SET_MENU_VISIBILITY } from './actions';

interface ApplicationState {
    showMenu: boolean;
}

const initialState: ApplicationState = {
    showMenu: true,
};

const appReducer = (state = initialState, action: any): ApplicationState => {
    switch (action.type) {
        case SET_MENU_VISIBILITY:
            return {
                ...state,
                showMenu: action.payload,
            };
        default:
            return state;
    }
};

export default appReducer;
