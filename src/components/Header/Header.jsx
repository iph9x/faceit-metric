import React from 'react';
import { Link } from 'react-router-dom';

import '../../assets/scss/header.scss';

function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <Link to="/"><h1>FACEIT METRIC</h1></Link>
                <nav className="nav">
                    <Link to="/">Results</Link>
                    <Link to="/compare">Compare</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
