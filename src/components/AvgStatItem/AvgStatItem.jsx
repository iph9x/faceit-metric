import React from 'react';

import CardString from '../CardString/CardString';

function AvgStatItem({matches, gamesCount, mainIncreasing}) {
    const {kd, kr, hs, avgFrags, winrate} = matches;

    return (    
        <div className="player-card player-card__avg-box">
            <div className="player-card__avg-title">
                Statistic for {gamesCount} games
            </div>
            <div className="player-card__stat-box">
                <CardString 
                    label="avg frags"
                    stat={avgFrags}
                />
                <CardString 
                    label="K/D"
                    stat={kd}
                />
                <CardString 
                    label="K/R"
                    stat={kr}
                />
                <CardString 
                    label="avg hs"
                    stat={hs + "%"}
                />
                <CardString 
                    label="win rate"
                    stat={winrate + "%"}
                />
                <CardString 
                    label="elo diff"
                    stat={mainIncreasing > 0 ? "+" + Number.parseInt(mainIncreasing) : mainIncreasing}
                />
            </div>
        </div>             
    );
}

export default AvgStatItem;
