import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { apiUrl } from '../../contexts/Constants';
import { changeDataSongs } from '../../redux/reducers/dataSongsReducer';
import Button from "./Button";

const Content = () => {
    const dispatch = useDispatch();

    const getDefaultSongs = async () => {
        const songsFromServer = await axiosDefaultSongs();
    
        // redux
        dispatch(changeDataSongs(songsFromServer));
      }
    
      // axios default songs
      const axiosDefaultSongs = async () => {
        try {
          const response = await axios.get(`${apiUrl}/song/getDefault`);
          if (response.data.success) {
            return response.data.songs;
          }
        } catch (err) {
          if (err.response.data) {
            return err.response.data;
          }
          return {
            success: false,
            message: 'Something wrong :((('
          }
        }
      }

    return (
        <div className='content'>
            <div className='content-defautl-songs'>
                <p className='default-songs-title'>Hear what’s default for free in the SoundClone community</p>
            </div>
            <div className='button-default-songs'>
                <Button text='Default Songs' onClick={getDefaultSongs} />
            </div>
        </div>
    )
}

export default Content
