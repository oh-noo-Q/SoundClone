import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../contexts/Constants';
import Button from "./Button";

const Header = ({ background }) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        return <Navigate to='/discovery' />
    }

    return (
        <div className='header'>
            <div className='header-img'>
                <img src={background} alt='Background SoundClone' className='img-background' />
            </div>
            <div className='header-signin'>
                <Link to='/login'>
                    <Button text='Sign in' />
                </Link>
                <Link to='/register'>
                    <Button text='Create account' />
                </Link>
            </div>
        </div>
    )
}

export default Header
