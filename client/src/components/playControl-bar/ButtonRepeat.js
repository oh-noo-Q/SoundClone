import PropTypes from 'prop-types';

const ButtonRepeat = ({ onClick }) => {
    return (
        <button onClick={onClick} id='repeat' className='action-btn'></button>
    )
}

ButtonRepeat.propTypes = {
    onClick: PropTypes.func,
}

export default ButtonRepeat
