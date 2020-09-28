import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getPlayerIdThunkCreator } from '../../redux/player/actions';
import { getMatchesThunkCreator } from '../../redux/match/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import Preloader from '../../components/Preloader/Preloader';
import PlayerCard from '../../components/PlayerCard/PlayerCard';

import MatchList from '../../components/MatchList/MatchList';
import MatchItem from '../../components/MatchItem/MatchItem';

import { calcStatsForNGames } from '../../assets/js/utils';
import AvgStatItem from '../../components/AvgStatItem/AvgStatItem';

import '../../assets/scss/select.scss';

function Main() {
    const dispatch = useDispatch();

    const {playerStats, isFetching, error} = useSelector(store => store.playerSearch);
    const {allMatches, isFetching: matchFetching} = useSelector(store => store.matchesList);
    const {playerAvatar, skill_level, faceit_elo, nickname, playerId} = useSelector(store => store.playerSearch.playerInfo);
    
    const { search } = useLocation();   
    const history = useHistory();

    const [value, setValue] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');

    // Array of elements-matches
    const [matchesArr, setMatchesArr] = useState([]);

    const [listSize, setListSize] = useState(20);
    const [maxElo, setMaxElo] = useState(0);

    // Array of last matches
    const [matches, setMatchesBySize] = useState(null);


    // Get player info if url change
    useEffect(() => {
        const nicknamePURL = new URLSearchParams(search);
        const currentNick = nicknamePURL.get("nickname");

        if (currentNick) {
            setCurrentUrl(currentNick)
            dispatch(getPlayerIdThunkCreator(currentNick));
        }       
    }, [dispatch, search]);    

    // Get allMatches after getting player info
    useEffect(() => {
        if (playerId && playerStats.m1) {
            dispatch(getMatchesThunkCreator(playerId, playerStats.m1));
        }
    }, [dispatch, playerId, playerStats]);

    // Slice allMatches
    useEffect(() => {
        if (allMatches) {
            if (allMatches.length < listSize) {
                setListSize(allMatches.length);
                setMatchesBySize(allMatches);
            } else {
                const newArrFull = [...allMatches];
                const newArr = newArrFull.slice(0, listSize);
    
                setMatchesBySize(newArr);
            }

        }
    }, [allMatches, listSize]);

    // Find max elo
    // Mapping matches list
    useEffect(() => {
        
        let maxEloArr = [];
        if (matches && allMatches) {

            for (let i = 0; i < allMatches.length; i += 1) {
                maxEloArr[i] = Number.parseInt(allMatches[i].elo);
            }
            const maxEloReturn = maxEloArr.filter(item => !(Number.isNaN(item)) );
            setMaxElo(Math.max(...maxEloReturn));
        }
        if (matches && allMatches) {
            let eloArr = [];
            
            for (let i = 0; i < listSize; i += 1) {
                if (allMatches[i + 1]) {
                    eloArr[i] = allMatches[i].elo - allMatches[i + 1].elo;
                }
            }           

            const arrOfElMatches = matches.map((match, index) => {
                const bgClass = classNames({
                    match__item: true,
                    'match__win': match.i10 === '1',
                    'match__lose': match.i10 === '0'
                });
                
                return ( <MatchItem
                    key={match.matchId}
                    matchId={match.matchId}
                    bgClass={bgClass}
                    map={match.i1}
                    team={match.i5}
                    score={match.i18}
                    kd={match.c2}
                    hs={match.c4}
                    frags={match.i6}
                    assists={match.i7}
                    deaths={match.i8}
                    date={match.created_at}
                    elo={match.elo}
                    eloDif={eloArr[index]}
                />)                
            });

            setMatchesArr(arrOfElMatches);
        }
    // eslint-disable-next-line
    }, [allMatches, listSize, matches])

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
                        <button type="submit" className="main__btn-search btn">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        <div className="select">
                            <select defaultValue={listSize} onChange={onSizeChangeHandler} className="main__select" >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={40}>40</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                       </div>
                    </form>
                    {!isFetching && currentUrl && nickname && (error && nickname.toLowerCase() !== currentUrl.toLowerCase()) 
                    && (<div>Player {currentUrl} not found</div>)}
                    
                    {(isFetching || matchFetching) &&
                    <Preloader />
                    }
                    <div className="player-cards">
                        {playerStats && !error && currentUrl && !isFetching && !matchFetching && nickname.toLowerCase() === currentUrl.toLowerCase() 
                        &&(                    
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
                        )}
                        {matches && !error && currentUrl && !isFetching && !matchFetching && nickname.toLowerCase() === currentUrl.toLowerCase() 
                        && (                    
                        <AvgStatItem
                            gamesCount={listSize}
                            matches={calcStatsForNGames(matches)}
                        />
                        )}
                    </div>
                </div>                
                {matches && !error && currentUrl && !isFetching && !matchFetching && nickname.toLowerCase() === currentUrl.toLowerCase() 
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
