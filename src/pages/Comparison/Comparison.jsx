import React  from 'react';
import { useSelector } from 'react-redux';
import '../../assets/scss/comparison.scss';

function Comparison() {
    const { nickname, playerId } = useSelector(store => store.playerSearch.playerInfo);

    return (
        <section className="main">
            <div className="container">
                <div className="comparison">
                    <div>
                        {playerId}
                    </div>
                    <div>
                        {nickname}
                    </div>
                    so far empty :(
                </div>
            </div>
        </section>
    );
}

export default Comparison;
