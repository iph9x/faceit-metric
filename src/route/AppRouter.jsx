import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main/Main';
import CheckRoom from '../components/CheckRoom/CheckRoom';

const AppRouter = ({
    search,
	history,
	value,
	setValue,
	currentUrl,
	setCurrentUrl,
	showMatches,
	setShowMatches,
}) => {
	return (
        <Switch>
            <Route exact path="/faceit-metric/" component={() => {
                return <Main 
                    search={search}
                    history={history}
                    value={value}
                    setValue={setValue}
                    currentUrl={currentUrl}
                    setCurrentUrl={setCurrentUrl}
                    showMatches={showMatches}
                    setShowMatches={setShowMatches}
                />
            }} />
            <Route exact path="/faceit-metric/room" component={CheckRoom} />
        </Switch>
	);
}

export default AppRouter;
