import API from "../../api/api";
import {
    GET_SEARCH_RESULT_SUCCESS,
    GET_SEARCH_RESULT_REQUEST,
	GET_SEARCH_RESULT_FAILURE,
	GET_COMPARISON_LIST_REQUEST,
	GET_COMPARISON_LIST_SUCCESS,
	GET_COMPARISON_LIST_FAILURE
} from "./consts";

export const clearState = () => ({ type: "СLEAR_STATE" });
// GET SEARCH RESULT

export const getSearchResultRequest = () => ({ type: GET_SEARCH_RESULT_REQUEST });
export const getSearchResultSuccess = (playerStats, playerInfo) => ({
	type: GET_SEARCH_RESULT_SUCCESS,
	playerStats,
	playerInfo
});
export const getSearchResultFailure = (error) => ({
	type: GET_SEARCH_RESULT_FAILURE,
	error,
});

export const getPlayerIdThunkCreator = (nickname) => {
	return async (dispatch) => {
		dispatch(getSearchResultRequest());

		try {
			const getUserIdBySearch = await API.GET_ELO(`search/v1?limit=1&query=${nickname}`);
			const userId = getUserIdBySearch.data.payload.players.results[0].guid;
			const userNickname = getUserIdBySearch.data.payload.players.results[0].nickname;

			const searchResponse = await API.GET_ELO(`core/v1/nicknames/${userNickname}`);
				
			const statResponse = await API.GET_ELO(`stats/v1/stats/users/${userId}/games/csgo`);
			const playerStats = searchResponse.data.payload;

			const playerInfo = {
				playerAvatar: playerStats.avatar,
				skill_level: playerStats.games.csgo.skill_level,
				faceit_elo: playerStats.games.csgo.faceit_elo,
				nickname: userNickname,
				playerId: userId
			};
			dispatch(getSearchResultSuccess(statResponse.data.lifetime, playerInfo));


		} catch (error) {
			dispatch(getSearchResultFailure(error));
		}
	};
};

// SET COMPARISON OBJ

export const setComparisonPlayersRequest = () => ({ type: GET_COMPARISON_LIST_REQUEST });
export const setComparisonPlayersSuccess = (comparisonPlayers) => ({
	type: GET_COMPARISON_LIST_SUCCESS,
	comparisonPlayers
});
export const setComparisonPlayersFailure = (error) => ({
	type: GET_COMPARISON_LIST_FAILURE,
	error,
});

export const setComparisonPlayersThunkCreator = (comparisonPlayers) => {
	return async (dispatch) => {
		dispatch(getSearchResultRequest());
		try {		
			dispatch(getSearchResultSuccess(comparisonPlayers));
		} catch (error) {
			dispatch(getSearchResultFailure(error));
		}
	};
};