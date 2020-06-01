import React from 'react';
import CompanyFeature from './company-feature';
import CompanyFeature2 from './company-feature2';
import CompanyFeature3 from './company-feature3';

function Company(){
    return (
      <>
        <p>Company</p>
        <div className ="container-fluid">
          <div className = "container">
            <div className="row text-center mt-5 mb-5">
              <CompanyFeature className="col-12 col-md-4 mt-5 mb-5" />
              <CompanyFeature2 className="col-12 col-md-4 mt-5 mb-5" />
              <CompanyFeature3 className="col-12 col-md-4 mt-5 mb-5" />
            </div>
          </div>
        </div>
      </>
    )
}

export default Company;
