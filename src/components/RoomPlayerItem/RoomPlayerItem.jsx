import React from 'react';
import { useHistory } from 'react-router-dom';

function RoomPlayerItem({ numTeamStats, player, i, setShowMatches }) {
    const {nickname, gameSkillLevel, elo, avatar } = player;

    const history = useHistory();

    const clickHandler = () => {
        history.push({
            pathname: '/faceit-metric/',
            search: `?nickname=${nickname}`
        });

        setShowMatches(true);
    }

    return (    
        <div className="player-wrapper" onClick={clickHandler}>
            <img className="player__avatar player__js-start" src={avatar} alt="" />
            <div className="player__info player__js-start">
                {nickname}
            </div>
            <div className="player__info">
                {gameSkillLevel}
            </div>
            <div className="player__info">
                {elo}
            </div>
            <div className="player__info">
                {numTeamStats[i].i6}
            </div>
            <div className="player__info">
                {numTeamStats[i].i7}
            </div>
            <div className="player__info">
                {numTeamStats[i].i8}
            </div>
            <div className="player__info">
                {numTeamStats[i].c2}
            </div>
            <div className="player__info">
                {numTeamStats[i].c3}
            </div>
            <div className="player__info">
                {numTeamStats[i].c4}%
            </div>
            <div className="player__info">
                {numTeamStats[i].i9}
            </div>
            <div className="player__info">
                {numTeamStats[i].i14}
            </div>
            <div className="player__info">
                {numTeamStats[i].i15}
            </div>
            <div className="player__info">
                {numTeamStats[i].i16}
            </div>
        </div>            
    );
}

export default RoomPlayerItem;
