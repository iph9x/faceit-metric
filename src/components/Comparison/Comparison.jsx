import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import Preloader from '../Preloader/Preloader';

import { setSecondPlayerThunkCreator } from '../../redux/player/actions';
import { getSecMatchesThunkCreator } from '../../redux/match/actions';

import { calcStatsForNGames, getMaxElo, getSlicedMatchList } from '../../assets/js/utils';

import '../../assets/scss/comparison.scss';

function Comparison({ 
    listSize,
    mainMatches,
    mainMaxElo,
    mainNickname,
    mainAvatar,
    mainLevel,
    mainElo,
    mainPlayerStats
 }) {
    const [value, setValue] = useState('')
    const [currentNick, setCurrentNick] = useState(null)
    const [matches, setMatches] = useState(null)
    const [maxElo, setMaxElo] = useState(0);
    const [localFetching, setLocalFetching] = useState(false);


    const dispatch = useDispatch();

    const {secondPlayerStats, secondPlayerIsFetching: isFetching, secError } = useSelector(store => store.playerSearch);
    const { playerAvatar,
            skill_level,
            faceit_elo,
            nickname,
            playerId
        } = useSelector(store => store.playerSearch.secondPlayerInfo);
    const {secMatches, secMatchesIsFetching: matchFetching } = useSelector(store => store.matchesList);

    useEffect(() => {        
        if (secondPlayerStats && !isFetching) {
            dispatch(getSecMatchesThunkCreator(playerId, secondPlayerStats.m1));
        }
        if (!nickname) {
            setLocalFetching(false);
        }
    // eslint-disable-next-line
    }, [dispatch, playerId]);

    // Set Max elo
    useEffect(() => {
        if (secMatches) {  
            setMaxElo(getMaxElo(secMatches));
        }
    }, [secMatches])

    // Slice allMatches
    useEffect(() => {        
        if (secMatches && !matchFetching) {
            setMatches(calcStatsForNGames(getSlicedMatchList(secMatches, listSize)))
        }
    // eslint-disable-next-line
    }, [secMatches, listSize]);

    useEffect(() => {        
        if (matches) {
            setLocalFetching(false);
        }
    // eslint-disable-next-line
    }, [matches]);

    const compareStat = (a, b) => {
        return classNames({
           "kd-high": Number.parseFloat(a) > Number.parseFloat(b),
           "kd-low": Number.parseFloat(a) < Number.parseFloat(b),
       });
    }

    const onClickHandler = (e) => {
        e.preventDefault();  
        if (value !== '') { dispatch(setSecondPlayerThunkCreator(value)) }

        setLocalFetching(true);
        setCurrentNick(value);
        setValue('');
    }    

    const handleChange = (e) => {
        setValue(e.target.value);
    }

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
                <button type="submit" className="header__btn-search btn">Compare</button>
            </form>
            {localFetching && !matches && !secError && <Preloader />}
            {((!localFetching && currentNick && !nickname) || secError) 
            && <span className="not-found">Player {currentNick} not found</span>} 
            {secondPlayerStats && !isFetching && matches &&
                <div className="comparison__wrapper">
                    <div className="player-cards player-cards__header">
                        
                        <div className="player-card__string">
                            <div className="player-card__title">
                                Statistic for alltime
                            </div>
                            <div className="player-card">
                                <div className="player-card__nickname">{mainNickname}</div>
                                <img className="player-card__avatar" src={mainAvatar} alt=""/>
                            </div>
                            <div className="player-card">
                                <div className="player-card__nickname">{nickname}</div>
                                <img className="player-card__avatar" src={playerAvatar} alt=""/>
                            </div>
                        </div>
                       
                    </div>
                    <div className="player-card player-card__compare">
                       
                        <div className="player-card__stat-box">
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    Level: 
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainLevel, skill_level)}>
                                        {mainLevel}
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(skill_level, mainLevel)}>
                                        {skill_level}
                                    </span>
                                </div>
                            </div>
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    Elo: 
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainElo, faceit_elo)}>
                                        {mainElo}
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(faceit_elo, mainElo)}>
                                        {faceit_elo}
                                    </span>
                                </div>
                            </div>
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    Max Elo: 
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainMaxElo, maxElo)}>
                                        {mainMaxElo}
                                    </span>

                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(maxElo, mainMaxElo)}>
                                        {maxElo}
                                    </span>
                                </div>
                            </div>
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    matches: 
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainPlayerStats.m1, secondPlayerStats.m1)}>
                                        {mainPlayerStats.m1}
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(secondPlayerStats.m1, mainPlayerStats.m1)}>
                                        {secondPlayerStats.m1}
                                    </span>
                                </div>
                            </div>
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    K/D Ratio: 
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainPlayerStats.k5, secondPlayerStats.k5)}>
                                        {mainPlayerStats.k5}
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(secondPlayerStats.k5, mainPlayerStats.k5)}>
                                        {secondPlayerStats.k5}
                                    </span>
                                </div>
                            </div>
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    avg hs:
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainPlayerStats.k8, secondPlayerStats.k8)}>
                                        {mainPlayerStats.k8}%
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(secondPlayerStats.k8, mainPlayerStats.k8)}>
                                        {secondPlayerStats.k8}%
                                    </span>
                                </div>
                            </div>
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    win rate: 
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainPlayerStats.k6, secondPlayerStats.k6)}>
                                        {mainPlayerStats.k6}%
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(secondPlayerStats.k6, mainPlayerStats.k6)}>
                                        {secondPlayerStats.k6}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>    
                    <div className="player-card player-card__compare">
                        <div className="player-card__title">
                            Statistic for last {listSize} games
                        </div>
                        <div className="player-card__stat-box">
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    avg frags: 
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainMatches.avgFrags, matches.avgFrags)}>
                                        {mainMatches.avgFrags}
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(matches.avgFrags, mainMatches.avgFrags)}>
                                        {matches.avgFrags}
                                    </span>
                                </div>
                            </div>
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    K/D: 
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainMatches.kd, matches.kd)}>
                                        {mainMatches.kd}
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(matches.kd, mainMatches.kd)}>
                                        {matches.kd}
                                    </span>
                                </div>
                            </div>
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    K/R: 
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainMatches.kr, matches.kr)}>
                                        {mainMatches.kr}
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(matches.kr, mainMatches.kr)}>
                                        {matches.kr}
                                    </span>
                                </div>
                            </div>
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    avg hs:
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainMatches.hs, matches.hs)}>
                                        {mainMatches.hs}%
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(matches.hs, mainMatches.hs)}>
                                        {matches.hs}%
                                    </span>
                                </div>
                            </div>
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    win rate:
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainMatches.winrate, matches.winrate)}>
                                        {mainMatches.winrate}%
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(matches.winrate, mainMatches.winrate)}>
                                        {matches.winrate}%
                                    </span>
                                </div>
                            </div>  
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    Assists:
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainMatches.assists, matches.assists)}>
                                        {mainMatches.assists}
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(matches.assists, mainMatches.assists)}>
                                        {matches.assists}
                                    </span>
                                </div>
                            </div>                            
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    Kills:
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainMatches.frags, matches.frags)}>
                                        {mainMatches.frags}
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(matches.frags, mainMatches.frags)}>
                                        {matches.frags}
                                    </span>
                                </div>
                            </div>                            
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    Triple kills:
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainMatches.trip, matches.trip)}>
                                        {mainMatches.trip}
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(matches.trip, mainMatches.trip)}>
                                        {matches.trip}
                                    </span>
                                </div>
                            </div>                                                      
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    Quadro kills:
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainMatches.quad, matches.quad)}>
                                        {mainMatches.quad}
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(matches.quad, mainMatches.quad)}>
                                        {matches.quad}
                                    </span>
                                </div>
                            </div>                            
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    Penta kills:
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainMatches.penta, matches.penta)}>
                                        {mainMatches.penta}
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(matches.penta, mainMatches.penta)}>
                                        {matches.penta}
                                    </span>
                                </div>
                            </div>                            
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    MVPs:
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainMatches.mvps, matches.mvps)}>
                                        {mainMatches.mvps}
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(matches.mvps, mainMatches.mvps)}>
                                        {matches.mvps}
                                    </span>
                                </div>
                            </div>                            
                            <div className="player-card__string">
                                <div className="player-card__prefix">
                                    Difference Elo:
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(mainMatches.eloDif, matches.eloDif)}>
                                        {mainMatches.eloDif}
                                    </span>
                                </div>
                                <div className="player-card__postfix">
                                    <span className={compareStat(matches.eloDif, mainMatches.eloDif)}>
                                        {matches.eloDif}
                                    </span>
                                </div>
                            </div>                            
                        </div>
                    </div>                   

                </div>
            }
        </div>           
    );
}

export default Comparison;
