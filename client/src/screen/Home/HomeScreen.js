import React, { useEffect, useState } from 'react';
import MusicItem from '../../components/MusicItem';
import { getListMusicGenre } from '../../services/API';

export const HomeScreen = () => {
  const [listGenre, setListGenre] = useState({
    code: 200,
    staus: 'success',
    data: {
      lofi: [{url: '', name: '', audio: '', genre: ''}],
      rock: [{}]
    }
  })

  const getData = async () => {
    try {
      const listGenreRes = await getListMusicGenre();
      console.log(listGenreRes)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    // Call API
    getData()
  }, [])

  const handleOnMusicClick = () => {

  }

  return (
    <div>
      <div className="topMusicRow" onClick={handleOnMusicClick}>
        {Array(5)
          .fill({})
          .map((item) => (
            <MusicItem
              urlImg={
                'https://i1.sndcdn.com/artworks-gOzt1fefWJngNU2g-2G51KQ-t500x500.jpg'
              }
              name={'Buoc qua nhau'}
              genre={'Nhac lofi'}
            />
          ))}
      </div>
    </div>
  );
};
