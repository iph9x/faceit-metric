import React from 'react';

function MatchList({
    matches,
    matchesArr
}) {
    return (       
        <div className="match__wrapper">
            {matches && (
                <div className="match__item-titles">
                    <div>map</div>
                    <div>team</div>
                    <div>score</div>
                    <div>k/d</div>
                    <div>hs, %</div>
                    <div>stat</div>
                    <div>date</div>
                    <div>elo</div>
                </div>
            )}
            {matches &&  matchesArr}
        </div>           
    );
}

export default MatchList;
