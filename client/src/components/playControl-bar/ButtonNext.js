import React from 'react';

import PropTypes from 'prop-types';

const ButtonNext = ({ onClick }) => {
    return (
        <button onClick={onClick} id='next' className='action-btn'></button>
    )
}

ButtonNext.propTypes = {
    onClick: PropTypes.func,
}

export default ButtonNext
