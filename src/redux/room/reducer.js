import {
	GET_ROOM_REQUEST,
	GET_ROOM_SUCCESS,
	GET_ROOM_FAILURE,
} from "./consts";
  
const initialState = {
	teamsInfo: null,
	teamsStats: null,
	isFetching: false,
	error: null
};

const roomReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ROOM_REQUEST:
			return {
				...state,
				teamsInfo: null,
				teamsStats: null,
				isFetching: true,
				error: null
			};
		case GET_ROOM_SUCCESS:
			return {
				...state,
				teamsInfo: action.teamsInfo,
				teamsStats: action.teamsStats,
				error: null,
				isFetching: false
			};
		case GET_ROOM_FAILURE:
			return {
				...state,
				error: action.error,
				isFetching: false,
			};
		default:
			return state;
	}
};
  
export default roomReducer;
  