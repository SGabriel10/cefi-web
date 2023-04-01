import React from 'react';
import {useDispatch} from "react-redux";
import {uiOpenModal} from "../../actions/ui";
import GetCategories from "./GetCategories";
import AddCategory from './AddCategory'

const Category = () => {
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
                            <h4>Categorias</h4>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary btn-sm float-end" onClick={handleModal}>Agregar Categoria</button>
                        </div>

                    </div>
                </div>
                <div className="card-body">
                    <GetCategories/>
                </div>
            </div>
            <AddCategory/>
        </div>
    );
};

export default Category;
