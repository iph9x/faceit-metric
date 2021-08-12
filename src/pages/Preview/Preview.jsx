import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faAddressCard,
	faSortAmountUpAlt,
	faTrophy,
	faBalanceScaleRight,
	faListUl,
	faChartLine
} from '@fortawesome/free-solid-svg-icons';

import { clearMatches } from '../../redux/match/actions';

import './Preview.scss';

function Preview() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearMatches());
	}, [dispatch])

	library.add(faAddressCard, faSortAmountUpAlt, faTrophy, faBalanceScaleRight, faListUl);

	return (    
		<main className="main">
			<div className="main__container container">
				<div className="preview">
					<h1 className="preview__h1">Welcome to Faceit Metric!</h1>
					<ul className="preview__list">
						<li className="preview__item">
							<span className="preview__icon">
								<FontAwesomeIcon icon={faAddressCard} />
							</span>
							<span>
								detailed statistics of all players
							</span>
						</li>
						<li className="preview__item">
							<span className="preview__icon">
								<FontAwesomeIcon icon={faSortAmountUpAlt} />
							</span>
							<span>
								player statistics for the last 10-100 matches
							</span> 
						</li>
						<li className="preview__item">
							<span className="preview__icon">
								<FontAwesomeIcon icon={faListUl} />
							</span>
							<span>
								list of recent matches
							</span> 
						</li>
						<li className="preview__item">
							<span className="preview__icon">
								<FontAwesomeIcon icon={faTrophy} />
							</span>
							<span>
								detailed match statistics
							</span> 
						</li>
						<li className="preview__item">
							<span className="preview__icon">
								<FontAwesomeIcon icon={faBalanceScaleRight} />
							</span>
							<span>
								comparing players
							</span> 
						</li>
						<li className="preview__item">
							<span className="preview__icon">
								<FontAwesomeIcon icon={faChartLine} />
							</span>
							<span>
								elo / kd / frags charts
							</span> 
						</li>
					</ul>
				</div>
			</div>
		</main>
	);
}

export default Preview;
