import React from 'react';

import { Link } from 'react-router-dom'

const HeaderOthers = ({ littleLogo }) => {
    return (
        <div className='header-others'>
            <div className='header-others-container'>
                <div>
                    <div className='header-others-img'>
                        <img src={littleLogo} />
                    </div>
                    <div className='header-others-link-to-home'>
                        <div>
                            <Link to='/'>SOUNDCLONE</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderOthers
