import React from 'react';
import { Link } from 'react-router-dom';

import '../../assets/scss/header.scss';

import logo from '../../logo.png';

function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <Link to="/faceit-metric/">
                    <img src={logo} alt="" className="header__logo" />
                </Link>
            </div>
        </header>
    );
}

export default Header;
