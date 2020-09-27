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
                <div>{`${frags}/${assists}/${deaths}`}</div>
                <div>{secToDate(date)}</div>
                <div>{Number.isNaN(elo) ? 0 : (elo > 0 ? `+${elo}` : elo)}</div>
            </div>
        </a>
    );
}

export default MatchItem;
