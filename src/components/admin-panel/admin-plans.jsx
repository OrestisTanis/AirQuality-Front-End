import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import planService from "../services/plan-service";

function AdminPlans() {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [planData, setPlanData] = useState([]);
    let plans = [];

    // Will run once after component load
    useEffect(() => {
        getPlanData();
    }, []);

    function getPlanData() {
        // Go to the server || dispatch an action
        planService.getAllPlans()
            .then(res => {
                // Handle successful fetch of data
                const fetchedPlans = [];
                res.data.map(plan => {
                    fetchedPlans.push(plan);
                });
                setPlanData(fetchedPlans);

            }).catch(error => {
                // Handle errors
                if (error.message) {
                    // console.log(error.message);
                }
            })
    }

    function getTableRows() {
        planData.forEach((plan => {
            plans.push({
                id: plan.id,
                title: plan.title,
                label: plan.label,
                pricePerMonth: plan.pricePerMonth,
                date: <button className="btn btn-primary" type="btn">Edit</button>,
                salary: <button className="btn btn-primary" type="btn">Delete</button>
            })
        }))
        return plans;
    }

    const data = {
        columns: [
            {
                label: 'ID',
                field: 'id',
                sort: 'asc',
                width: 150
            },
            {
                label: 'title',
                field: 'title',
                sort: 'asc',
                width: 270
            },
            {
                label: 'label',
                field: 'label',
                sort: 'asc',
                width: 200
            },
            {
                label: 'price/mo(€)',
                field: 'pricePerMonth',
                sort: 'asc',
                width: 80
            },
            {
                label: 'Edit',
                field: 'date',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Delete',
                field: 'salary',
                sort: 'asc',
                width: 100
            }
        ],
        rows: getTableRows()
    };

    return (
        <>
        <h3 className="text-center mt-3">User Plans</h3>
        <MDBDataTable responsive
            striped
            bordered
            hover
            data={data}
        />
            <div className="container d-flex justify-content-end">
                <button className="btn btn-primary w-10" type='btn'>Add plan</button>
            </div>
        </>
    );
}



export default AdminPlans;



