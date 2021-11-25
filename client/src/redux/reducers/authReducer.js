import { GLOBALTYPES } from "./globalTypes";

export const authReducer = (state, action) => {
    const {type, payload: { isAuthenticated, user}} = action;

    switch(type) {
        case GLOBALTYPES.SET_AUTH:
            return {
                ...state,
                authLoading: false,
                isAuthenticated: isAuthenticated,
                user: user,
            }

        default:
            return state;
    }
}