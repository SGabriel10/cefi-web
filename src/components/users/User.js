import React from 'react';
import {GetUsers} from "./GetUsers";
import {useDispatch} from "react-redux";
import {uiOpenModal} from "../../actions/ui";
import AddUser from "./AddUser";

const User = () => {
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
                            <h4>Usuarios</h4>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary btn-sm float-end" onClick={handleModal}>Agregar Usuario</button>
                        </div>

                    </div>
                </div>
                <div className="card-body">
                    <GetUsers/>
                </div>
            </div>
            <AddUser/>
        </div>
    );
};

export default User;
