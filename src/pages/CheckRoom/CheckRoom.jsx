import React, { useState }  from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { getTeamsThunkCreator } from '../../redux/room/actions';

import Preloader from '../../components/Preloader/Preloader';

import '../../assets/scss/checkRoom.scss';
import RoomPlayerItem from '../../components/RoomPlayerItem/RoomPlayerItem';
import RoomCaptions from '../../components/RoomCaptions/RoomCaptions';

const CheckRoom = ({roomId, setShowMatches}) => {
    const dispatch = useDispatch();

    
    // const [value, setValue] = useState('');
    // const [roomId, setRoomId] = useState('');
    const [team1Roster, setTeam1Roster] = useState(null);
    const [team2Roster, setTeam2Roster] = useState(null);
    const [team1Class, setTeam1Class] = useState('');
    const [team2Class, setTeam2Class] = useState('');

    const {teamsInfo, teamsStats, isFetching} = useSelector(state => state.roomPage);

    useEffect(() => {
        if (roomId.length > 0) {
            dispatch(getTeamsThunkCreator(roomId));
        }
    }, [dispatch, roomId]);

    useEffect(() => {
        if (teamsInfo && teamsStats) {
            const team1Stats = teamsStats.teams[0].players;
            const team2Stats = teamsStats.teams[1].players;
            
            setTeam1Roster(createArr(teamsInfo.teams.faction1.roster, team1Stats));
            setTeam2Roster(createArr(teamsInfo.teams.faction2.roster, team2Stats));

            setTeam1Class(setClassForTeam(0));
            setTeam2Class(setClassForTeam(1));
        }
    // eslint-disable-next-line
    }, [teamsInfo]);

    const setClassForTeam = (i) => {
        return classNames({
            "room__team": true,
            "room__team-1": i === 0,
            "room__team-2": i === 1,
            "room__team-loser": 
                Number.parseInt(teamsStats.teams[i === 0 ? 0 : 1].c5) < Number.parseInt(teamsStats.teams[i === 0 ? 1 : 0].c5),
            "room__team-winner": 
                Number.parseInt(teamsStats.teams[i === 0 ? 0 : 1].c5) > Number.parseInt(teamsStats.teams[i === 0 ? 1 : 0].c5)
        });
    }

    const createArr = (team, numTeamStats) => {
        return (team.map((player, i) => {
            return ( 
                <RoomPlayerItem 
                    key={player.id} 
                    setShowMatches={setShowMatches}
                    player={player} 
                    i={i} 
                    numTeamStats={numTeamStats} 
                />
            );
        }))
    };

    const parseEndTime = (str) => {
        const entTime = str.split('T');

        return `${entTime[0].slice(0)} - ${entTime[1].slice(0, -4)}`;
    }

    if (isFetching && !teamsStats) {
        return <Preloader />
    }
    if (teamsStats) {
        return (        
            <div className="room">
                <button className="btn room__btn" onClick={() => setShowMatches(true)}>
                    Show all matches
                </button>
                <div className="room__game-info">
                    <div className="room__map">
                        {teamsStats.i1}
                    </div>
                    <div className="room__score">
                        {teamsStats.teams[0].c5} - {teamsStats.teams[1].c5}
                    </div>
                    <div className="room__endtime">
                        {parseEndTime(teamsInfo.checkIn.endTime)}
                    </div>
                </div>
                <div className="room__team-wrapper">
                    <div className="room__team-header">
                        <div className="room__team-name">
                            {teamsStats.teams[0].i5}
                        </div>
                        <div className="room__score-box">
                            <div className="room__score-half">
                                FIRST HALF SCORE: {teamsStats.teams[0].i3}
                            </div>
                            <div className="room__score-half">
                                SECOND HALF SCORE: {teamsStats.teams[0].i4}
                            </div>
                            <div className="room__score-half">
                                FINAL SCORE: {teamsStats.teams[0].c5}
                            </div>
                        </div>
                    </div>
                    <RoomCaptions />
                    <div className={team1Class}>
                        {team1Roster && team2Roster &&
                            team1Roster
                        }
                    </div>
                </div>
                <div className="room__team-wrapper">
                    <div className="room__team-header">
                        <div className="room__team-name">
                            {teamsStats.teams[1].i5}
                        </div>
                        <div className="room__score-box">
                            <div className="room__score-half">
                                FIRST HALF SCORE: {teamsStats.teams[1].i3}
                            </div>
                            <div className="room__score-half">
                                SECOND HALF SCORE: {teamsStats.teams[1].i4}
                            </div>
                            <div className="room__score-half">
                                FINAL SCORE: {teamsStats.teams[1].c5}
                            </div>
                        </div>
                    </div>
                    <RoomCaptions />
                    <div className={team2Class}>
                        {team1Roster && team2Roster &&
                            team2Roster
                        }
                    </div>
                </div>          
            </div>
        );
    }
    return null;
    
}

export default CheckRoom;
