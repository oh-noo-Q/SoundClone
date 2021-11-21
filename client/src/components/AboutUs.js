
const AboutUs = ({ aboutUsImg }) => {
    return (
        <div className='about-us'>
            <h2>Vu Quang Phong - 19020301@vnu.edu.vn</h2>
            <h2>Nguyen Minh Quyet - 19020411@vnu.edu.vn</h2>
            <p>As the new music and audio platform, SoundClone lets people discover and enjoy selection of music from the most diverse creator community on earth. This is made possible by an open platform that directly connects creators and their fans across the globe. Music and audio creators use SoundClone to both share their content with a global audience.</p>
            <p>We know that our web app is awful because of the lack of time and skill and so on... we will improve that in the future...</p>
            <p>Hope that Mrs teacher and you mates will not be very strict :(((</p>
            <p>Thank you for your visit!</p>

            <div>
                <img src={aboutUsImg} alt='sound-clone logo' className='about-img' />
            </div>
        </div>
    )
}

export default AboutUs
