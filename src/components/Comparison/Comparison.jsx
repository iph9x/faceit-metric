import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types'; 

import { setSecondPlayerThunkCreator } from '../../redux/player/actions';
import { getSecMatchesThunkCreator } from '../../redux/match/actions';

import CompareField from '../CompareField/CompareField';
import Preloader from '../Preloader/Preloader';
import { calcStatsForNGames, getMaxElo, getSlicedMatchList } from '../../assets/js/utils';

import '../../assets/scss/comparison.scss';

import defaultAvatar from '../../assets/img/avatar.jpg';

function Comparison({ 
	listSize,
	mainMatches,
	mainMaxElo,
	mainNickname,
	mainAvatar,
	mainLevel,
	mainElo,
	mainPlayerStats,
	setProfile,
	mainIncreasing,
	currentNick,
	setCurrentNick,
}) {
	const [value, setValue] = useState('');
	const [matches, setMatches] = useState(null);
	const [maxElo, setMaxElo] = useState(0);
	const [localFetching, setLocalFetching] = useState(false);
	
	const [secStartEloPlus, setSecSartEloPlus] = useState(0);
	const [secIncreasing, setSecIncreasing] = useState(0);

	const history = useHistory();

	const dispatch = useDispatch();

	const {
		secondPlayerStats,
		secondPlayerIsFetching: isFetching,
		secError
	} = useSelector(store => store.playerSearch);

	const { 
		playerAvatar,
		skill_level,
		faceit_elo,
		nickname,
		playerId,
	} = useSelector(store => store.playerSearch.secondPlayerInfo);

	const { 
		secMatches,
		secMatchesIsFetching: matchFetching 
	} = useSelector(store => store.matchesList);

	useEffect(() => {        
		if (secondPlayerStats && !isFetching) {
			dispatch(getSecMatchesThunkCreator(playerId, secondPlayerStats.m1));
		}

		if (!isFetching && !nickname) setLocalFetching(false);
	// eslint-disable-next-line
	}, [dispatch, playerId]);
	
	// Set Max elo
	useEffect(() => {
		if (secMatches) {  
			setMaxElo(getMaxElo(secMatches));
			
			if (secMatches.length >= listSize) {
				setSecSartEloPlus(secMatches[listSize - 1].elo - secMatches[listSize].elo);
			}
		}
	// eslint-disable-next-line
	}, [secMatches, listSize])

	// Slice allMatches
	useEffect(() => {        
		if (secMatches && !matchFetching) {
			setMatches(calcStatsForNGames(getSlicedMatchList(secMatches, listSize)));  
		} 
	// eslint-disable-next-line
	}, [secMatches, listSize]);

	useEffect(() => {        
		if (matches) {
			setSecIncreasing(secStartEloPlus
				? Number.parseInt(matches.eloDif) + Number.parseInt(secStartEloPlus) 
				: matches.eloDif);
		}
	// eslint-disable-next-line
	}, [matches]);

	useEffect(() => {        
		if (matches) setLocalFetching(false);
	// eslint-disable-next-line
	}, [matches]);

	const onClickHandler = (e) => {
		e.preventDefault();  
		setLocalFetching(true);

		if (value !== '') dispatch(setSecondPlayerThunkCreator(value));

		setMatches(null);
		setCurrentNick(value);
		setValue('');
	}    

	const handleChange = (e) => {
		setValue(e.target.value);
	}

	const setNewPlayer = (nickname) => {
		history.push({
			pathname: '/',
			search: `?nickname=${nickname}`
		});

		setProfile(true);
	}

	const nickIsValid = () => {
		return nickname.toLowerCase() === currentNick.toLowerCase()
	} 

	const isRenderPreloader = localFetching
		&& mainNickname.toLowerCase() !== currentNick.toLowerCase()
		&& !secError;

	const isRenderPlayerNotFound = 
		(!localFetching 
		&& currentNick
		&& !nickname
		&& !matches)
		|| (!localFetching
		&& currentNick 
		&& nickname
		&& !nickIsValid())
		|| secError;
	
	const isRenderStat = secondPlayerStats
		&& !isFetching
		&& matches
		&& currentNick
		&& nickname !== mainNickname
		&& nickIsValid();

	return (        
		<div className="comparison">
			<form onSubmit={onClickHandler} className="header__form" >
				<input 
					autoComplete="off"
					autoCorrect="off"
					spellCheck="false"
					type="text" 
					placeholder="Enter nickname..."
					className="header__input"
					value={value}
					onChange={handleChange} 
				/>
				<button type="submit" disabled={value === ''} className="header__btn-search btn">
					Compare
				</button>
			</form>
			{isRenderPreloader && <Preloader />}
			{isRenderPlayerNotFound && 
				<span className="not-found">
					Player {currentNick} not found
				</span>
			} 
			{nickname === mainNickname && <span className="not-found">Select another player</span>}
			{isRenderStat &&
				<div className="comparison__wrapper">
					<div className="player-cards player-cards__header">                        
						<div className="player-card__string">
							<div className="player-card__title">
								Statistic for alltime
							</div>
							<div className="player-card">
								<span className="player-card__nickname">
									{mainNickname}
								</span>
								<img className="player-card__avatar" src={mainAvatar || defaultAvatar} alt=""/>
							</div>
							<div className="player-card  player-card__link" onClick={() => setNewPlayer(nickname)}>
								<span className="player-card__nickname">
									{nickname}
								</span>
								<img className="player-card__avatar" src={playerAvatar || defaultAvatar} alt=""/>
							</div>
						</div>                       
					</div>
					<div className="player-card player-card__compare">                       
						<div className="player-card__stat-box">
							<CompareField 
								label="Level" 
								parMain={mainLevel} 
								parSec={skill_level}
								unit="" 
							/>
							<CompareField 
								label="Elo" 
								parMain={mainElo} 
								parSec={faceit_elo}
								unit="" 
							/>
							<CompareField 
								label="Max Elo" 
								parMain={mainMaxElo} 
								parSec={maxElo}
								unit="" 
							/>
							<CompareField 
								label="Matches" 
								parMain={mainPlayerStats.m1} 
								parSec={secondPlayerStats.m1}
								unit="" 
							/>
							<CompareField 
								label="K/D Ratio" 
								parMain={mainPlayerStats.k5} 
								parSec={secondPlayerStats.k5}
								unit="" 
							/>
							<CompareField 
								label="avg hs" 
								parMain={mainPlayerStats.k8} 
								parSec={secondPlayerStats.k8}
								unit="%" 
							/>
							<CompareField 
								label="win rate" 
								parMain={mainPlayerStats.k6} 
								parSec={secondPlayerStats.k6}
								unit="%" 
							/>
						</div>
					</div>    
					<div className="player-card player-card__compare">
						<div className="player-card__title">
							Statistic for last {listSize} games
						</div>
						<div className="player-card__stat-box">
							<CompareField 
								label="avg frags" 
								parMain={mainMatches.avgFrags} 
								parSec={matches.avgFrags}
								unit="" 
							/>
							<CompareField 
								label="K/D" 
								parMain={mainMatches.kd} 
								parSec={matches.kd}
								unit="" 
							/>
							<CompareField 
								label="K/R" 
								parMain={mainMatches.kr} 
								parSec={matches.kr}
								unit="" 
							/>
							<CompareField 
								label="avg hs" 
								parMain={mainMatches.hs} 
								parSec={matches.hs}
								unit="%" 
							/>
							<CompareField 
								label="win rate" 
								parMain={mainMatches.winrate} 
								parSec={matches.winrate}
								unit="%" 
							/>
							<CompareField 
								label="Assists" 
								parMain={mainMatches.assists} 
								parSec={matches.assists}
								unit="" 
							/>
							<CompareField 
								label="Kills" 
								parMain={mainMatches.frags} 
								parSec={matches.frags}
								unit="" 
							/>
							<CompareField 
								label="Triple kills" 
								parMain={mainMatches.trip} 
								parSec={matches.trip}
								unit="" 
							/>
							<CompareField 
								label="Quadro kills" 
								parMain={mainMatches.quad} 
								parSec={matches.quad}
								unit="" 
							/>
							<CompareField 
								label="Penta kills" 
								parMain={mainMatches.penta} 
								parSec={matches.penta}
								unit="" 
							/>
							<CompareField 
								label="MVPs" 
								parMain={mainMatches.mvps} 
								parSec={matches.mvps}
								unit="" 
							/>
							<CompareField 
								label="Elo Diff" 
								parMain={mainIncreasing > 0 ? '+' + Number.parseInt(mainIncreasing) : mainIncreasing}
								parSec={secIncreasing > 0 ? '+' + Number.parseInt(secIncreasing) : secIncreasing}
								unit="" 
							/>                            
						</div>
					</div>
				</div>
			}
		</div>           
	);
}

Comparison.propTypes = {
	listSize: PropTypes.number,
	mainMatches: PropTypes.object,
	mainMaxElo: PropTypes.number,
	mainNickname: PropTypes.string,
	mainAvatar: PropTypes.string,
	mainLevel: PropTypes.number,
	mainElo: PropTypes.number,
	mainPlayerStats: PropTypes.object,
	setProfile: PropTypes.func,
	mainIncreasing: PropTypes.number,
	currentNick: PropTypes.string,
	setCurrentNick: PropTypes.func,
}

export default Comparison;
