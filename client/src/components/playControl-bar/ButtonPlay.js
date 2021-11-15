import PropTypes from 'prop-types';

const ButtonPlay = ({ onClick }) => {
    return (
        <button onClick={onClick} id='play' className='action-btn pause'></button>
    )
}

ButtonPlay.propTypes = {
    onClick: PropTypes.func,
}

export default ButtonPlay
