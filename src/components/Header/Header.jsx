import React from 'react';
import { Link } from 'react-router-dom';

import '../../assets/scss/header.scss';

function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <Link to="/faceit-metric/"><h1>FACEIT METRIC</h1></Link>
            </div>
        </header>
    );
}

export default Header;
