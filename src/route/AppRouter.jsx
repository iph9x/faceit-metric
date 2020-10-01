import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main/Main';
import CheckRoom from '../components/CheckRoom/CheckRoom';

function AppRouter() {
	return (
        <Switch>
            <Route exact path="/faceit-metric/" component={Main} />
            <Route exact path="/faceit-metric/room" component={CheckRoom} />
        </Switch>
	);
}

export default AppRouter;
