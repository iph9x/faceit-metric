import {
  GET_MATCHES_LIST_REQUEST,
  GET_MATCHES_LIST_SUCCESS,
  GET_MATCHES_LIST_FAILURE
} from "./consts";
  
const initialState = {
  allMatches: null,
  isFetching: false,
  error: null
};

const matchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCHES_LIST_REQUEST:
      return {
        ...state,
        allMatches: null,
        isFetching: true,
        error: null
      };
    case GET_MATCHES_LIST_SUCCESS:
      return {
        ...state,
        allMatches: action.allMatches,
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
  