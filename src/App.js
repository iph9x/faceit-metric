import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import './assets/scss/main.scss';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AppRouter from './route/AppRouter';

const App = () => {
	const { search } = useLocation();   
	const history = useHistory();
	
	const [value, setValue] = useState('');
	const [currentUrl, setCurrentUrl] = useState(null);
	const [showMatches, setShowMatches] = useState(true);
	const [globalFetching, setGlobalFetching] = useState(false);
	
	return (
		<>
			<Header 
				search={search}
				history={history}
				value={value}
				setValue={setValue}
				currentUrl={currentUrl}
				setCurrentUrl={setCurrentUrl}
				showMatches={showMatches}
				setShowMatches={setShowMatches}
				setGlobalFetching={setGlobalFetching}
			/>
			<AppRouter 
				search={search}
				currentUrl={currentUrl}
				setCurrentUrl={setCurrentUrl}
				showMatches={showMatches}
				setShowMatches={setShowMatches}
				globalFetching={globalFetching}
				setGlobalFetching={setGlobalFetching}
			/>
			<Footer />
		</>
	);
}

export default App;
