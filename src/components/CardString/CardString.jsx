import React from 'react';

function CardString({label, stat}) {
    return (    
        <div className="player-card__string">
            <div className="player-card__prefix">
                {`${label}:`}
            </div>
            <div className="player-card__postfix">
                {stat}
            </div>
        </div>
    );
}

export default CardString;
