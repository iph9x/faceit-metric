import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames';

import { getPlayerIdThunkCreator } from '../../redux/player/actions';
import { getMatchesThunkCreator } from '../../redux/match/actions';

import Preloader from '../../components/Preloader/Preloader';
import PlayerCard from '../../components/PlayerCard/PlayerCard';
import MatchList from '../../components/MatchList/MatchList';
import MatchItem from '../../components/MatchItem/MatchItem';
import LineChart from '../../components/LineChart/LineChart';
import AvgStatItem from '../../components/AvgStatItem/AvgStatItem';

import { calcStatsForNGames, secToDate } from '../../assets/js/utils';

import '../../assets/scss/select.scss';
import Comparison from '../Comparison/Comparison';

function Main() {
    const dispatch = useDispatch();

    const {playerStats, isFetching, error} = useSelector(store => store.playerSearch);
    const {allMatches, isFetching: matchFetching} = useSelector(store => store.matchesList);
    const { playerAvatar,
            skill_level,
            faceit_elo,
            nickname,
            playerId
        } = useSelector(store => store.playerSearch.playerInfo);
    
    const { search } = useLocation();   
    const history = useHistory();
    
    // GLOBAL FETCHING
    const [globalFetching, setGlobalFetching] = useState(false);

    const [value, setValue] = useState('');
    const [currentUrl, setCurrentUrl] = useState(null);

    // Array of elements-matches
    const [matchesArr, setMatchesArr] = useState([]);

    const [eloArr, setEloArr] = useState([]);
    // Array of match date
    const [numsChart, setNumsChart] = useState([]);

    const [listSize, setListSize] = useState(20);
    const [maxElo, setMaxElo] = useState(0);

    // Array of last matches
    const [matches, setMatchesBySize] = useState(null);
    
    // Manage Components
    const [showProfile, setProfile] = useState(true);
    const [showChart, setShowChart] = useState(false);
    const [showCompare, setShowCompare] = useState(false);

    const searchAndNickMatch = () => {
        return nickname.toLowerCase() === currentUrl.toLowerCase();
    } 

    // Get player info if url change
    useEffect(() => {
        setGlobalFetching(true);
    }, [search])

    useEffect(() => {
        const nicknamePURL = new URLSearchParams(search);
        const currentNick = nicknamePURL.get("nickname");

        if (currentNick) {
            setCurrentUrl(currentNick);
            dispatch(getPlayerIdThunkCreator(currentNick));
        }       
    }, [dispatch, search]);    

    // Get allMatches after getting player info
    useEffect(() => {        
        if (playerStats && !isFetching) {
            dispatch(getMatchesThunkCreator(playerId, playerStats.m1));
        }
    // eslint-disable-next-line
    }, [dispatch, playerId]);


    // Find max elo
    useEffect(() => {
        if (allMatches) {  
            let maxEloArr = [];

            for (let i = 0; i < allMatches.length; i += 1) {
                maxEloArr[i] = Number.parseInt(allMatches[i].elo);
            }
            const maxEloReturn = maxEloArr.filter(item => !(Number.isNaN(item)) );
            setMaxElo(Math.max(...maxEloReturn));
        }
    }, [allMatches])

    // Slice allMatches
    useEffect(() => {        
        if (allMatches && !matchFetching) {
            if (allMatches.length < listSize) {
                setMatchesBySize(allMatches);
            } else {
                const newArrFull = [...allMatches];
                setMatchesBySize(newArrFull.slice(0, listSize));
            }
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

            setEloArr(currentEloArr.filter(item => item !== null).reverse());
            setNumsChart(nums.filter(item => item !== null).reverse());

            const arrOfElMatches = matches.map((match, index) => {
                return ( <MatchItem
                    key={match.matchId + index}
                    match={match}
                    eloDif={eloArr[index]}
                />)                
            });

            setMatchesArr(arrOfElMatches);
        }
    // eslint-disable-next-line
    }, [listSize, matches]);

    useEffect(() => {
        if (matches && searchAndNickMatch()) {
            setGlobalFetching(false);
        }
    // eslint-disable-next-line
    }, [matches])

    const clickHandler = (e) => {
        e.preventDefault();

        history.push({
            pathname: '/faceit-metric/',
            search: `?nickname=${value}`
        });     

        const nicknamePURL = new URLSearchParams(search);
        const currentNick = nicknamePURL.get("nickname");

        if (currentNick) {
            setCurrentUrl(currentNick)
            dispatch(getPlayerIdThunkCreator(currentNick));
        }

        setValue('');
    }    

    const onChangeHandler = (e) => {
        setValue(e.target.value);
    } 

    const onSizeChangeHandler = (e) => {
        setListSize(Number.parseInt(e.target.value));
    } 

    const setProfileComponent = () => {
        setProfile(true)
        setShowChart(false)
        setShowCompare(false)
    }
    const setChartComponent = () => {
        setProfile(false)
        setShowChart(true)
        setShowCompare(false)
    }
    const setComparisonComponent = () => {
        setProfile(false)
        setShowChart(false)
        setShowCompare(true)
    }

    const btnNavClassProfile = classNames({
        btn: true,
        "main__nav-btn": true,
        'main__nav-btn_active': showProfile,
    });

    const btnNavClassChart = classNames({
        btn: true,
        "main__nav-btn": true,
        'main__nav-btn_active': showChart,
    });

    const btnNavClassCompare = classNames({
        btn: true,
        "main__nav-btn": true,
        'main__nav-btn_active': showCompare,
    });

    return (
        <main className="main">
            <div className="main__container container">
                <div className="main__info-box">
                    <form className="main__form" onSubmit={clickHandler}>
                        <input
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            type="text" 
                            value={value}
                            className="main__input" 
                            placeholder="Enter nickname..."
                            onChange={onChangeHandler} 
                        />
                        <button 
                            // disabled={globalFetching}
                            type="submit"
                            className="main__btn-search btn"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
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
                    </form>
                    {playerStats && matches && !error && nickname &&  searchAndNickMatch()
                    && !isFetching && !matchFetching
                    && (<div className="main__nav-wrapper">
                        <button className={btnNavClassProfile} onClick={setProfileComponent}>
                            Profile
                        </button>
                        <button className={btnNavClassChart} onClick={setChartComponent}>
                            Chart
                        </button>
                        <button className={btnNavClassCompare} onClick={setComparisonComponent}>
                            Compare
                        </button>
                    </div>)}
                    {(globalFetching && !error && currentUrl) &&
                    <Preloader />
                    }
                    {/* {console.log(globalFetching, currentUrl, nickname,  nickname && searchAndNickMatch())} */}
                    {((!globalFetching && nickname && !searchAndNickMatch()) || error)
                    && (<div>Player {currentUrl} not found</div>)}                    
                    {showChart && playerStats && matches && !error
                    && nickname && searchAndNickMatch() && !isFetching && !matchFetching
                    && <LineChart eloArr={eloArr} numsChart={numsChart} />
                    }
                    {showProfile && playerStats && matches && !error && nickname && searchAndNickMatch()
                    && !isFetching && !matchFetching
                    &&(                    
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
                        />
                    </div>
                    )}
                    {showCompare && <Comparison />}
                </div>                
                {matches && !error && nickname && searchAndNickMatch() && !isFetching
                && !matchFetching 
                && (
                    <MatchList
                        matches={matches}
                        matchesArr={matchesArr}
                    />               
                )}
            </div>
        </main>
    );
}

export default Main;
