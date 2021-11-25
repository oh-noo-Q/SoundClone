import axios from 'axios';
import React, { useState } from 'react';
import { apiUrl } from '../../contexts/Constants';
import { useDispatch } from 'react-redux';
import { changeDataSongs } from '../../redux/reducers/dataSongsReducer';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const SearchHeader = () => {

    const [searchForm, setSearchForm] = useState({
        titleSearch: ''
    });

    const { titleSearch } = searchForm;

    // redux
    const dispatch = useDispatch();

    // navigate
    const navigate = useNavigate();

    // search songs
    const searchSongs = async searchForm => {
        try {
            const response = await axios.post(`${apiUrl}/song/search`, searchForm);
            if (response.data.success) {
                return response.data.songs;
            }
            return response.data;
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

    const onChangeSearchForm = event => setSearchForm({ ...searchForm, titleSearch: event.target.value });

    const search = async event => {
        event.preventDefault();
        try {
            const searchData = await searchSongs(searchForm);

            // redux
            dispatch(changeDataSongs(searchData));
            setSearchForm({ titleSearch: '' });

            navigate('/search');

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='header-others-search'>
            <span>
                <form className='search-bar' onSubmit={search}>
                    <input className='header-others-search-input' type='search' placeholder='Search for tracks' value={titleSearch} onChange={onChangeSearchForm} />
                    <button className='search-submit' type='submit' ></button>
                </form>
            </span>
        </div>
    )
}

export default SearchHeader
