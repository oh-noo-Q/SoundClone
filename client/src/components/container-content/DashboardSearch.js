import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { dataSeachSelector } from '../../redux/reducers/searchDataReducer';
import { changeDataSongs } from '../../redux/reducers/dataSongsReducer';

const DashboardSearch = () => {
    const dataSearch = useSelector(dataSeachSelector);

    const dispatch = useDispatch();

    const playThisSong = (index) => {
        const thisSong = [dataSearch[index]];
        dispatch(changeDataSongs(thisSong));
    }

    const playAllSearch = () => {
        dispatch(changeDataSongs(dataSearch));
    }

    const listSongsSearch = dataSearch.map(
        song =>
            <div className='btn-user-songs'>
                <Button onClick={() => playThisSong(dataSearch.indexOf(song))}>{song.title}</Button>
            </div>
    );

    return (
        <div className='displaySongsSearch'>
            <h2>Results...</h2>

            {dataSearch.length > 0 ? <>
                {listSongsSearch}
                <div>
                    <Button onClick={playAllSearch}>Play all</Button>
                </div>
            </> : <h3>No results not found :(((</h3>}

        </div>

    )
}

export default DashboardSearch
