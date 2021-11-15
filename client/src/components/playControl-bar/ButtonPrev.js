import PropTypes from 'prop-types';

const ButtonPrev = ({ onClick }) => {
    return (
        <button onClick={onClick} id='prev' className='action-btn'></button>
    )
}

ButtonPrev.propTypes = {
    onClick: PropTypes.func,
}

export default ButtonPrev
