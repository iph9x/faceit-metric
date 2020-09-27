import {
    GET_SEARCH_RESULT_SUCCESS,
    GET_SEARCH_RESULT_REQUEST,
    GET_SEARCH_RESULT_FAILURE
} from "./consts";
  
  const initialState = {
   playerStats: null,
   playerInfo: {
    playerAvatar: '',
    skill_level: '',
    faceit_elo: '',
    nickname: '',
    playerId: null
   },
   isFetching: false,
   error: null
  };
  
  const playerReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SEARCH_RESULT_REQUEST:
        return {
          ...state,
          playerStats: null,
          playerInfo: {},
          isFetching: true
        };
      case GET_SEARCH_RESULT_SUCCESS:
        return {
          ...state,
          playerStats: action.playerStats,
          playerInfo: action.playerInfo,
          error: null,
          isFetching: false
        };
      case GET_SEARCH_RESULT_FAILURE:
        return {
          ...state,
          error: action.error,
          isFetching: false,
        };
      default:
        return state;
    }
  };
  
  export default playerReducer;
  