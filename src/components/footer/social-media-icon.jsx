import React from 'react';
//import facebookIcon from '../../shared/icons/facebook.svg'

function SocialMediaIcon(props) {
    const style = {
        height: "2.5rem",
        width: "2.5rem"
    }

    return (
        //<img src={facebookIcon} alt="social media icon" style={style}/>
         //<svg src={facebookIcon} alt="social media icon" style={style}/>
        <object data={props.icon} style={style} className={props.className}></object>
    )
}

export default SocialMediaIcon;



