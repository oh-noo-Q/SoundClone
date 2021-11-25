import React from 'react';

import PropTypes from 'prop-types';

const ButtonVolume = ({ onClick, muted }) => {
    return (
        <button onClick={onClick} id='volume' className={`action-btn ${muted}`}></button>
    )
}

ButtonVolume.propTypes = {
    onClick: PropTypes.func,
}

export default ButtonVolume
