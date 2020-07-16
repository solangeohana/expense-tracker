import React from 'react'
import { Link } from 'react-router-dom'

function HomeLink() {
    const imgUrl = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.kXtXUsToVeLBGAK3Z2Jn6wAAAA%26pid%3DApi&f=1'

    return (
        
            <Link to={'/'}>
                <img src={imgUrl} alt="home" height="40px" />
            </Link>
        
    )
}

export default HomeLink;

