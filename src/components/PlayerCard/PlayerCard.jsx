import React from 'react';

import classNames from 'classnames';

import CardString from '../CardString/CardString';

import faceitLogo from '../../assets/img/faceit.png';
import defaultAvatar from '../../assets/img/avatar.jpg';

const hrefInstance = 'https://www.faceit.com/ru/players/';

function PlayerCard({ nickname, avatar, level, elo, matches, kd, hs, winRate, maxElo }) {
    const bgColor = classNames({
        'player-card__bg': true,
        'player-card__bg_red': level === 10,
        'player-card__bg_orange': level >= 8 && level <= 9,
        'player-card__bg_yellow': level >= 4 && level <= 7,
        'player-card__bg_green': level >= 2 && level <= 3,
        'player-card__bg_white': level === 1
    });
    return (<>    
        <div className="player-card player-card__avatar-box">
            <div className="player-card__nickname">
                <span>
                    {nickname}
                </span>
                <a href={hrefInstance + nickname} target="_blank" rel="noopener noreferrer">
                    <img src={faceitLogo} alt=""/>
                </a>
            </div>
            <div className={bgColor}>.</div>
            <img className="player-card__avatar" src={avatar || defaultAvatar} alt=""/>
        </div>
        <div className="player-card player-card__alltime-box">
            <div className="player-card__avg-title">
                Statistic for alltime
            </div>
            <div className="player-card__stat-box">
                <CardString 
                    label="Level"
                    stat={level}
                />
                <CardString 
                    label="Elo"
                    stat={elo}
                />
                <CardString 
                    label="Max Elo"
                    stat={maxElo}
                />
                <CardString 
                    label="matches"
                    stat={matches}
                />
                <CardString 
                    label="K/D Ratio"
                    stat={kd}
                />
                <CardString 
                    label="avg hs"
                    stat={hs + "%"}
                />
                <CardString 
                    label="win rate"
                    stat={winRate + "%"}
                />
            </div>
        </div>       
    </>
    );
}

export default PlayerCard;
