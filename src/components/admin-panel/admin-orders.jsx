import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import orderService from "../services/order-service";

function AdminOrders() {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [orderData, setOrderData] = useState([]);
    let orders = [];

    // Will run once after component load
    useEffect(() => {
        getOrderData();
    }, []);

    function getOrderData() {
        // Go to the server || dispatch an action
        orderService.getAllOrders()
            .then(res => {
                // Handle successful fetch of data
                const fetchedOrders = [];
                res.data.map(order => {
                    fetchedOrders.push(order);
                });
                setOrderData(fetchedOrders);

            }).catch(error => {
                // Handle errors
                if (error.message) {
                    console.log(error.message);
                }
            })
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function getTableRows() {
        orderData.forEach((order => {
            let date = (new Date(Date.parse(order.created)).toString());
            let orderItems = [];
            order.orderItems.forEach((item)=>{
                orderItems.push(item);
            })
            orders.push({
                id: order.id,
                username: order.user.username,
                shippingAddress: order.shippingAddress,
                placed: date.slice(0, date.indexOf("(")),
                items: order.orderItems.length,
                totalPrice: numberWithCommas(parseFloat(order.totalPrice).toFixed(2)),
                edit: <button className="btn btn-primary" type="btn">Edit</button>,
                delete: <button className="btn btn-primary" type="btn">Delete</button>
            })
        }))
        return orders;
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
                label: 'User',
                field: 'username',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Shipping Address',
                field: 'shippingAddress',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Date Placed',
                field: 'placed',
                sort: 'asc',
                width: 80
            },
            {
                label: 'No. of Items',
                field: 'items',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Total Price(€)',
                field: 'totalPrice',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Edit',
                field: 'edit',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Delete',
                field: 'delete',
                sort: 'asc',
                width: 100
            }
        ],
        rows: getTableRows()
    };

    return (
        <>
        <h3 className="text-center mt-3">Order history</h3>
        <MDBDataTable responsive
            striped
            bordered
            hover
            data={data}
        />
            <div className="container d-flex justify-content-end">
                <button className="btn btn-primary w-10" type='btn'>Add order</button>
            </div>
        </>
    );
}



export default AdminOrders;



