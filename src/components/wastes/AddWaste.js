


import React,{useEffect,useState} from 'react';
import Modal from 'react-modal';
import moment from "moment";
import DateTimePicker from 'react-datetime-picker';
import {useDispatch, useSelector} from "react-redux";
import {uiCloseModal} from "../../actions/ui";
import {useForm} from "../../hooks/useForm";
import {wasteClearActive, wasteCreate, wasteStartLoading, wasteUpdated} from "../../actions/waste";

const initForm = {
    descripcion: '',
    cantidad: '',
    fecha: '',
    //categoria: {}
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


const now = moment();

const AddWaste= () => {

    const dispatch= useDispatch();
    const {modalOpen} = useSelector(state=>state.ui );
    const {activeWaste} = useSelector(state=> state.waste);
    const [fecha, setFecha] = useState(now.toDate());
    //const {categories} = useSelector(state=> state.category);
    const [values,handleInputChange,reset,setValues] = useForm(initForm);
    const {descripcion,cantidad} = values;
   // const [selected, setSelected] = useState(Object.values(categories)[0]);




    useEffect(() => {
        if(activeWaste){
            setValues(activeWaste);
        }else{
            setValues(initForm);
        }
    }, [activeWaste,setValues]);







    const closeModal=()=>{
        dispatch(uiCloseModal());
        dispatch(wasteClearActive());
        dispatch(wasteStartLoading());
        reset();
    }


/*const handleSelectChange=(e)=>{
    setSelected(e.target.value);
}*/
    const handleDateChange = (e) => {
        setFecha(e);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        //let arreglo = selected.split(",");
        if(activeWaste){
            dispatch(wasteUpdated({...values,fecha}));
        }else{
            dispatch(wasteCreate({
                ...values,fecha
            }));
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
                                <h4>{activeWaste? 'Editar': 'Agregar'} Egreso</h4>
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
                                <label>Cantidad</label>
                                <input type="text" name="cantidad" onChange={handleInputChange} value={cantidad} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Fecha</label>
                                <DateTimePicker
                                onChange={ handleDateChange }
                                value={ fecha }
                                className="form-control pt-1 pb-1"
                            /> </div>
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

export default AddWaste;

