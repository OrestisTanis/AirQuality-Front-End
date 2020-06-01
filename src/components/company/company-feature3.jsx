import React from 'react';
import img from './img/P.png';

function CompanyFeature3(props){
  return(
    <div className={props.className}>
        <img src = {img}/>
        <h5>Πέτρος Τρακαδάς</h5>
        <p>Ο Πέτρος γεννήθηκε στην Αθήνα και από μικρός
           έδειξε το ενδιαφέρον του για νάνους και άλογα.</p>
    </div>
  );
}


export default CompanyFeature3;
