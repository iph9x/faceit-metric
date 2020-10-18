import API from "../../api/api";
import {
	СLEAR_STATE,
	GET_SEARCH_RESULT_SUCCESS,
	GET_SEARCH_RESULT_REQUEST,
	GET_SEARCH_RESULT_FAILURE,
	GET_COMPARISON_LIST_REQUEST,
	GET_COMPARISON_LIST_SUCCESS,
	GET_COMPARISON_LIST_FAILURE
} from "./consts";

export const clearState = () => ({ type: СLEAR_STATE });

/** GET SEARCH RESULT */
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

export const getSearchResultThunkCreator = (nickname) => {
	return async (dispatch) => {
		dispatch(getSearchResultRequest());

		try {
			const getUserIdBySearch = await API.GET(`search/v1?limit=3&query=${nickname}`);
			const {guid: userId, nickname: userNickname} = getUserIdBySearch.data.payload.players.results[0];

			const searchResponse = await API.GET(`core/v1/nicknames/${userNickname}`);
				
			const statResponse = await API.GET(`stats/v1/stats/users/${userId}/games/csgo`);
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

/** SET SECOND PLAYER */
export const setSecondPlayersRequest = () => ({ type: GET_COMPARISON_LIST_REQUEST });
export const setSecondPlayersSuccess = (secondPlayerStats, secondPlayerInfo) => ({
	type: GET_COMPARISON_LIST_SUCCESS,
	secondPlayerStats,
	secondPlayerInfo
});
export const setSecondPlayersFailure = (secError) => ({
	type: GET_COMPARISON_LIST_FAILURE,
	secError
});

export const setSecondPlayerThunkCreator = (nickname) => {
	return async (dispatch) => {
		dispatch(setSecondPlayersRequest());

		try {			
			const getUserIdBySearch = await API.GET(`search/v1?limit=3&query=${nickname}`);
			const {guid: userId, nickname: userNickname} = getUserIdBySearch.data.payload.players.results[0];

			const searchResponse = await API.GET(`core/v1/nicknames/${userNickname}`);
			const playerStats = searchResponse.data.payload;

			const playerInfo = {
				playerAvatar: playerStats.avatar,
				skill_level: playerStats.games.csgo.skill_level,
				faceit_elo: playerStats.games.csgo.faceit_elo,
				nickname: userNickname,
				playerId: userId
			};
			const statResponse = await API.GET(`stats/v1/stats/users/${userId}/games/csgo`);

			dispatch(setSecondPlayersSuccess(statResponse.data.lifetime, playerInfo));

		} catch (error) {
			dispatch(setSecondPlayersFailure(error));
		}
	};
};
