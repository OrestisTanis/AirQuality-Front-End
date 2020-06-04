import React from 'react';
import img from './img/petros.jpg';
import './company.css';

function CompanyFeature3(props){
  return(
    <div className="company-feature mb-5">
      <div className="mb-0 " style={{padding:'1rem', backgroundColor:'#EEEEEE', borderTopLeftRadius:'50%', borderTopRightRadius:'50%'}}>
        <div className="shadow rounded-circle" style={{ width: '20rem', height: '20rem', overflow: 'none'}}>
          <img className="rounded-circle" src={img} style={{ height: '100%', width: '100%', objectFit:'cover'}} alt=""/>
        </div>
      </div>
      <div className='pt-0 mt-0' style={{height:'20rem', backgroundColor:'#EEEEEE'}}>
      <h4>Petros Trakadas</h4><br/>
      <p className="pl-4 pr-4" style={{textAlign: 'justify'}}>Always comes with new & innovvative ideas. Decicated and a team player.</p><br/>
      <p className="pl-4 pr-4" style={{textAlign: 'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived ...</p>
      </div>
    </div>
  );
}


export default CompanyFeature3;
