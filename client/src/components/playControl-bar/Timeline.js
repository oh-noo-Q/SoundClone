
const Timeline = () => {
    return (
        <div className='timeline'>
            <div className='timeline-time-passed'>
                <span className='visuallyHidden'></span>
                <span className='timePassed'>0:00</span>
            </div>
            <div className='timeline-progress' role='progressbar' aria-valuenow='0'>
                <div className='progressBackground'></div>
                <div className='progressBar'></div>
                <div className='progressHandle'></div>
            </div>
            <div className='timeline-duration'>
                <span className='visuallyHidden'></span>
                <span className='duration' aria-hidden='true'>0:00</span>
            </div>
        </div>
    )
}

export default Timeline
