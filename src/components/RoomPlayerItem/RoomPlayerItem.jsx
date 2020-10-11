import React from 'react';
import { useHistory } from 'react-router-dom';

import defaultAvatar from '../../assets/img/avatar.jpg';

function RoomPlayerItem({ numTeamStats, player, i, setShowMatches }) {
    const { nickname, gameSkillLevel, elo, avatar } = player;

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
            <img className="player__avatar player__js-start" src={ avatar || defaultAvatar } alt="" onClick={clickHandler}/>
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
                {numTeamStats[i].i6}
            </span>
            <span className="player__info">
                {numTeamStats[i].i7}
            </span>
            <span className="player__info">
                {numTeamStats[i].i8}
            </span>
            <span className="player__info">
                {numTeamStats[i].c2}
            </span>
            <span className="player__info">
                {numTeamStats[i].c3}
            </span>
            <span className="player__info">
                {numTeamStats[i].c4}%
            </span>
            <span className="player__info">
                {numTeamStats[i].i9}
            </span>
            <span className="player__info">
                {numTeamStats[i].i14}
            </span>
            <span className="player__info">
                {numTeamStats[i].i15}
            </span>
            <span className="player__info">
                {numTeamStats[i].i16}
            </span>
        </div>            
    );
}

export default RoomPlayerItem;
