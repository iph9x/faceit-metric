import React from 'react';
import { useState } from 'react';

import classNames from 'classnames';

import CardString from '../CardString/CardString';

function AvgStatItem({ matches, gamesCount, mainIncreasing }) {
    const { 
        kd,
        kr,
        hs,
        avgFrags,
        winrate,
        assists,
        frags,
        trip,
        quad,
        penta,
        mvps,
    } = matches;

    const [showDetailedStat, setShowDetailedStat] = useState(false);

    const cardClass = classNames({
        'player-card': true,
        'player-card__avg-box': true,
        'player-card__avg-box_full': showDetailedStat
    });

    const switchDetailedStat = () => {
        setShowDetailedStat(!showDetailedStat);
    }

    return (    
        <div className={cardClass}>
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
                {showDetailedStat &&
                    <>
                        <CardString 
                            label="MVPs"
                            stat={mvps}
                        />
                        <CardString 
                            label="Frags"
                            stat={frags}
                        />
                        <CardString 
                            label="Assists"
                            stat={assists}
                        />
                        <CardString 
                            label="Triple"
                            stat={trip}
                        />
                        <CardString 
                            label="Quad"
                            stat={quad}
                        />
                        <CardString 
                            label="Penta"
                            stat={penta}
                        />
                    </>
                }
            </div>
            <button type="button" className="btn player-card__btn-detailes" onClick={switchDetailedStat}>
                {showDetailedStat ? 'Hide detailed stat' : 'Show detailed stat'}
            </button>
        </div>             
    );
}

export default AvgStatItem;
