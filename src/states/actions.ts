// actions.ts
export const SET_MENU_VISIBILITY = 'SET_MENU_VISIBILITY';

interface SetMenuVisibilityAction {
    type: typeof SET_MENU_VISIBILITY;
    payload: boolean;
}

export const setMenuVisibility = (menuVisibility: boolean) => ({
    type: SET_MENU_VISIBILITY,
    payload: menuVisibility,
});
