import React from 'react';

import { secToDate } from '../../assets/js/utils';

function MatchItem({
    bgClass,
    map,
    team,
    score,
    kd,
    hs,
    frags,
    assists,
    deaths,
    date,
    eloDif,
    elo,
    matchId
}) {
    const onClickHandler = (e, newPageUrl) => {
        e.preventDefault();
        window.open(newPageUrl, "_blank")
    }
    return (
        <a target="_blank" rel="noopener noreferrer" href="faceit.com" 
        onClick={(e) => onClickHandler(e, `https://www.faceit.com/ru/csgo/room/${matchId}/scoreboard`)}>
            <div className={bgClass}>
                <div>{map}</div>
                <div>{team}</div>
                <div>{score}</div>
                <div>{kd}</div>
                <div>{hs}</div>
                <div>{`${frags} - ${assists} - ${deaths}`}</div>
                <div>{secToDate(date)}</div>
                <div>{`${elo} ${eloDif ? `(${Number.isNaN(eloDif) ? "+0" : (eloDif > 0 ? `+${eloDif}` : eloDif)})` : `` }`}</div>
            </div>
        </a>
    );
}

export default MatchItem;
