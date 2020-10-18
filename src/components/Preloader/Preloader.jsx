import React from 'react';

import '../../assets/scss/preloader.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Preloader() {
  return (
    <div className="preloader-wrapper">
      <div className="preloader">
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    </div>
  );
}

export default Preloader;
