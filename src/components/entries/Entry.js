import React, {useEffect} from 'react';
import {uiOpenModal} from "../../actions/ui";
import {useDispatch} from "react-redux";
import AddEntry from './AddEntry';
import GetEntries from './GetEntries';

const Entry = () => {

    const dispatch = useDispatch();
    const handleModal=()=>{
        dispatch(uiOpenModal());
    }

    return (
        <div className="content-wrapper">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-10">
                            <h4>Ingresos</h4>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary btn-sm float-end" onClick={handleModal}>Agregar Ingreso</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <GetEntries/>
                </div>
            </div>
            <AddEntry/>
        </div>
    );
};

export default Entry;
