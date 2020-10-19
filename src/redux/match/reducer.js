import {
  GET_MATCHES_LIST_REQUEST,
  GET_MATCHES_LIST_SUCCESS,
  GET_MATCHES_LIST_FAILURE,
  GET_SEC_MATCHES_LIST_REQUEST,
  GET_SEC_MATCHES_LIST_SUCCESS,
  GET_SEC_MATCHES_LIST_FAILURE,
  CLEAR_MATCHES
} from "./consts";
  
const initialState = {
  allMatches: null,
  secMatches: null,
  isFetching: false,
  secMatchesIsFetching: false,
  error: null,
  language: 'ru'  
};

const matchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_MATCHES:
      return {
        ...state,
        allMatches: null,
        error: null
      };
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
    case GET_SEC_MATCHES_LIST_REQUEST:
      return {
        ...state,
        secMatches: null,
        secMatchesIsFetching: true,
        error: null
      };
    case GET_SEC_MATCHES_LIST_SUCCESS:
      return {
        ...state,
        secMatches: action.secMatches,
        error: null,
        secMatchesIsFetching: false
      };
    case GET_SEC_MATCHES_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        secMatchesIsFetching: false,
      };
    default:
      return state;
  }
};
  
export default matchesReducer;
  