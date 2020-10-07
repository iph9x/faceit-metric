import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { getPlayerIdThunkCreator, clearState } from '../../redux/player/actions';
import { getMatchesThunkCreator } from '../../redux/match/actions';

import Preloader from '../../components/Preloader/Preloader';
import PlayerCard from '../../components/PlayerCard/PlayerCard';
import MatchList from '../../components/MatchList/MatchList';
import MatchItem from '../../components/MatchItem/MatchItem';
import LineChart from '../../components/LineChart/LineChart';
import AvgStatItem from '../../components/AvgStatItem/AvgStatItem';
import CheckRoom from '../../components/CheckRoom/CheckRoom';
import Comparison from '../../components/Comparison/Comparison';

import { calcStatsForNGames, secToDate, getMaxElo, getSlicedMatchList } from '../../assets/js/utils';

import '../../assets/scss/select.scss';

function Main({
    search,
	currentUrl,
	setCurrentUrl,
	showMatches,
	setShowMatches,
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
    
    // GLOBAL FETCHING
    const [globalFetching, setGlobalFetching] = useState(false);

    // Array of elements-matches
    const [matchesArr, setMatchesArr] = useState([]);

    const [eloArr, setEloArr] = useState([]);

    // Array of match date
    const [numsChart, setNumsChart] = useState([]);

    const [listSize, setListSize] = useState(20);
    const [maxElo, setMaxElo] = useState(0);
    const [startEloPlus, setStartEloPlus] = useState(0);

    // Array of last matches
    const [matches, setMatchesBySize] = useState(null);
    
    // Manage Components
    const [showProfile, setProfile] = useState(true);
    const [showChart, setShowChart] = useState(false);
    const [showCompare, setShowCompare] = useState(false);

    // const [showMatches, setShowMatches] = useState(true);
    const [matchId, setMatchId] = useState('');
    const [mainIncreasing, setMainIncreasing] = useState('');

    const searchAndNickMatch = () => {
        return nickname.toLowerCase() === currentUrl.toLowerCase();
    } 

    // Get player info if url change
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
            dispatch(getPlayerIdThunkCreator(currentNick));
        }          
    // eslint-disable-next-line
    }, [dispatch, search]);    

    // Get allMatches after getting player info
    useEffect(() => {        
        if (playerStats && !isFetching) {
            dispatch(getMatchesThunkCreator(playerId, playerStats.m1));
        }
    // eslint-disable-next-line
    }, [dispatch, playerId]);

    // Set Max elo
    useEffect(() => {
        if (allMatches) {  
            setMaxElo(getMaxElo(allMatches));

            if (allMatches.length >= listSize) {
                setStartEloPlus(allMatches[listSize - 1].elo - allMatches[listSize].elo);
            }
        }
    // eslint-disable-next-line
    }, [allMatches, listSize])

    // Slice allMatches
    useEffect(() => {        
        if (allMatches && !matchFetching) {
            setMatchesBySize(getSlicedMatchList(allMatches, listSize));
        }
        // eslint-disable-next-line
    }, [allMatches, listSize]);

    // Mapping matches list. Create DOM matches
    useEffect(() => {        
        if (matches && allMatches) {            
            let eloArr = [];
            let currentEloArr = [];
            let nums = [];

            for (let i = 0; i < listSize; i += 1) {
                if (allMatches[i + 1]) {
                    eloArr[i] = allMatches[i].elo - allMatches[i + 1].elo;

                    if (allMatches[i].elo !== undefined) {
                        currentEloArr[i] = allMatches[i].elo; 
                        nums[i] = secToDate(allMatches[i].created_at);
                    } else {
                        currentEloArr[i] = null; 
                        nums[i] = null;
                    }
                }
            }

            setEloArr(currentEloArr.filter((item) => item !== null).reverse());
            setNumsChart(nums.filter((item) => item !== null).reverse());

            const arrOfElMatches = matches.map((match, index) => {
                return ( <MatchItem
                    key={match.matchId + index}
                    match={match}
                    eloDif={eloArr[index]}
                    setMatchId={setMatchId}
                    setShowMatches={setShowMatches} 
                />)                
            });

            setMatchesArr(arrOfElMatches);
        }
    // eslint-disable-next-line
    }, [listSize, matches]);

    useEffect(() => {
        if (matches) {
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

    const isRenderPreloader = globalFetching
        && !error
        && currentUrl;

    const isRenderPlayerNotFound = 
        (!globalFetching 
        && currentUrl
        && !nickname
        && search)
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
                                    Chart
                                </button>
                                <button className={btnNavClassCompare} onClick={setComparisonComponent}>
                                    Compare
                                </button>
                            </div>
                            <div><span className="main__nav-label">Current player:</span> {nickname}</div>
                            <div className="select-wrapper">
                                <span className="main__nav-label">Count of last games:</span>
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
                    {isRenderChart && <LineChart eloArr={eloArr} numsChart={numsChart} />}
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

export default Main;
