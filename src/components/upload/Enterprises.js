import React from 'react';
import {GetEnterprises} from "./GetEnterprises";

const Enterprises = () => {
    const handleEmpresa = ()=>{
        
    }
    return (
        <div className="content-wrapper">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-10">
                            <h4>Empresas</h4>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary btn-sm float-end" onClick={handleEmpresa}>Agregar Empresa</button>
                        </div>

                    </div>
                </div>
                <div className="card-body">
                    <GetEnterprises/>
                </div>
            </div>
        </div>
    );
};

export default Enterprises;