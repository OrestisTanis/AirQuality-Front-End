import React from 'react';
import ApiUrlService from '../services/api-url-service';


function Data() {
    const padTop = "6rem";
    const padBot = "4rem";
    const grafanaURL = ApiUrlService.getGrafanaURL();

    return (
        <div className="container  text-center" style={{ paddingTop: padTop, marginBottom: padBot }}>
            <div className="col-xs-12 mb-4 mt-2">
                <h3>Analytics</h3></div>
            <div className="col-xs-6">
                <iframe className="embed-responsive-item" title="graph" src={grafanaURL+"/d-solo/-ai63RmGz/air-quality?orgId=1&panelId=2&refresh=10s&theme=light"} width="100%" height="300rem" frameBorder="0"></iframe>
            </div>
            <div className="row">
                <div className="col-sm mb-5">
                    <iframe className="embed-responsive-item" title="graph" src={grafanaURL+"/d-solo/-ai63RmGz/air-quality?tab=advanced&panelId=4&orgId=1&refresh=10s&theme=light"} width="100%" height="300rem" frameBorder="0"></iframe>
                </div>
                <div className="col-sm" >
                    <iframe className="embed-responsive-item" title="graph" src={grafanaURL+"/d-solo/-ai63RmGz/air-quality?tab=advanced&panelId=8&orgId=1&refresh=10s&theme=light"} width="100%" height="250rem" frameBorder="0" overflow="hidden" scrolling="no"></iframe>
                </div>
            </div>
        </div>

    )
}

export default Data;
