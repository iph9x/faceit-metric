import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Preview from '../pages/Preview/Preview';
import Main from '../pages/Main/Main';

const AppRouter = ({
    search,
	currentUrl,
	setCurrentUrl,
	showMatches,
	setShowMatches,
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
                    />  
                    : <Redirect to="/faceit-metric/home" />
                }
            </Route>
            <Route exact path="/faceit-metric/home" component={Preview} />
        </Switch>
	);
}

export default AppRouter;
