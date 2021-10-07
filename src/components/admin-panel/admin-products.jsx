import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import productService from "../services/product-service";

function AdminProducts() {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [productData, setProductData] = useState([]);
    const [productIdToDelete, setProductIdToDelete] = useState();
    const history = useHistory();
    let products = [];
    const [action, setAction] = useState("");

    // Will run once after component load
    useEffect(() => {
        getProductData();
    }, []);

    function getProductData() {
        // Go to the server || dispatch an action
        productService.getAllProducts()
            .then(res => {
                // Handle successful fetch of data
                const fetchedProducts = [];
                res.data.map(product => {
                    fetchedProducts.push(product);
                });
                setProductData(fetchedProducts);

            }).catch(error => {
                // Handle errors
                if (error.message) {
                    // console.log(error.message);
                }
            })
    }

    function getTableRows() {
        productData.forEach((prod => {
            products.push({
                id: prod.id,
                name: prod.name,
                price: prod.price,
                type: prod.productType.type,
                edit: <button className="btn btn-primary" type="btn"><Link to={`/admin/products/edit/${prod.id}`} style={{ color: "white" }}>Edit</Link></button>,
                delete: <button className="btn btn-primary" type="btn" data-toggle="modal" data-target="#adminModal" onClick={()=>{clickDelete(prod.id)}}>Delete</button>
            })
        }))
        return products;
    }

    function clickDelete(productId) {
        setAction("delete");
        setProductIdToDelete(productId);
    }

    function handleDelete() {
        productService.deleteProductById(productIdToDelete);
        const prods = productData;
        const filteredProds = prods.filter(prod => prod.id != productIdToDelete);
        setProductData(filteredProds);
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
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Type',
                field: 'type',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Price(€)',
                field: 'price',
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
            <h3 className="text-center mt-3">Products</h3>
            <MDBDataTable responsive
                striped
                bordered
                hover
                data={data}
            />
            <div className="container d-flex justify-content-end">
                <button className="btn btn-primary w-10" type='btn'><Link to={`/admin/products/add`} style={{ color: "white" }}>Add Product</Link></button>
            </div>

            {/* Admin Modal */}
            {products.map((prod, index) => {
                return <div className="modal fade" id="adminModal" tabIndex="-1" role="dialog" aria-labelledby="adminModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="adminModalLabel">Apply Changes</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>{"Are you sure you want to " + action + " this product?"}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleDelete} data-dismiss="modal" id="sign-out-button">Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </>
    );
}



export default AdminProducts;



