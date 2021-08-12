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

	const teamString = match.i5.includes('team_') ? match.i5.slice(5) : match.i5;

	const teamClass = classNames({
		'team-long': teamString.length > 15,
	});

	const matchElo = match.elo ? match.elo : '+0';
	const eloSign = eloDif > 0 ? `+${eloDif}` : eloDif;
	const eloDiffNaN = Number.isNaN(eloDif) ? '+0' : (eloSign);
	const eloDiff =  eloDif ? eloDiffNaN : '';
	const eloClass = classNames({
		'kd-high': eloDif > 0,
		'kd-low': eloDif < 0,
	});

	return (
		<div onClick={() => {
			setMatchId(match.matchId);
			setShowMatches(false);
		}}
			className={bgClass}
		>
			<span>{secToDate(match.created_at)}</span>
			<div className="match__elo">
				{matchElo}&nbsp;
				<span className={eloClass}>{eloDiff}</span>
			</div>
			<span>{match.i18.split('/').join('-')}</span>
			<span>{match.c3}</span>
			<span className={kdClass}>{match.c2}</span>
			<span>{match.c4}%</span>
			<span>{match.i6}</span>
			<span>{match.i7}</span>
			<span>{match.i8}</span>			
			<span>{match.i1.split('/').pop()}</span>
			<span className={teamClass}>{teamString}</span>
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
