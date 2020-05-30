import React from 'react';
//import facebookIcon from '../../shared/icons/facebook.svg'

function SocialMediaIcon(props) {
    const style = {
        height: "2.5rem",
        width: "2.5rem"
    }

    return (
        <object data={props.icon} style={style} className={props.className} aria-label="social icons"></object>
    )
}

export default SocialMediaIcon;



