import { SET_ID_USER, ADD_FAV, REMOVE_FAV, RESET, FILTER, ORDER } from "../redux/actions";

const initialState = {
    myFavorites: [],
    allCharacters: [],
    IdUser: 0,
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ID_USER:
            return {
                ...state,
                IdUser: payload,
            };
        case ADD_FAV:
            return { ...state, myFavorites: payload, allCharacters: payload };
        case REMOVE_FAV:
            return { ...state, myFavorites: payload, allCharacters: payload };
        case RESET:
            return { myFavorites: [], allCharacters: [], };
        case FILTER:
            if (payload === "All") {
                return { ...state, myFavorites: state.allCharacters };
            } else {
                const filteredCharacters = state.allCharacters.filter(
                    (char) => char.gender === payload
                );
                return { ...state, myFavorites: filteredCharacters };
            }
        case ORDER:
            const orderDirection = payload === "A" ? 1 : payload === "D" ? -1 : 0;
            const orderedFavorites = [...state.myFavorites].sort((a, b) => (a.id - b.id) * orderDirection);
            return { ...state, myFavorites: orderedFavorites };
        default:
            return { ...state };
    }
};
export default rootReducer;
