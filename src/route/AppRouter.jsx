import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main/Main';
import Comparison from '../pages/Comparison/Comparison';

function AppRouter() {
	return (
        <Switch>
            <Route exact path="/faceit-metric/" component={Main} />
            <Route exact path="/faceit-metric/compare" component={Comparison} />
        </Switch>
	);
}

export default AppRouter;
