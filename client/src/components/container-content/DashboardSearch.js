import { useState } from "react"

const DashboardSearch = ({ searchDataSongs }) => {
    const listSongsSearch = searchDataSongs.map((song) => <li className='songItems'>{song.title}</li>)
    console.log(listSongsSearch);
    return (
        <div className='displaySongsSearch'>
            <ul className='listSongsSearch'>
                {listSongsSearch}
            </ul>
        </div>

    )
}

export default DashboardSearch
