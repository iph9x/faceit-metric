import React from 'react';

function Preview() {
    return (    
        <div className="preview">
            <h1 className="preview__h1">Welcome to Faceit Metric!</h1>
            <p className="preview__subtitle">You can see here: </p>
            <ul className="preview__list">
                <li>
                    &mdash;&nbsp;
                    <span className="preview__item">
                        detailed statistic of all players
                    </span>
                </li>
                <li>
                    &mdash;&nbsp;
                    <span className="preview__item">
                        statistic player for last 10-100 matches
                    </span> 
                </li>
                <li>
                    &mdash;&nbsp;
                    <span className="preview__item">
                        list of last matches
                    </span> 
                </li>
                <li>
                    &mdash;&nbsp;
                    <span className="preview__item">
                        detailed statistic of match
                    </span> 
                </li>
                <li>
                    &mdash;&nbsp;
                    <span className="preview__item">
                        comparing players
                    </span> 
                </li>
            </ul>
        </div>
    );
}

export default Preview;
