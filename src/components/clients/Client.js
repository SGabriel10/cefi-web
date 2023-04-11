import React from 'react';
import {useDispatch} from "react-redux";
import {uiOpenModal} from "../../actions/ui";
import {GetClients} from "./GetClients";
import AddClient from "./AddClient";


const Client = () => {
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
                            <h4>Clientes</h4>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary btn-sm float-end" onClick={handleModal}>Agregar Cliente</button>
                        </div>

                    </div>
                </div>
                <div className="card-body">
                    <GetClients/>
                </div>
            </div>
            <AddClient/>
        </div>
    );
};

export default Client;
