import {
  GET_MATCHES_LIST_REQUEST,
  GET_MATCHES_LIST_SUCCESS,
  GET_MATCHES_LIST_FAILURE
} from "./consts";
  
const initialState = {
  matches: null,
  isFetching: false,
  error: null
};

const matchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCHES_LIST_REQUEST:
      return {
        ...state,
        matches: [],
        isFetching: true
      };
    case GET_MATCHES_LIST_SUCCESS:
      return {
        ...state,
        matches: action.matches,
        error: null,
        isFetching: false
      };
    case GET_MATCHES_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
  
export default matchesReducer;
  