import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faVk, faSteam } from '@fortawesome/free-brands-svg-icons';

import './Footer.scss';

function Footer() {
  library.add(faVk, faSteam);

  const onClickHandler = (e, newPageUrl) => {
    e.preventDefault();
    window.open(newPageUrl, "_blank");
  }
  
  return (
    <footer className="footer">
      <a 
        target="_blank" 
        rel="noopener noreferrer"
        href="https://vk.com/iph9x"
        onClick={(e) => onClickHandler(e, 'https://vk.com/iph9x')}
      >
          <FontAwesomeIcon icon={faVk} />
      </a>
      <a 
        target="_blank" 
        rel="noopener noreferrer"
        href="https://steamcommunity.com/tradeoffer/new/?partner=154007278&token=CLTGO42o"
        onClick={(e) => onClickHandler(e, 'https://steamcommunity.com/tradeoffer/new/?partner=154007278&token=CLTGO42o')}
      >
          <FontAwesomeIcon icon={faSteam} />
      </a>
    </footer>
  );
}

export default Footer;
