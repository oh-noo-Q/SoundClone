import React, { useState } from 'react';

const MusicItem = (props) => {
  const { urlImg, name, genre, audioSrc } = props;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="musicItemContainer">
      <img
        className="musicItemUrl"
        width={180}
        height={180}
        src={urlImg}
        alt="img"
      />
      <h5 className="musicItemName">{name}</h5>
      <h5 className="musicItemGenre">{genre}</h5>
      <audio src={audioSrc} />
    </div>
  );
};

export default MusicItem;
