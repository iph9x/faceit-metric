import React from 'react';

import karambit from './karambit.svg';
import './Preloader.scss';


function Preloader() {
  return (
    <div className="preloader-wrapper">
      <div className="preloader">
        <img src={karambit} alt="loading" className="preloader__karambit" />
      </div>
    </div>
  );
}

export default Preloader;
