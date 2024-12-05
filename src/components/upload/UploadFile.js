import React, { useState } from 'react';

import { fileCreate, headerCreate } from '../../actions/upload';
import { useDispatch,useSelector } from 'react-redux';
import {useForm} from "../../hooks/useForm";
import { useNavigate} from 'react-router-dom';
const initForm = {
    nombre: '',
    propietario: '',
    direccion: '',
    ruc: '',
    telefono: '',
}
const UploadFile = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch= useDispatch();
  const {id} = useSelector(state=> state.archivo);
  const [values,handleInputChange,reset,setValues] = useForm(initForm);
  const {nombre,propietario,direccion,ruc,telefono} = values;  
  const handleFileUpload = (event) =>{ 
    setSelectedFile(event.target.files[0]);
  };

  
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(fileCreate(selectedFile));
    dispatch(headerCreate({nombre,propietario,direccion,ruc,telefono,active: false},id)); 
    navigate('/empresas');
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
                                <label>Nombre de la Empresa</label>
                                <input type="text" name="nombre" onChange={handleInputChange} value={nombre} className="form-control" />
                            </div>
                           
                            <div className="form-group mb-3">
                                <label>Propietario</label>
                                <input type="text" name="propietario" onChange={handleInputChange} value={propietario} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>direccion</label>
                                <input type="text" name="direccion" onChange={handleInputChange} value={direccion} className="form-control" />
                            </div>
                            
                            <div className="form-group mb-3">
                                <label>Ruc</label>
                                <input type="text" name="ruc" onChange={handleInputChange} value={ruc} className="form-control" />
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