import React from 'react';

import PropTypes from 'prop-types'; 

import classNames from 'classnames';

function CompareField({ label, parMain, parSec, unit }) {
	const compareStat = (a, b) => {
		return classNames({
			'kd-high': Number.parseFloat(a) > Number.parseFloat(b),
			'kd-low': Number.parseFloat(a) < Number.parseFloat(b),
		});
	}

	return (    
		<div className="player-card__string">
			<div className="player-card__prefix">
				{`${label}:`}
			</div>
			<div className="player-card__postfix">
				<span className={compareStat(parMain, parSec)}>
					{parMain + unit}
				</span>
			</div>
			<div className="player-card__postfix">
				<span className={compareStat(parSec, parMain)}>
					{parSec + unit}
				</span>
			</div>
		</div>   
	);
}

CompareField.propTypes = {
	label: PropTypes.string,
	parMain: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	parSec: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	unit: PropTypes.string,
}

export default CompareField;
