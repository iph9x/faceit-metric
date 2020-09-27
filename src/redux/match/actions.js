import API from "../../api/api";
import {
    GET_MATCHES_LIST_REQUEST,
    GET_MATCHES_LIST_SUCCESS,
    GET_MATCHES_LIST_FAILURE
} from "./consts";

// GET MATCHES LIST

export const getMatchesRequest = () => ({ type: GET_MATCHES_LIST_REQUEST });
export const getMatchesSuccess = (matches) => ({
	type: GET_MATCHES_LIST_SUCCESS,
	matches,
});
export const getMatchesFailure = (error) => ({
	type: GET_MATCHES_LIST_FAILURE,
	error,
});

export const getMatchesThunkCreator = (playerId, matchesCount) => {
	return async (dispatch) => {
		dispatch(getMatchesRequest());

		try {
			const getMatches = await API.GET_ELO(`stats/api/v1/stats/time/users/${playerId}/games/csgo?size=${matchesCount}`);

			dispatch(getMatchesSuccess(getMatches.data));
		} catch (error) {
			dispatch(getMatchesFailure(error));
		}
	};
};