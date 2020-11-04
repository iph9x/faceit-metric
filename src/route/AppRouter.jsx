import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PropTypes from 'prop-types'; 

import Preview from '../pages/Preview/Preview';
import Main from '../pages/Main/Main';

const AppRouter = ({
	search,
	currentUrl,
	setCurrentUrl,
	showMatches,
	setShowMatches,
	globalFetching,
	setGlobalFetching,
}) => {
	return (
		<Switch>
			<Route exact path="/faceit-metric/">
				{search
					? <Main 
						search={search}
						currentUrl={currentUrl}
						setCurrentUrl={setCurrentUrl}
						showMatches={showMatches}
						setShowMatches={setShowMatches}
						setGlobalFetching={setGlobalFetching}
						globalFetching={globalFetching}
					/>  
					: <Preview />
				}
			</Route>
			<Route path="/faceit-metric/home" component={Preview} />
		</Switch>
	);
}

AppRouter.propTypes = {
	search: PropTypes.string,
	currentUrl: PropTypes.string,
	setCurrentUrl: PropTypes.func,
	showMatches: PropTypes.bool,
	setShowMatches: PropTypes.func,
	globalFetching: PropTypes.bool,
	setGlobalFetching: PropTypes.func,
};

export default AppRouter;
