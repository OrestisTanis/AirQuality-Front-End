import React from 'react';
import img from './img/O1.png';

function CompanyFeature2(props){
  return(
    <div className={props.className}>
        <img src = {img}/>
        <h5>Ορέστης Τάνης</h5>
        <p>Ο χαρισματικός μας Ορέστης έχει κλήση στον προγραμματισμό. Μπορεί να
           αφιερώνει ώρες στον κώδικα, ωστόσο χρειάζεται κάποιες ώρες να κλείνει τα
           ματάκια του.</p>
    </div>
  );
}


export default CompanyFeature2;
