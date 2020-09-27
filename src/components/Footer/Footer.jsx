import React from 'react';

import '../../assets/scss/footer.scss';

function Footer() {
    const onClickHandler = (e, newPageUrl) => {
        e.preventDefault();
        window.open(newPageUrl, "_blank")
    }
    return (
        <footer className="footer">
            <div>
                by&nbsp;
                <a target="_blank" rel="noopener noreferrer" href="https://vk.com/iph9x" 
                onClick={(e) => onClickHandler(e, 'https://vk.com/iph9x')}>
                    Ivan
                </a>
            </div>
        </footer>
    );
}

export default Footer;
