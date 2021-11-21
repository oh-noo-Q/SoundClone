import { Link } from 'react-router-dom';
import Button from "./Button";

const Header = ({ background }) => {
    return (
        <div className='header'>
            <div className='header-img'>
                <img src={background} alt='Background SoundClone' className='img-background' />
            </div>
            <div className='header-signin'>
                <Link to='/login'>
                    <Button text='Sign in' />
                </Link>
                <Link to='register'>
                    <Button text='Create account' />
                </Link>
            </div>
        </div>
    )
}

export default Header
