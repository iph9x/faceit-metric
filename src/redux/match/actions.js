import API from "../../api/api";
import {
    GET_MATCHES_LIST_REQUEST,
    GET_MATCHES_LIST_SUCCESS,
	GET_MATCHES_LIST_FAILURE,
	GET_SEC_MATCHES_LIST_REQUEST,
	GET_SEC_MATCHES_LIST_SUCCESS,
	GET_SEC_MATCHES_LIST_FAILURE
} from "./consts";

// GET MATCHES LIST

export const getMatchesRequest = () => ({ type: GET_MATCHES_LIST_REQUEST });
export const getMatchesSuccess = (allMatches) => ({
	type: GET_MATCHES_LIST_SUCCESS,
	allMatches,
});
export const getMatchesFailure = (error) => ({
	type: GET_MATCHES_LIST_FAILURE,
	error,
});

export const getMatchesThunkCreator = (playerId, matchesCount) => {
	return async (dispatch) => {
		dispatch(getMatchesRequest());

		try {
			const allMatchesResopnse = await API.GET_ELO(`stats/api/v1/stats/time/users/${playerId}/games/csgo?size=${matchesCount}`);

			dispatch(getMatchesSuccess(allMatchesResopnse.data));
		} catch (error) {
			dispatch(getMatchesFailure(error));
		}
	};
};
// GET SECONDS PLAYER MATCHES LIST

export const getSecMatchesRequest = () => ({ type: GET_SEC_MATCHES_LIST_REQUEST });
export const getSecMatchesSuccess = (secMatches) => ({
	type: GET_SEC_MATCHES_LIST_SUCCESS,
	secMatches,
});
export const getSecMatchesFailure = (error) => ({
	type: GET_SEC_MATCHES_LIST_FAILURE,
	error,
});

export const getSecMatchesThunkCreator = (playerId, matchesCount) => {
	return async (dispatch) => {
		dispatch(getSecMatchesRequest());

		try {
			const allMatchesResopnse = await API.GET_ELO(`stats/api/v1/stats/time/users/${playerId}/games/csgo?size=${matchesCount}`);

			dispatch(getSecMatchesSuccess(allMatchesResopnse.data));
		} catch (error) {
			dispatch(getSecMatchesFailure(error));
		}
	};
};