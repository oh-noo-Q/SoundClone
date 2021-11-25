import React from 'react';
import { useSelector } from 'react-redux';
import { dataSongsSelector } from '../../redux/reducers/dataSongsReducer';

const DashboardSearch = () => {
    const dataSearch = useSelector(dataSongsSelector);
    const listSongsSearch = dataSearch.map(song => <li className='songItems'>{song.title}</li>)

    return (
        <div className='displaySongsSearch'>
            <h2>Results...</h2>

            {dataSearch.length > 0 ? <ul className='listSongsSearch'>
                {listSongsSearch}
            </ul> : <h3>No results not found :(((</h3>}

        </div>

    )
}

export default DashboardSearch
