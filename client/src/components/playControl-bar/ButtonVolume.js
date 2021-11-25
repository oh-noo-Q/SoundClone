import React from 'react';

import PropTypes from 'prop-types';

const ButtonVolume = ({ onClick }) => {
    return (
        <button onClick={onClick} id='volume' className='action-btn'></button>
    )
}

ButtonVolume.propTypes = {
    onClick: PropTypes.func,
}

export default ButtonVolume
