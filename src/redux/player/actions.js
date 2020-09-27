import API from "../../api/api";
import {
    GET_SEARCH_RESULT_SUCCESS,
    GET_SEARCH_RESULT_REQUEST,
    GET_SEARCH_RESULT_FAILURE
} from "./consts";

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
			// const searchResponse = await API.GET_OPEN(`search/players?nickname=${nickname}&offset=0&limit=1`);
			// const playerStats = searchResponse.data.items[0];
			// const playerId = playerStats.player_id;		

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