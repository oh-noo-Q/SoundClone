
const Timeline = ({ timePassed, duration }) => {
    let minutePass = parseInt(timePassed / 60);
    let secondPass = parseInt(timePassed % 60);

    let minuteDur = parseInt(duration / 60);
    let secondDur = parseInt(duration % 60);

    return (
        <div className='timeline'>
            <div className='timeline-time-passed'>
                <span className='visuallyHidden'></span>
                <span className='timePassed'>{`${minutePass}:` + (secondPass < 10 ? '0' : '') + `${secondPass}`}</span>
            </div>
            <div className='timeline-progress' role='progressbar' aria-valuenow='0'>
                <div className='progressBackground'></div>
                <div className='progressBar'></div>
                <div className='progressHandle'></div>
            </div>
            <div className='timeline-duration'>
                <span className='visuallyHidden'></span>
                <span className='duration' aria-hidden='true'>{`${minuteDur}:${secondDur}`}</span>
            </div>
        </div>
    )
}

export default Timeline
