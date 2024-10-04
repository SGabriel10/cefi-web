import React, { useState } from 'react';

import { uploadCreate } from '../../actions/upload';
import { useDispatch } from 'react-redux';
import {useForm} from "../../hooks/useForm";

const initForm = {
    nombre: '',
    propietario: '',
    direccion: '',
    telefono: '',
}
const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch= useDispatch();
  const [values,handleInputChange,reset,setValues] = useForm(initForm);
  const {nombre,propietario,direccion,telefono} = values;  
  const handleFileUpload = (event) =>{ 
    setSelectedFile(event.target.files[0]);
  };

  
  const handleSubmit=()=>{
    dispatch(uploadCreate({empresa:{nombre,propietario,direccion,telefono},file: selectedFile}));    
  }

  return (
    <div className="content-wrapper">

      <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-10">
                                <h4> Configuracion factura</h4>
                            </div>

                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>Propietario</label>
                                <input type="text" name="propietario" onChange={handleInputChange} value={propietario} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>direccion</label>
                                <input type="text" name="direccion" onChange={handleInputChange} value={direccion} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Telefono</label>
                                <input type="text" name="telefono" onChange={handleInputChange} value={telefono} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                            <h3>Subir logo</h3>
                                <input type="file" onChange={handleFileUpload} />
                            </div>
                            <div className="form-group mb-3">
                                <button
                                    type="submit"
                                    className="btn btn-outline-primary"
                                >
                                    <i className="far fa-save"></i>
                                    <span> Guardar</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </div>
  );
};

export default UploadFile;