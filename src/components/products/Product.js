import React from 'react';
import AddUser from "../users/AddUser";
import {uiOpenModal} from "../../actions/ui";
import {useDispatch} from "react-redux";
import GetProducts from "./GetProducts";
import AddProduct from "./AddProduct";

const Product = () => {

    const dispatch = useDispatch();

    const handleModal=()=>{
        dispatch(uiOpenModal());
    }

    return (
        <div className="container ml-250">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-10">
                            <h4>Productos</h4>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary btn-sm float-end" onClick={handleModal}>Agregar Producto</button>
                        </div>

                    </div>
                </div>
                <div className="card-body">
                    <GetProducts/>
                </div>
            </div>
            <AddProduct/>
        </div>
    );
};

export default Product;
