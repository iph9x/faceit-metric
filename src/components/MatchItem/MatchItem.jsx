import React from 'react';

import classNames from 'classnames';

import { secToDate } from '../../assets/js/utils';

function MatchItem({ match, eloDif }) {
    const bgClass = classNames({
        match__item: true,
        'match__win': match.i10 === '1',
        'match__lose': match.i10 === '0'
    });

    const onClickHandler = (e, newPageUrl) => {
        e.preventDefault();
        window.open(newPageUrl, "_blank")
    }

    return (
        <a target="_blank" rel="noopener noreferrer" href="faceit.com" 
        onClick={(e) => onClickHandler(e, `https://www.faceit.com/ru/csgo/room/${match.matchId}/scoreboard`)}>
            <div className={bgClass}>
                <div>{match.i1.split('/').pop()}</div>
                <div>{match.i5}</div>
                <div>{match.i18}</div>
                <div>{match.c2}</div>
                <div>{match.c4}</div>
                <div>{`${match.i6} - ${match.i7} - ${match.i8}`}</div>
                <div>{secToDate(match.created_at)}</div>
                <div>{`${match.elo ? match.elo : '(+0)'} ${eloDif ? `(${Number.isNaN(eloDif) ? "+0" : (eloDif > 0 ? `+${eloDif}` : eloDif)})` : `` }`}</div>
            </div>
        </a>
    );
}

export default MatchItem;
