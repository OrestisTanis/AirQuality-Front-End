import React from 'react';
import img from './img/panago.jpg';
import './company.css';

function CompanyFeature(props){
  return(
    <div className="company-feature mb-5">
      <div className="mb-0 " style={{padding:'1rem', backgroundColor:'#EEEEEE', borderTopLeftRadius:'50%', borderTopRightRadius:'50%'}}>
        <div className="shadow rounded-circle" style={{ width: '20rem', height: '20rem', overflow: 'none'}}>
          <img className="rounded-circle" src={img} style={{ height: '100%', width: '100%', objectFit:'cover'}} />
        </div>
      </div>
      <div className='pt-0 mt-0' style={{height:'20rem', backgroundColor:'#EEEEEE'}}>
      <h5>Orestis Panagopoulos</h5>
      <p className="pl-4 pr-4" style={{textAlign: 'justify'}}>	Lorem ipsum dolor sit amet, consectetur adipisicing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  );
}


export default CompanyFeature;
