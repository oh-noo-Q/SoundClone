import React from 'react';

import Button from "./Button"

const Content = ({ onPlayDefaultSongs }) => {
    return (
        <div className='content'>
            <div className='content-defautl-songs'>
                <p className='default-songs-title'>Hear what’s default for free in the SoundClone community</p>
            </div>
            <div className='button-default-songs'>
                <Button text='Default Songs' onClick={onPlayDefaultSongs} />
            </div>
        </div>
    )
}

export default Content
