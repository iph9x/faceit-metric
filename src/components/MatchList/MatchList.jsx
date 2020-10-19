import React from 'react';

import PropTypes from 'prop-types'; 

function MatchList({
	matches,
	matchesArr,
}) {
	return (       
		<div className="match__wrapper">
			{matches && (
				<div className="match__item-titles">
					<span>date</span>
					<span>elo</span>					
					<span>score</span>
					<span>kd</span>
					<span>hs</span>
					<span>K</span>
					<span>A</span>
					<span>D</span>
					<span>map</span>
					<span>team</span>
				</div>
			)}
			{matches && matchesArr}
		</div>           
	);
}

MatchList.propTypes = {
	matches: PropTypes.array,
	matchesArr: PropTypes.array,
}

export default MatchList;
