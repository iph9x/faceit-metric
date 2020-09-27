import React from 'react';

function PlayerCard({nickname, avatar, level, elo, matches, kd, hs, winRate}) {
    return (<>    
        <div className="player-card player-card__avatar-box">
            <div className="player-card__nickname">{nickname}</div>
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
