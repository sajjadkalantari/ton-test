// actions.ts
export const SET_MENU_VISIBILITY = 'SET_MENU_VISIBILITY';
export const SET_USER = 'SET_USER';

interface SetMenuVisibilityAction {
    type: typeof SET_MENU_VISIBILITY;
    payload: boolean;
}

export const setMenuVisibility = (menuVisibility: boolean) => ({
    type: SET_MENU_VISIBILITY,
    payload: menuVisibility,
});


export const setUser = (user: any) => ({
    type: SET_USER,
    payload:user,
});
