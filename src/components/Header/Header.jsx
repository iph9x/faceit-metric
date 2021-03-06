import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import '../../assets/scss/header.scss';

import logo from '../../logo.png';

function Header({
	search,
	history,
	value,
	setValue,
	setCurrentUrl,
	setShowMatches,
	setGlobalFetching,
}) {
	const { isFetching } = useSelector(store => store.playerSearch);
	const { isFetching: matchFetching } = useSelector(store => store.matchesList);

	const onClickHandler = (e) => {
		e.preventDefault();

		setGlobalFetching(true);

		history.push({
			pathname: '/',
			search: `?nickname=${value}`
		});     

		const nicknamePURL = new URLSearchParams(search);
		const currentNick = nicknamePURL.get('nickname');

		if (currentNick !== '') {
			setShowMatches(true);
			setCurrentUrl(currentNick)
		}

		setValue('');
	}    

	const onChangeHandler = (e) => {
		setValue(e.target.value);
	} 

	return (
		<header className="header">
			<div className="header__container">
				<Link to="/home" className="header__logo">
					<img src={logo} alt="" className="header__logo" />
				</Link>               
				<form className="header__form" onSubmit={onClickHandler}>
					<input
						autoComplete="off"
						autoCorrect="off"
						spellCheck="false"
						type="text" 
						value={value}
						className="header__input" 
						placeholder="Enter nickname..."
						onChange={onChangeHandler} 
					/>
					<button 
						disabled={isFetching || matchFetching || value === ''}
						type="submit"
						className="header__btn-search btn"
					>
						<FontAwesomeIcon icon={faSearch} />
					</button>                        
				</form>
			</div>
		</header>
	);
}

Header.propTypes = {
	search: PropTypes.string,
	history: PropTypes.object,
	value: PropTypes.string,
	setValue: PropTypes.func,
	setCurrentUrl: PropTypes.func,
	setShowMatches: PropTypes.func,
	setGlobalFetching: PropTypes.func,
}

export default Header;
