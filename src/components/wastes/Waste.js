import React, {useEffect} from 'react';
import {uiOpenModal} from "../../actions/ui";
import {useDispatch} from "react-redux";
import AddWaste from './AddWaste';
import GetWastes from './GetWastes';

const Waste = () => {

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
                            <h4>Egresos</h4>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary btn-sm float-end" onClick={handleModal}>Agregar Egreso</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <GetWastes/>
                </div>
            </div>
            <AddWaste/>
        </div>
    );
};

export default Waste;
