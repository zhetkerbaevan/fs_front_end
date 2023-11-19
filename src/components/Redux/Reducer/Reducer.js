// reducer.js
import { FETCH_JEWELRIES_SUCCESS } from '../Actions/Actions';

const initialState = {
    jewelries: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_JEWELRIES_SUCCESS:
            return {
                ...state,
                jewelries: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
