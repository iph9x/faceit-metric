import React from 'react';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types'; 

import defaultAvatar from '../../assets/img/avatar.jpg';

function RoomPlayerItem({ player, setShowMatches }) {
	const { 
		nickname,
		gameSkillLevel,
		elo,
		avatar,
		i6,
		i7,
		i8,
		c2,
		c3,
		c4,
		i9,
		i14,
		i15,
		i16,
	} = player;

	const history = useHistory();

	const clickHandler = () => {
		history.push({
			pathname: '/faceit-metric/',
			search: `?nickname=${nickname}`
		});

		setShowMatches(true);
	}

	return (    
		<div className="player-wrapper">
			<img
				className="player__avatar player__js-start"
				src={ avatar || defaultAvatar }
				alt=""
				onClick={clickHandler}
			/>
			<span className="player__info player__js-start" onClick={clickHandler}>
				{nickname}
			</span>
			<span className="player__info">
				{gameSkillLevel}
			</span>
			<span className="player__info">
				{elo}
			</span>
			<span className="player__info">
				{i6}
			</span>
			<span className="player__info">
				{i7}
			</span>
			<span className="player__info">
				{i8}
			</span>
			<span className="player__info">
				{c2}
			</span>
			<span className="player__info">
				{c3}
			</span>
			<span className="player__info">
				{c4}%
			</span>
			<span className="player__info">
				{i9}
			</span>
			<span className="player__info">
				{i14}
			</span>
			<span className="player__info">
				{i15}
			</span>
			<span className="player__info">
				{i16}
			</span>
		</div>            
	);
}

RoomPlayerItem.propTypes = {
	player: PropTypes.object,
	setShowMatches: PropTypes.func,
}

export default RoomPlayerItem;
