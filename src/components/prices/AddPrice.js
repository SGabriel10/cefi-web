


import React,{useEffect,useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import {uiCloseModal} from "../../actions/ui";
import {useForm} from "../../hooks/useForm";
import {priceClearActive, priceCreate, priceStartLoading, priceUpdated} from "../../actions/price";

const initForm = {
    descripcion: '',
    precio: '',
    duracion: '',
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




const AddPrice= () => {

    const dispatch= useDispatch();
    const {modalOpen} = useSelector(state=>state.ui );
    const {activePrice} = useSelector(state=> state.price);
    //const {categories} = useSelector(state=> state.category);
    const [values,handleInputChange,reset,setValues] = useForm(initForm);
    const {descripcion,precio,duracion} = values;
   // const [selected, setSelected] = useState(Object.values(categories)[0]);




    useEffect(() => {
        if(activePrice){
            setValues(activePrice);
        }else{
            setValues(initForm);
        }
    }, [activePrice,setValues]);







    const closeModal=()=>{
        dispatch(uiCloseModal());
        dispatch(priceClearActive());
        dispatch(priceStartLoading());
        reset();
    }


/*const handleSelectChange=(e)=>{
    setSelected(e.target.value);
}*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        //let arreglo = selected.split(",");
        if(activePrice){
            dispatch(priceUpdated(values));
        }else{

            dispatch(priceCreate({
                ...values,
             //categoria: {_id: arreglo[0], descripcion: arreglo[1]}
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
                                <h4>{activePrice? 'Editar': 'Agregar'} Precio</h4>
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
                                <label>Precio</label>
                                <input type="text" name="precio" onChange={handleInputChange} value={precio} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Duracion</label>
                                <input type="text" name="duracion" onChange={handleInputChange} value={duracion} className="form-control" />
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

export default AddPrice;

