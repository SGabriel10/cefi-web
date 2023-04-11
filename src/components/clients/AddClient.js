


import React,{useEffect} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import {userClearActive, userCreate, userStartLoading, userUpdated} from "../../actions/users";
import {uiCloseModal} from "../../actions/ui";
import {useForm} from "../../hooks/useForm";
import {clientClearActive, clientCreate, clientStartLoading, clientUpdated} from "../../actions/client";

const initForm = {
    name: '',
    last_name: '',
    ruc: '',
    address: '',
    phone: ''
}

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        height                : '100%',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');




const AddClient = () => {

    const dispatch= useDispatch();
    const {modalOpen} = useSelector(state=>state.ui );
    const {activeClient} = useSelector(state=> state.client);
    const [values,handleInputChange,reset,setValues] = useForm(initForm);
    const {name,last_name,ruc, address, phone} = values;

    useEffect(() => {
        if(activeClient){
            setValues(activeClient);
        }else{
            setValues(initForm);
        }
    }, [activeClient,setValues]);





    const closeModal=()=>{
        dispatch(uiCloseModal());
        dispatch(clientClearActive());
        reset();
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        if(activeClient){
            dispatch(clientUpdated(values));
        }else{
            dispatch(clientCreate(values));
        }

        reset();
        dispatch(uiCloseModal());
        dispatch(clientStartLoading());
    }


    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-10">
                                <h4>{activeClient? 'Editar': 'Agregar'} Cliente</h4>
                            </div>

                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input type="text" name="name" onChange={handleInputChange} value={name} className="form-control" />
                            </div>

                            <div className="form-group mb-3">
                                <label>Apellido</label>
                                <input type="text" name="last_name" onChange={handleInputChange} value={last_name} className="form-control" />
                            </div>

                            <div className="form-group mb-3">
                                <label>Ruc</label>
                                <input type="text" name="ruc" onChange={handleInputChange} value={ruc} className="form-control" />
                            </div>

                            <div className="form-group mb-3">
                                <label>Dirección</label>
                                <input type="text" name="address" onChange={handleInputChange} value={address} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Nro de telefono</label>
                                <input type="text" name="phone" onChange={handleInputChange} value={phone} className="form-control" />
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
        </Modal>
    );
};

export default AddClient;
