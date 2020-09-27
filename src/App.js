import React from 'react';

import './assets/scss/main.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AppRouter from './route/AppRouter';

function App() {
	return (
		<>
			<Header />
			<AppRouter />
			<Footer />
		</>
	);
}

export default App;
