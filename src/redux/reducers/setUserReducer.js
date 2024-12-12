export const SetUserReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };
        case "CLEAR_USER":
            return {
                ...state,
                user: null, // Clear the user state
            };
        default:
            return state;
    }
};
