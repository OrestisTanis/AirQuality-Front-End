import React from 'react';
import { ai } from '../../shared/icons/ai.svg';
import { world } from '../../shared/icons/world-coverage.svg';
import { support } from '../../shared/icons/support.svg';

function MainFeature(props) {

    return (
        <>
            <div className={props.className}>
                <img className="mx-auto mb-4" src='https://www.iqair.com/assets/img/enterprise/air-api/il-world-coverage.svg' alt="world-wide coverage icon" />
                <h5>Largest network of sensors</h5>
                <p className="text-justify">AirVisual collects data from our huge network of ground-based sensors worldwide,
               providing the most accurate and reliable air quality information </p>
            </div>
            <div className={props.className}>
                <img className="mx-auto mb-4" src="https://www.iqair.com/assets/img/enterprise/air-api/il-ai.svg" alt="artificial intelligence icon"/>
                <h5>AI-driven data validation</h5>
                <p className="text-justify">Only air quality data you can rely on. All data points are validated using
                artificial intelligence and machine learning, to ensure data integrity. </p>
            </div>
            <div className={props.className}>
                <img className="mx-auto mb-4" src='https://www.iqair.com/assets/img/enterprise/air-api/il-support.svg' alt="customer support icon" />
                <h5>Premier customer support</h5>
                <p className="text-justify">Our dedicated support team is on hand to help you quickly and seamlessly
                install, register and manage your sensors within our application.</p>
            </div>
        </>
    )
}

export default MainFeature;



