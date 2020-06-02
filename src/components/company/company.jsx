import React from 'react';
import CompanyFeature from './company-feature';
import CompanyFeature2 from './company-feature2';
import CompanyFeature3 from './company-feature3';
import './company.css';

function Company() {
  return (
    <>
      <p className="text-center" style={{paddingTop: '10rem'}}>Company</p>

      <div className="container-fluid">
        <div className="row text-center mt-5 mb-5 d-flex justify-content-center">
          <CompanyFeature className="mt-5 mb-5" />
          <CompanyFeature className="mt-5 mb-5" />
          <CompanyFeature className="mt-5 mb-5" />
          <CompanyFeature className="mt-5 mb-5" />


          <CompanyFeature className="col-12 col-md-4 mt-5 mb-5" />
          <CompanyFeature2 className="col-12 col-md-4 mt-5 mb-5" />
          <CompanyFeature3 className="col-12 col-md-4 mt-5 mb-5" />
        </div>
      </div>

    </>
  )
}

export default Company;
