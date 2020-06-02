import React from 'react';
import CompanyFeature from './company-feature';
import CompanyFeature2 from './company-feature2';
import CompanyFeature3 from './company-feature3';
import './company.css';

function Company() {
  return (
    <>
      <h3 className="text-center" style={{paddingTop: '10rem'}}>Our amazing team</h3>

      <div className="container-fluid">
        <div className="row text-center mt-5 mb-5 d-flex justify-content-center">
          <CompanyFeature className="mt-5 mb-5" />
          <CompanyFeature2 className="mt-5 mb-5" />
          <CompanyFeature3 className="mt-5 mb-5" />
        </div>
      </div>

    </>
  )
}

export default Company;
