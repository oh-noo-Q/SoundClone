import Button from "./Button";

const Header = ({ background }) => {
    return (
        <div className='header'>
            <div className='header-img'>
                <img src={background} alt='Background SoundClone' className='img-background' />
            </div>
            <div className='header-signin'>
                <Button text='Sign in' />
                <Button text='Create account' />
            </div>
        </div>
    )
}

export default Header
