import React from 'react';

import PropTypes from 'prop-types';

const ButtonPlay = ({ onClick, playing }) => {
    return (
        <button onClick={onClick} id='play' className={`action-btn pause ${playing}`}></button>
    )
}

ButtonPlay.propTypes = {
    onClick: PropTypes.func,
}

export default ButtonPlay
