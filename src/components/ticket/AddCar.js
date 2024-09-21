


import React,{useEffect,useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import {uiCloseModal} from "../../actions/ui";
import {useForm} from "../../hooks/useForm";
import {carClearActive, carStartLoading, carUpdated} from "../../actions/parking";

const initForm = {
    nro_chapa: '',
}

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        height                : '90%',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');




const AddCar= () => {

    const dispatch= useDispatch();
    const {modalOpen} = useSelector(state=>state.ui );
    const {activeCar} = useSelector(state=> state.parking);
    const [values,handleInputChange,reset,setValues] = useForm(initForm);
    const {nro_chapa} = values;
   // const [selected, setSelected] = useState(Object.values(categories)[0]);




    useEffect(() => {
        if(activeCar){
            setValues(activeCar);
        }else{
            setValues(initForm);
        }
    }, [activeCar,setValues]);







    const closeModal=()=>{
        dispatch(uiCloseModal());
        dispatch(carClearActive());
        dispatch(carStartLoading());
        reset();
    }


/*const handleSelectChange=(e)=>{
    setSelected(e.target.value);
}*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        //let arreglo = selected.split(",");
        if(activeCar){
            dispatch(carUpdated(values));
        }

        reset();
        dispatch(uiCloseModal());

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
                                <h4>{activeCar? 'Editar': 'Agregar'} Carro</h4>
                            </div>

                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>Nro. Chapa</label>
                                <input type="text" name="nro_chapa" onChange={handleInputChange} value={nro_chapa} className="form-control" />
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

export default AddCar;

