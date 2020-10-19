import React from 'react';

import classNames from 'classnames';

import PropTypes from 'prop-types'; 

import { secToDate } from '../../assets/js/utils';

function MatchItem({ match, eloDif, setMatchId, setShowMatches }) {
	const bgClass = classNames({
		match__item: true,
		'match__win': match.i10 === '1',
		'match__lose': match.i10 === '0'
	});

	const kdClass = classNames({
		'kd-high': Number.parseFloat(match.c2) > 1,
		'kd-low': Number.parseFloat(match.c2) < 1,
		'kd-one': Number.parseFloat(match.c2) === 1
	});

	const matchElo = match.elo ? match.elo : '(+0)';
	const eloSign = eloDif > 0 ? `+${eloDif}` : eloDif;
	const eloDiffNaN = Number.isNaN(eloDif) ? '(+0)' : (eloSign);
	const eloDiff =  eloDif ? `(${eloDiffNaN})` : '';

	return (
		<div onClick={() => {
			setMatchId(match.matchId);
			setShowMatches(false);
		}}
			className={bgClass}
		>
			<span>{secToDate(match.created_at)}</span>
			<span>{`${matchElo} ${eloDiff}`}</span>
			<span>{match.i18}</span>
			<span className={kdClass}>{match.c2}</span>
			<span>{match.c4}%</span>
			<span>{match.i6}</span>
			<span>{match.i7}</span>
			<span>{match.i8}</span>			
			<span>{match.i1.split('/').pop()}</span>
			<span>{match.i5}</span>
		</div>
	);
}

MatchItem.propTypes = {
	match: PropTypes.object,
	eloDif: PropTypes.number,
	setMatchId: PropTypes.func,
	setShowMatches: PropTypes.func,
}

export default MatchItem;
