


import React,{useEffect} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import {userClearActive, userCreate, userStartLoading, userUpdated} from "../../actions/users";
import {uiCloseModal} from "../../actions/ui";
import {useForm} from "../../hooks/useForm";
import Swal from "sweetalert2";

const initForm = {
    name: '',
    email: '',
    password: ''
}

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');




const AddUser = () => {

    const dispatch= useDispatch();
    const {modalOpen} = useSelector(state=>state.ui );
    const {activeUser} = useSelector(state=> state.user);
    const [values,handleInputChange,reset,setValues] = useForm(initForm);
    const {name,email,password} = values;

    useEffect(() => {
        if(activeUser){
            setValues(activeUser);
        }else{
            setValues(initForm);
        }
    }, [activeUser,setValues]);





    const closeModal=()=>{
        dispatch(uiCloseModal());
        dispatch(userClearActive());
        reset();
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        if(activeUser){
            dispatch(userUpdated(values));
           // setFormValues(activeUser);
           // console.log("editando");
        }else{
            Swal.fire('Usuario Creado',{},'success');
            dispatch(userCreate(values));
        }

        reset();
        dispatch(uiCloseModal());
        dispatch(userStartLoading());
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
                                <h4>Agregar Usuario</h4>
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
                                <label>Email</label>
                                <input type="text" name="email" onChange={handleInputChange} value={email} className="form-control" />
                            </div>

                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input type="password" name="password" onChange={handleInputChange} value={password} className="form-control" />
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

export default AddUser;
