import React from 'react';

function AvgStatItem ({matches, gamesCount}) {
    const {kd, kr, hs, frags, winrate} = matches;

    return (    
        <div className="player-card player-card__avg-box">
            <div className="player-card__avg-title">
                Statistic for {gamesCount} games
            </div>
            <div className="player-card__stat-box">
                <div className="player-card__string">
                    <div className="player-card__prefix">
                        avg frags: 
                    </div>
                    <div className="player-card__postfix">
                        {frags}
                    </div>
                </div>
                <div className="player-card__string">
                    <div className="player-card__prefix">
                        K/D: 
                    </div>
                    <div className="player-card__postfix">
                        {kd}
                    </div>
                </div>
                <div className="player-card__string">
                    <div className="player-card__prefix">
                        K/R: 
                    </div>
                    <div className="player-card__postfix">
                        {kr}
                    </div>
                </div>
                <div className="player-card__string">
                    <div className="player-card__prefix">
                        avg hs:
                    </div>
                    <div className="player-card__postfix">
                        {hs}
                    </div>
                </div>
                <div className="player-card__string">
                    <div className="player-card__prefix">
                        win rate:
                    </div>
                    <div className="player-card__postfix">
                        {winrate}%
                    </div>
                </div>
                
            </div>
        </div>             
    );
}

export default AvgStatItem;
