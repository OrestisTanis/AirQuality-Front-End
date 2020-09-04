import React from 'react';
import './plan.css';

function Plan(props) {
    const plan = props.plan;

    return (
        <div className={props.className}>
            <div className="plan bg-white px-4 pt-4 pb-3">
                <h2 className="pb-3 pt-3">{plan.title}</h2>
                <p className="px-3 pl-4 pr-4">{plan.description}.</p>
                <button className="btn btn-primary mt-4 mb-4">START NOW</button>
                <p className="pl-4 pr-4">{plan.label}</p>
                <hr className="mt-5 mb-5" />
                <div className="row mt-3 mb-3 d-flex justify-content-center">
                    <div className="col-10 pl-0 text-left">
                        {/* <span>{plan.feature1}</span> */}
                        <ul className="plan-list">
                            <li className="plan-list-item text-center pl-4">{plan.feature1}</li>
                            <li className="mt-3 plan-list-item text-center pl-4">{plan.feature2}</li>
                            {plan.feature3 && <li className="mt-3 plan-list-item text-center pl-4">{plan.feature3}</li>}
                        </ul>
                    </div>
                </div>
                {/* <div className="row mt-3 mb-3 d-flex justify-content-center">
                    <div className="col-10 pl-0 d-flex justify-content-around">
                        <span>{plan.feature2}</span>
                    </div>
                </div>
                <div className="row mb-3 d-flex justify-content-center">
                    <div className="col-10 pl-0 d-flex justify-content-around">
                        <span>{plan.feature3}</span>
                    </div>
                </div> */}
            </div>
        </div>


    )
}

export default Plan;



