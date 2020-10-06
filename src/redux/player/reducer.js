import {
    СLEAR_STATE,
    GET_SEARCH_RESULT_SUCCESS,
    GET_SEARCH_RESULT_REQUEST,
	GET_SEARCH_RESULT_FAILURE,
	GET_COMPARISON_LIST_REQUEST,
	GET_COMPARISON_LIST_SUCCESS,
	GET_COMPARISON_LIST_FAILURE
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
	secondPlayerStats: null,
	secondPlayerInfo: {
		playerAvatar: '',
		skill_level: '',
		faceit_elo: '',
		nickname: '',
		playerId: null
	},
	isFetching: false,
	secondPlayerIsFetching: false,
	error: null,
	secError: null
};
  
const playerReducer = (state = initialState, action) => {
	switch (action.type) {
		case СLEAR_STATE:
			return {
				...state,
				playerStats: null,
				playerInfo: {
					playerAvatar: null,
            		skill_level: null,
            		faceit_elo: null,
            		nickname: null,
            		playerId: null
				}
			};
		case GET_SEARCH_RESULT_REQUEST:
			return {
				...state,
				playerStats: null,
				playerInfo: {
					nickname: null, 
					playerId: null
				},
				secondPlayerStats: null,
				secondPlayerInfo: {
					nickname: null, 
					playerId: null
				},
				isFetching: true,
				error: null
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
		case GET_COMPARISON_LIST_REQUEST:
			return {
				...state,
				secondPlayerStats: null,
				secondPlayerInfo: {
					nickname: null, 
					playerId: null
				},
				secondPlayerIsFetching: true,
				secError: null
			};
		case GET_COMPARISON_LIST_SUCCESS:
			return {
				...state,
				secondPlayerStats: action.secondPlayerStats,
				secondPlayerInfo: action.secondPlayerInfo,
				secondPlayerIsFetching: false,
				secError: null
			};
		case GET_COMPARISON_LIST_FAILURE:
			return {
				...state,
				secError: action.secError,
				secondPlayerIsFetching: false,
			};
		default:
			return state;
	}
};
  
  export default playerReducer;
  