import React from 'react';

import classNames from 'classnames';


function PlayerCard({nickname, avatar, level, elo, matches, kd, hs, winRate, maxElo}) {
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
            <div className="player-card__nickname">{nickname}</div>
            <div className={bgColor}>.</div>
            <img className="player-card__avatar"  src={avatar} alt=""/>
        </div>
        <div className="player-card player-card__alltime-box">
            <div className="player-card__avg-title">
                Statistic for alltime
            </div>
            <div className="player-card__stat-box">
                <div className="player-card__string">
                    <div className="player-card__prefix">
                        Level: 
                    </div>
                    <div className="player-card__postfix">
                        {level}
                    </div>
                </div>
                <div className="player-card__string">
                    <div className="player-card__prefix">
                        Elo: 
                    </div>
                    <div className="player-card__postfix">
                        {elo}
                    </div>
                </div>
                <div className="player-card__string">
                    <div className="player-card__prefix">
                        Max Elo: 
                    </div>
                    <div className="player-card__postfix">
                        {maxElo}
                    </div>
                </div>
                <div className="player-card__string">
                    <div className="player-card__prefix">
                        matches: 
                    </div>
                    <div className="player-card__postfix">
                        {matches}
                    </div>
                </div>
                <div className="player-card__string">
                    <div className="player-card__prefix">
                        K/D Ratio: 
                    </div>
                    <div className="player-card__postfix">
                        {kd}
                    </div>
                </div>
                <div className="player-card__string">
                    <div className="player-card__prefix">
                        avg hs:
                    </div>
                    <div className="player-card__postfix">
                        {hs}%
                    </div>
                </div>
                <div className="player-card__string">
                    <div className="player-card__prefix">
                        win rate: 
                    </div>
                    <div className="player-card__postfix">
                        {winRate}%
                    </div>
                </div>
            </div>
        </div>       
    </>
    );
}

export default PlayerCard;
