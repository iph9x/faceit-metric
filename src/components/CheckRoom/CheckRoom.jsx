import React, { useState }  from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types'; 

import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { getTeamsThunkCreator } from '../../redux/room/actions';

import Preloader from '../Preloader/Preloader';
import RoomPlayerItem from '../RoomPlayerItem/RoomPlayerItem';
import RoomCaptions from '../RoomCaptions/RoomCaptions';

import '../../assets/scss/checkRoom.scss';

function CheckRoom({ roomId, setShowMatches }) {
	const [team1Roster, setTeam1Roster] = useState(null);
	const [team2Roster, setTeam2Roster] = useState(null);

	const [team1HeaderClass, setTeam1Class] = useState('');
	const [team2HeaderClass, setTeam2Class] = useState('');

	const dispatch = useDispatch();

	const { teamsInfo, teamsStats, isFetching, error } = useSelector(state => state.roomPage);

	useEffect(() => {
		if (roomId.length > 0) dispatch(getTeamsThunkCreator(roomId));
	}, [dispatch, roomId]);

	useEffect(() => {
		if (teamsInfo && teamsStats) {
				const team1Stats = teamsStats.teams[0].players;
				const team2Stats = teamsStats.teams[1].players;
				
				setTeam1Roster(createArr(teamsInfo.teams.faction1.roster, team1Stats));
				setTeam2Roster(createArr(teamsInfo.teams.faction2.roster, team2Stats));

				setTeam1Class(teamHeaderClass(0));
				setTeam2Class(teamHeaderClass(1));
		}
	// eslint-disable-next-line
	}, [teamsInfo]);

	const arrowBack = <FontAwesomeIcon icon={faArrowLeft} />;

	const teamHeaderClass = (i) => {
		return classNames('room__team-header', {
			'room__team-header_loser': 
				Number.parseInt(teamsStats.teams[i === 0 ? 0 : 1].c5)
				< Number.parseInt(teamsStats.teams[i === 0 ? 1 : 0].c5),
			'room__team-header_winner': 
				Number.parseInt(teamsStats.teams[i === 0 ? 0 : 1].c5)
				> Number.parseInt(teamsStats.teams[i === 0 ? 1 : 0].c5)
		});
	}

	const createArr = (team, numTeamStats) => {
		let joinArraysTeam = team.map((player, i) => {
			if (numTeamStats[i]) {
				return ({
					...(numTeamStats.filter(({ playerId }) => playerId === player.id)[0]),
					avatar: player.avatar, 
					id: player.id, 
					elo: player.elo, 
					gameSkillLevel: player.gameSkillLevel, 
				});
			}
			
			return null;
		});
		
		return joinArraysTeam
			.sort((a, b) => {
				if (Number.parseInt((a ? a.i6 : 0), 10) > Number.parseInt((b ? b.i6 : 0), 10)) {
					return 1;
				}

				if (Number.parseInt((a ? a.i6 : 0), 10) < Number.parseInt((b ? b.i6 : 0), 10)) {
					return -1;
				}

				return 0;
			})
			.reverse()
			.map(player => {
				if (player) {
					return <RoomPlayerItem 
						key={player.id} 
						player={player}
						setShowMatches={setShowMatches}
					/>
				}
				return null
			});
	};

	const parseEndTime = (str) => {
		const entTime = str.split('T');

		return `${entTime[0].slice(0)} - ${entTime[1].slice(0, -4)}`;
	}
	
	if (!isFetching && error) {
		return (
			<div className="room">
				<h2 className="room__error">Error 404: Match {roomId} not found</h2>
				<button className="btn room__btn" onClick={() => setShowMatches(true)}>
					{arrowBack}
				</button>
			</div>
		)
	}

	if (isFetching && !teamsStats) {
		return <Preloader />
	}

	if (teamsStats) {
		return (        
			<div className="room">
				<button className="btn room__btn" onClick={() => setShowMatches(true)}>
					{arrowBack}
				</button>
				<div className="room__game-info">
					{teamsInfo.matchCustom.tree.location.values.value[0] &&
						<div className="room__region">
							{teamsInfo.matchCustom.tree.location.values.value[0].name}
							<img src={teamsInfo.matchCustom.tree.location.values.value[0].image_sm} alt=""/>
						</div>
					}
					{!teamsInfo.matchCustom.tree.location.values.value[0] &&
						<div className="room__region">
							{teamsInfo.matchCustom.tree.location.values.value.name}
							<img src={teamsInfo.matchCustom.tree.location.values.value.image_sm} alt=""/>
						</div>
					}
					<div className="room__map">
						{teamsStats.i1.split('/').pop()}
					</div>
					<div className="room__score">
						{teamsStats.teams[0].c5} - {teamsStats.teams[1].c5}
					</div>
					<div className="room__endtime">
						{teamsInfo.checkIn 
						? parseEndTime(teamsInfo.checkIn.endTime)
						: parseEndTime(teamsInfo.substitution.endTime)}
					</div>
				</div>
				<div className="room__team-wrapper">
					<div className={team1HeaderClass}>
						<div className="room__team-name">
							{teamsStats.teams[0].i5}
						</div>
						<div className="room__score-box">
							<div className="room__score-half">
								FIRST HALF SCORE: {teamsStats.teams[0].i3}
							</div>
							<div className="room__score-half">
								SECOND HALF SCORE: {teamsStats.teams[0].i4}
							</div>
							<div className="room__score-half">
								FINAL SCORE: {teamsStats.teams[0].c5}
							</div>
						</div>
					</div>
					<RoomCaptions />
					<div className="room__team">
						{team1Roster && team2Roster && team1Roster}
					</div>
				</div>
				<div className="room__team-wrapper">
					<div className={team2HeaderClass}>
						<div className="room__team-name">
							{teamsStats.teams[1].i5}
						</div>
						<div className="room__score-box">
							<div className="room__score-half">
								FIRST HALF SCORE: {teamsStats.teams[1].i3}
							</div>
							<div className="room__score-half">
								SECOND HALF SCORE: {teamsStats.teams[1].i4}
							</div>
							<div className="room__score-half">
								FINAL SCORE: {teamsStats.teams[1].c5}
							</div>
						</div>
					</div>
					<RoomCaptions />
					<div className="room__team">
						{team1Roster && team2Roster && team2Roster}
					</div>
				</div>          
			</div>
		);
	}

	return null;
}

CheckRoom.propTypes = {
	roomId: PropTypes.string, 
	setShowMatches: PropTypes.func,
}

export default CheckRoom;
