import React, { useState, useContext } from 'react';
import Footer from '../container-content/Footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../../contexts/AuthContext';
import avatarGeneral from '../../assets/SoundcloneLogo.png';
import { LOCAL_STORAGE_FULLNAM } from '../../contexts/Constants';
import { changeUserSongs, userSongsSelector } from '../../redux/reducers/userSongsReducer';
import { changeDataSongs } from '../../redux/reducers/dataSongsReducer';

const Discovery = () => {

    const { uploadSongs, getUserSongs } = useContext(AuthContext);

    // upload song
    const [uploadForm, setUploadForm] = useState({
        song: '',
        title: '',
        genre: '',
    });

    // redux
    const dispatch = useDispatch();

    const [notificationUpload, setNotificationUpload] = useState((<div></div>));

    const [noTracks, setNoTracks] = useState('');

    const { song, title, genre } = uploadForm;

    const onChangeFileForm = event => setUploadForm({ ...uploadForm, song: event.target.files[0] });

    const onChangeTitleForm = event => setUploadForm({ ...uploadForm, title: event.target.value });

    const onChangeGenreForm = event => setUploadForm({ ...uploadForm, genre: event.target.value });

    // upload
    const upload = async event => {
        event.preventDefault();
        const uploadData = await uploadSongs(uploadForm);
        if (uploadData.success) {
            setUploadForm({
                song: '',
                title: '',
                genre: '',
            });
            setNotificationUpload((
                <div className='upload-success'>{uploadData.message}</div>
            ));
            setTimeout(() => setNotificationUpload((<div></div>)), 5000);

        } else {
            setNotificationUpload((
                <div className='upload-fail'>{uploadData.message}</div>
            ));
            setTimeout(() => setNotificationUpload((<div></div>)), 5000);
        }
    }

    // get user's tracks
    const userSongs = async () => {
        const userSongsData = await getUserSongs();
        if (userSongsData.lenth > 0) {
            setNoTracks("You have no song. Let's upload your own!");
        }

        // redux
        dispatch(changeUserSongs(userSongsData));
    }

    const playAllUserSongs = async () => {
        const userSongsData = await getUserSongs();

        // redux
        dispatch(changeDataSongs(userSongsData));
    }

    const playThisSong = async index => {
        const userSongsData = await getUserSongs();

        // redux
        const thisSong = [userSongsData[index]];
        dispatch(changeDataSongs(thisSong));
    }

    const userSongsData = useSelector(userSongsSelector);
    const listUserSongs = userSongsData.map(song => <div className='btn-user-songs'><Button onClick={playThisSong(userSongsData.indexOf(song))}>{song.title}</Button></div>);

    return (
        <>
            <div className='container-discover'>
                <div className='discover-header-user'>
                    <div className='header-user-container'>
                        <div className='header-user-avatar'>
                            <div className='avatar-img'>
                                <img src={avatarGeneral} />
                            </div>
                        </div>
                        <div className='header-user-fullname'>
                            <div className='user-fullname'>{localStorage[LOCAL_STORAGE_FULLNAM]}</div>
                        </div>
                    </div>
                </div>

                <div className='discover-content'>
                    <div className='user-tracks'>
                        <div className='user-tracks-title'>
                            <Button variant='success' onClick={userSongs} >Your tracks</Button>
                        </div>
                        <div className='user-tracks-list'>
                            {listUserSongs.length > 0 ? <>
                                {listUserSongs}
                                <div>
                                    <Button onClick={playAllUserSongs}>Play all</Button>
                                </div>
                            </> : <h3>{noTracks}</h3>}
                        </div>
                    </div>

                    <div className='upload-songs'>
                        <div className='upload-songs-title'>Upload your songs</div>
                        <div className='upload-songs-form'>
                            <Form className='uploadSongs' onSubmit={upload}>
                                <Form.Group>
                                    <Form.Control type='file' name='song' required onChange={onChangeFileForm} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type='text' placeholder='Title' name='title' required value={title} onChange={onChangeTitleForm} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type='text' placeholder='Genre' name='genre' value={genre} onChange={onChangeGenreForm} />
                                </Form.Group>

                                <Button variant='success' type='submit' >Upload</Button>
                            </Form>

                            {notificationUpload}
                        </div>
                    </div>
                    <div className='change-account'></div>
                </div>

                <div className='discover-footer'>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Discovery
