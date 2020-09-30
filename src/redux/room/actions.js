import API from "../../api/api";
import {
    GET_ROOM_REQUEST,
	GET_ROOM_SUCCESS,
    GET_ROOM_FAILURE
} from "./consts";

// GET MATCHES LIST

export const getTeamsRequest = () => ({ type: GET_ROOM_REQUEST });
export const getTeamsSuccess = (teamsInfo, teamsStats) => ({
	type: GET_ROOM_SUCCESS,
	teamsInfo,
	teamsStats
});
export const getTeamsFailure = (error) => ({
	type: GET_ROOM_FAILURE,
	error,
});

export const getTeamsThunkCreator = (roomId) => {
	return async (dispatch) => {
		dispatch(getTeamsRequest());

		try {
			const teamsResponse = await API.GET_ELO(`match/v2/match/${roomId}`);
			const teamsStatsResponse = await API.GET_ELO(`/stats/v1/stats/matches/${roomId}`);

			dispatch(getTeamsSuccess(teamsResponse.data.payload, teamsStatsResponse.data[0]));
		} catch (error) {
			dispatch(getTeamsFailure(error));
		}
	};
};