import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { LOCAL_STORAGE_TOKEN_NAME } from '../contexts/Constants';
import { removeUserSongs } from '../redux/reducers/userSongsReducer';
import Button from './container-content/Button';
import SearchHeader from './container-content/SearchHeader';

const HeaderOthers = ({ littleLogo }) => {

    const { logoutUser } = useContext(AuthContext);

    const navigate = useNavigate();

    // redux
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            const logoutData = await logoutUser();
            if (logoutData.success) {
                // redux
                dispatch(removeUserSongs());

                navigate('/login');
                console.log('logout done');
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (!localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
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
                        
                        <SearchHeader />

                        <div className='header-others-button'>
                            <Link to='/login'>
                                <Button text='Sign in' />
                            </Link>
                            <Link to='/register'>
                                <Button text='Create account' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

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
                    
                    <SearchHeader />

                    <div className='header-others-button'>
                        <Button text='Log out' onClick={logout} />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HeaderOthers
