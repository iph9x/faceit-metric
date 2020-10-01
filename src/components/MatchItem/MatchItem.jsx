import React from 'react';

import classNames from 'classnames';

import { secToDate } from '../../assets/js/utils';

function MatchItem({ match, eloDif, setMatchId, setShowMatches }) {
    const bgClass = classNames({
        match__item: true,
        'match__win': match.i10 === '1',
        'match__lose': match.i10 === '0'
    });

    const kdClass = classNames({
        "kd-high": Number.parseFloat(match.c2) > 1,
        "kd-low": Number.parseFloat(match.c2) < 1,
        "kd-one": Number.parseFloat(match.c2) === 1
    });

    return (
        <div onClick={() => {
            setMatchId(match.matchId);
            setShowMatches(false)
        }}
            className={bgClass}
        >
            <div>{match.i1.split('/').pop()}</div>
            <div>{match.i5}</div>
            <div>{match.i18}</div>
            <div className={kdClass}>{match.c2}</div>
            <div>{match.c4}%</div>
            <div>{match.i6}</div>
            <div>{match.i7}</div>
            <div>{match.i8}</div>
            <div>{secToDate(match.created_at)}</div>
            <div>{`${match.elo ? match.elo : '(+0)'} ${eloDif ? `(${Number.isNaN(eloDif) ? "+0" : (eloDif > 0 ? `+${eloDif}` : eloDif)})` : `` }`}</div>
        </div>
    );
}

export default MatchItem;
