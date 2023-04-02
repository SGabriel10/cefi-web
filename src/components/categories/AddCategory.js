


import React,{useEffect} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import {categoryClearActive, categoryCreate, categoryStartLoading, categoryUpdated} from "../../actions/category";
import {uiCloseModal} from "../../actions/ui";
import {useForm} from "../../hooks/useForm";

const initForm = {
    descripcion: ''
}

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        height                : '40%',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');




const AddCategory = () => {

    const dispatch= useDispatch();
    const {modalOpen} = useSelector(state=>state.ui );
    const {activeCategory} = useSelector(state=> state.category);
    const [values,handleInputChange,reset,setValues] = useForm(initForm);
    const {descripcion} = values;

    useEffect(() => {
        if(activeCategory){
            setValues(activeCategory);
        }else{
            setValues(initForm);
        }
    }, [activeCategory,setValues]);





    const closeModal=()=>{
        dispatch(uiCloseModal());
        dispatch(categoryClearActive());
        reset();
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        if(activeCategory){
            dispatch(categoryUpdated(values));
        }else{
            dispatch(categoryCreate(values));
        }

        reset();
        dispatch(uiCloseModal());
        dispatch(categoryStartLoading());
    }


    return (
        <Modal
            isOpen={modalOpen}
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
                                <h4>{activeCategory? 'Editar': 'Agregar'} Categoria</h4>
                            </div>

                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>Descripcion</label>
                                <input type="text" name="descripcion" onChange={handleInputChange} value={descripcion} className="form-control" />
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

export default AddCategory;

