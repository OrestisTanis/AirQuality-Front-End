import React from 'react';
import img from './img/O.png';

function CompanyFeature(props){
  return(
    <div className={props.className}>
        <img src = {img}/>
        <h5>Ορέστης Παναγόπουλος</h5>
        <p>Ο Ορέστης χρησιμοποιεί την γοητεία του στην ταμεία του ΤΕΒΕ κα. Νερινα με
           απώτερο σκοπό μια υπογράφη στο μπλοκάκι.</p>
    </div>
  );
}


export default CompanyFeature;
