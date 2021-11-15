import Button from "./Button"

const SignupTeaser = () => {
    return (
        <div className='signup-teaser'>
            <div className='signup-teaser-title'>Thanks for listening. Now join in.</div>
            <div className='signup-teaser-after-title'>Save tracks, follow artists and build playlists. All for free.</div>
            <div> (thực ra vẫn chưa được đâu huhuhu) </div>
            <div className='signup-teaser-button'>
                <Button text='Create account' />
            </div>
        </div>
    )
}

export default SignupTeaser
