import React from 'react';

import PropTypes from 'prop-types'; 

function CardString({ label, stat }) {
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

CardString.propTypes = {
  label: PropTypes.string, 
  stat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default CardString;
