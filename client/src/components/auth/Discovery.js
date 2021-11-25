import React, { useState, useContext } from 'react';
import Footer from '../container-content/Footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../contexts/AuthContext';
import avatarGeneral from '../../assets/SoundcloneLogo.png';
import { LOCAL_STORAGE_FULLNAM } from '../../contexts/Constants';
import PlayBarVersion2 from '../playControl-bar/PlayBarVersion2';

const Discovery = () => {

    const { uploadSongs } = useContext(AuthContext);

    // upload song
    const [uploadForm, setUploadForm] = useState({
        song: '',
        title: '',
        genre: '',
    });

    const [notificationUpload, setNotificationUpload] = useState((<div></div>));

    const { song, title, genre } = uploadForm;

    const onChangeFileForm = event => setUploadForm({ ...uploadForm, song: event.target.files[0] });

    const onChangeTitleForm = event => setUploadForm({ ...uploadForm, title: event.target.value });

    const onChangeGenreForm = event => setUploadForm({ ...uploadForm, genre: event.target.value });

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
                    <div className=''></div>
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
