import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import '../../assets/scss/footer.scss';

function Footer() {
    library.add(fab);
    const vk = findIconDefinition({ prefix: 'fab', iconName: 'vk'});

    const onClickHandler = (e, newPageUrl) => {
        e.preventDefault();
        window.open(newPageUrl, "_blank")
    }
    
    return (
        <footer className="footer">
            <div>
                <a target="_blank" rel="noopener noreferrer" href="https://vk.com/iph9x" 
                onClick={(e) => onClickHandler(e, 'https://vk.com/iph9x')}>
                    <FontAwesomeIcon icon={vk} />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
