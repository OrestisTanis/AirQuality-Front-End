import React from 'react';

function Data() {
    const padTop = "6rem";
    const padBot = "4rem"
    return (
        <div class="container  text-center" style={{ paddingTop: padTop, marginBottom: padBot }}>
            <div class="col-xs-12 mb-4 mt-2">
                <h3>Analytics</h3></div>
            <div class="col-xs-6">
                <iframe class="embed-responsive-item" src="http://172.17.0.3:3000/d-solo/-ai63RmGz/air-quality?orgId=1&panelId=2&refresh=10s&theme=light" width="100%" height="300rem" frameborder="0"></iframe>
            </div>
            <div class="row">
                <div class="col-sm mb-5">
                    <iframe class="embed-responsive-item" src="http://172.17.0.3:3000/d-solo/-ai63RmGz/air-quality?tab=advanced&panelId=4&orgId=1&refresh=10s&theme=light" width="100%" height="300rem" frameborder="0"></iframe>
                </div>
                <div class="col-sm" >
                    <iframe class="embed-responsive-item" src="http://172.17.0.3:3000/d-solo/-ai63RmGz/air-quality?tab=advanced&panelId=8&orgId=1&refresh=10s&theme=light" width="100%" height="250rem" frameborder="0" overflow="hidden" scrolling="no"></iframe>
                </div>
            </div>
        </div>

    )
}

export default Data;



