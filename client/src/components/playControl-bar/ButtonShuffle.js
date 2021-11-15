import PropTypes from 'prop-types';

const ButtonShuffle = ({ onClick }) => {
    return (
        <button onClick={onClick} id='shuffle' className='action-btn'></button>
    )
}

ButtonShuffle.propTypes = {
    onClick: PropTypes.func,
}

export default ButtonShuffle
