import { Link } from 'react-router-dom';
import Button from "./Button"

const SignupTeaser = () => {
    return (
        <div className='signup-teaser'>
            <div className='signup-teaser-title'>Thanks for listening. Now join in.</div>
            <div className='signup-teaser-after-title'>Save tracks, follow artists and build playlists. All for free.</div>
            <div> (thực ra vẫn chưa được đâu huhuhu) </div>
            <div className='signup-teaser-button'>
                <Link to='register'>
                    <Button text='Create account' />
                </Link>
            </div>
        </div>
    )
}

export default SignupTeaser
