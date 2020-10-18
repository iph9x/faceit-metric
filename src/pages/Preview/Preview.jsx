import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { clearMatches } from '../../redux/match/actions';

function Preview() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearMatches());
	}, [dispatch])

	return (    
		<main className="main">
			<div className="main__container container">
				<div className="preview">
					<h1 className="preview__h1">Welcome to Faceit Metric!</h1>
					<p className="preview__subtitle">You can see here: </p>
					<ul className="preview__list">
						<li>
							&mdash;&nbsp;
							<span className="preview__item">
								detailed statistic of all players
							</span>
						</li>
						<li>
							&mdash;&nbsp;
							<span className="preview__item">
								statistic player for last 10-100 matches
							</span> 
						</li>
						<li>
							&mdash;&nbsp;
							<span className="preview__item">
								list of last matches
							</span> 
						</li>
						<li>
							&mdash;&nbsp;
							<span className="preview__item">
								detailed statistic of match
							</span> 
						</li>
						<li>
							&mdash;&nbsp;
							<span className="preview__item">
								comparing players
							</span> 
						</li>
					</ul>
				</div>
			</div>
		</main>
	);
}

export default Preview;
