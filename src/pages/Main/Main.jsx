import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types'; 
import classNames from 'classnames';

import { getSearchResultThunkCreator, clearState } from '../../redux/player/actions';
import { getMatchesThunkCreator } from '../../redux/match/actions';

import Preloader from '../../components/Preloader/Preloader';
import PlayerCard from '../../components/PlayerCard/PlayerCard';
import MatchList from '../../components/MatchList/MatchList';
import MatchItem from '../../components/MatchItem/MatchItem';
import LineChart from '../../components/LineChart/LineChart';
import AvgStatItem from '../../components/AvgStatItem/AvgStatItem';
import CheckRoom from '../../components/CheckRoom/CheckRoom';
import Comparison from '../../components/Comparison/Comparison';

import { calcStatsForNGames, getMaxElo, getSlicedMatchList } from '../../assets/js/utils';

import '../../assets/scss/select.scss';

function Main({
	search,
	currentUrl,
	setCurrentUrl,
	showMatches,
	setShowMatches,
	globalFetching,
	setGlobalFetching
}) {
	const dispatch = useDispatch();

	const { playerStats, isFetching, error } = useSelector(store => store.playerSearch);
	const { allMatches, isFetching: matchFetching } = useSelector(store => store.matchesList);
	const { 
		playerAvatar,
		skill_level,
		faceit_elo,
		nickname,
		playerId,
	} = useSelector(store => store.playerSearch.playerInfo);

	/** Array of elements-matches */
	const [matchesArr, setMatchesArr] = useState([]);

	const [eloArr, setEloArr] = useState([]);
	const [KDArr, setKDArr] = useState([]);
	const [fragsArr, setFragsArr] = useState([]);
	
	/** Array of matches dates */
	const [numsChart, setNumsChart] = useState([]);

	const [listSize, setListSize] = useState(20);
	const [maxElo, setMaxElo] = useState(0);
	const [startEloPlus, setStartEloPlus] = useState(0);

	/** Array of last matches */
	const [matches, setMatchesBySize] = useState(null);
	
	/** Manage Components */
	const [showProfile, setProfile] = useState(true);
	const [showChart, setShowChart] = useState(false);
	const [showCompare, setShowCompare] = useState(false);

	/** Compare Nick  */
	const [currentNickSec, setCurrentNickSec] = useState(null);

	const [matchId, setMatchId] = useState('');
	const [mainIncreasing, setMainIncreasing] = useState('');

	/** Checking if input value and response nickname match */
	const searchAndNickMatch = () => {
			return nickname.toLowerCase() === currentUrl.toLowerCase();
	} 

	/** Get player info if url change */
	useEffect(() => {
		if (search !== '') setGlobalFetching(true);
		if (search === '') {
			dispatch(clearState());
			setShowMatches(true);
		}

		setMatchesBySize(null);
		setProfileComponent();
	// eslint-disable-next-line
	}, [dispatch, search])

	useEffect(() => {
		const nicknamePURL = new URLSearchParams(search);
		const currentNick = nicknamePURL.get('nickname');

		if (currentNick !== '') {
			if (currentNick !== currentUrl) setCurrentUrl(currentNick);

			setShowMatches(true);
			dispatch(getSearchResultThunkCreator(currentNick));
		}          
		setMatchesBySize(null);
	// eslint-disable-next-line
	}, [dispatch, search]);    

	/** Get allMatches after getting player info */
	useEffect(() => {        
		if (playerStats && !isFetching) {
			dispatch(getMatchesThunkCreator(playerId, playerStats.m1));
		}
	// eslint-disable-next-line
	}, [dispatch, playerId]);

	/** Set Max elo */
	useEffect(() => {
		if (allMatches) {  
			setMaxElo(getMaxElo(allMatches));

			if (allMatches.length >= listSize) {
				setStartEloPlus(allMatches[listSize - 1].elo - allMatches[listSize].elo);
			}
		}
	// eslint-disable-next-line
	}, [allMatches, listSize])

	/** Slice allMatches for calc detailed stat */
	useEffect(() => {        
		if (allMatches && !matchFetching) {
			setMatchesBySize(getSlicedMatchList(allMatches, listSize));
		}
		// eslint-disable-next-line
	}, [allMatches, listSize]);


	/** Getting elo array and correct dates */
	const getEloArrAndDates = (eloArr) => {
		let currentEloArr = [];
		let currentKDArr = [];
		let currrentFragsArr = [];
		let nums = [];

		const getFilteredArr = (arr) => {
			return arr.filter((item) => item !== null).reverse()
		}

		for (let i = 0; i < listSize; i += 1) {
			if (allMatches[i + 1]) {
				eloArr[i] = allMatches[i].elo - allMatches[i + 1].elo;

				if (allMatches[i].elo !== undefined) {
					currentEloArr[i] = allMatches[i].elo; 
					currentKDArr[i] = allMatches[i].c2; 
					currrentFragsArr[i] = allMatches[i].i6; 

					nums[i] = i + 1;
				} else {
					currentEloArr[i] = null; 
					currentKDArr[i] = null;
					currrentFragsArr[i] = null;

					nums[i] = null;
				}
			}
		}

		setFragsArr(getFilteredArr(currrentFragsArr));
		setEloArr(getFilteredArr(currentEloArr));
		setKDArr(getFilteredArr(currentKDArr));

		setNumsChart(nums.filter((item) => item !== null).reverse());
	}

	/** Mapping matches list */
	useEffect(() => {        
		if (matches && allMatches) {
			let eloArr = [];

			getEloArrAndDates(eloArr);

			const arrOfElMatches = matches.map((match, index) => {
				return ( 
					<MatchItem
						key={match.matchId + index}
						match={match}
						eloDif={eloArr[index]}
						setMatchId={setMatchId}
						setShowMatches={setShowMatches} 
					/>
				);
			});

			setMatchesArr(arrOfElMatches);
		}
	// eslint-disable-next-line
	}, [listSize, matches]);

	/** Calc elo increasing */
	useEffect(() => {
		if (matches && currentUrl && nickname && searchAndNickMatch() && !isFetching) {
			setMainIncreasing(startEloPlus
				? Number.parseInt(calcStatsForNGames(matches).eloDif) + Number.parseInt(startEloPlus)
				: calcStatsForNGames(matches).eloDif
			);

			setGlobalFetching(false);
		}
	// eslint-disable-next-line
	}, [matches])

	const onSizeChangeHandler = (e) => {
		setListSize(Number.parseInt(e.target.value));
	} 

	const setProfileComponent = () => {
		setProfile(true);
		setShowChart(false);
		setShowCompare(false);
	}

	const setChartComponent = () => {
		setProfile(false);
		setShowChart(true);
		setShowCompare(false);
	}

	const setComparisonComponent = () => {
		setProfile(false);
		setShowChart(false);
		setShowCompare(true);
	}

	const btnNavClassProfile = classNames({
		btn: true,
		'main__nav-btn': true,
		'main__nav-btn_active': showProfile,
	});

	const btnNavClassChart = classNames({
		btn: true,
		'main__nav-btn': true,
		'main__nav-btn_active': showChart,
	});

	const btnNavClassCompare = classNames({
		btn: true,
		'main__nav-btn': true,
		'main__nav-btn_active': showCompare,
	});

	const isRenderMain = playerStats 
		&& matches 
		&& !error 
		&& nickname
		&& currentUrl
		&& searchAndNickMatch()
		&& !globalFetching;

	const isRenderPreloader = (globalFetching
		|| isFetching)
		&& !error
		&& currentUrl;

	const isRenderPlayerNotFound = 
		(!globalFetching 
		&& !isFetching
		&& currentUrl
		&& !nickname
		&& search)
		|| (!globalFetching
		&& !isFetching
		&& currentUrl
		&& nickname
		&& !searchAndNickMatch())
		|| error;

	const isRenderChart = showChart
		&& playerStats 
		&& matches
		&& !error
		&& nickname
		&& searchAndNickMatch()
		&& !isFetching 
		&& !matchFetching;

	const isRenderProfile = showProfile
		&& playerStats
		&& matches
		&& !error
		&& nickname
		&& searchAndNickMatch()
		&& !globalFetching
		&& !isFetching
		&& currentUrl
		&& !matchFetching;

	const isRenderMatchList = matches
		&& !showCompare
		&& !error
		&& nickname
		&& currentUrl
		&& searchAndNickMatch()
		&& !isFetching
		&& !matchFetching
		&& showMatches;

	const isRenderCheckRoom = !showMatches
		&& matchId
		&& !globalFetching
		&& !showCompare;

	return (
		<main className="main">
			<div className="main__container container">
				<div className="main__info-box">   
					{isRenderMain &&
						<div className="main__nav-wrapper">
							<div className="main__nav-buttons">
								<button className={btnNavClassProfile} onClick={setProfileComponent}>
									Profile
								</button>
								<button className={btnNavClassChart} onClick={setChartComponent}>
									Charts
								</button>
								<button className={btnNavClassCompare} onClick={setComparisonComponent}>
									Compare
								</button>
							</div>
							{!showProfile &&
								<div>
									<span className="main__nav-label">
										Player:
									</span>
									{nickname}
								</div>
							}
							<div className="select-wrapper">
								<span className="main__nav-label">
									Count of last matches:
								</span>
								<div className="select">
									<select 
										value={listSize} 
										onChange={onSizeChangeHandler}
										className="main__select" 
									>
										<option value={10}>10</option>
										<option value={20}>20</option>
										<option value={30}>30</option>
										<option value={40}>40</option>
										<option value={50}>50</option>
										<option value={100}>100</option>
									</select>
								</div>
							</div>
						</div>
					}
					{isRenderPreloader && <Preloader />}
					{isRenderPlayerNotFound && <div>Player {currentUrl} not found</div>}  
					{isRenderChart && 
						<LineChart 
							eloArr={eloArr}
							numsChart={numsChart}
							KDArr={KDArr}
							fragsArr={fragsArr}
						/>
					}
					{isRenderProfile &&                   
						<div className="player-cards">
							<PlayerCard
								maxElo={maxElo}
								nickname={nickname}
								avatar={playerAvatar}
								level={skill_level}
								elo={faceit_elo}
								matches={playerStats.m1}
								kd={playerStats.k5}
								hs={playerStats.k8}
								winRate={playerStats.k6}
							/>
							<AvgStatItem
								gamesCount={allMatches.length < listSize ? allMatches.length : listSize}
								matches={calcStatsForNGames(matches)}
								mainIncreasing={mainIncreasing}
							/>
						</div>
					}
					{showCompare && 
						<Comparison
							listSize={listSize}
							mainMatches={calcStatsForNGames(matches)}
							mainMaxElo={maxElo}
							mainNickname={nickname}
							mainAvatar={playerAvatar}
							mainLevel={skill_level}
							mainElo={faceit_elo}
							mainPlayerStats={playerStats}
							mainStartEloPlus={startEloPlus}
							setProfile={setProfile}
							mainIncreasing={mainIncreasing}
							currentNick={currentNickSec}
							setCurrentNick={setCurrentNickSec}
						/>
					}
				</div>
				{isRenderMatchList &&
					<MatchList
						matches={matches}
						matchesArr={matchesArr}
					/>               
				}
				{isRenderCheckRoom &&
					<CheckRoom 
						roomId={matchId}
						setShowMatches={setShowMatches} 
					/>
				}
			</div>
		</main>
	);
}

Main.propTypes = {
	search: PropTypes.string,
	currentUrl: PropTypes.string,
	setCurrentUrl: PropTypes.func,
	showMatches: PropTypes.bool,
	setShowMatches: PropTypes.func,
	globalFetching: PropTypes.bool,
	setGlobalFetching: PropTypes.func,
}

export default Main;
