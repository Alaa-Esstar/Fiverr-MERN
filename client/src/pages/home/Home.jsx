import React from 'react'
import "./Home.scss"
import Featured from '../../components/featured/Featured'
import TrustedBy from '../../components/trustedBy/TrustedBy'
import Slide from '../../components/Slide/Slide'

const Home = () => {
    return (
        <div className='home'>
            <Featured />
            <TrustedBy />
            <Slide />
        </div>
    )
}
<br />

export default Home