import React from 'react';

function MatchList({
    matches,
    matchesArr
}) {
    return (       
        <div className="match__wrapper">
            {matches && (
                <div className="match__item-titles">
                    <span>map</span>
                    <span>team</span>
                    <span>score</span>
                    <span>kd</span>
                    <span>hs</span>
                    <span>K</span>
                    <span>A</span>
                    <span>D</span>
                    <span>date</span>
                    <span>elo</span>
                </div>
            )}
            {matches && matchesArr}
        </div>           
    );
}

export default MatchList;
