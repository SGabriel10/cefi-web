


import React,{useEffect,useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import {uiCloseModal} from "../../actions/ui";
import {useForm} from "../../hooks/useForm";
import {productClearActive, productCreate, productStartLoading, productUpdated} from "../../actions/product";

const initForm = {
    descripcion: '',
    precio_unitario: '',
    cantidad: '',
    categoria: {}
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




const AddProduct= () => {

    const dispatch= useDispatch();
    const {modalOpen} = useSelector(state=>state.ui );
    const {activeProduct} = useSelector(state=> state.product);
    const {categories} = useSelector(state=> state.category);
    const [values,handleInputChange,reset,setValues] = useForm(initForm);
    const {descripcion,cod_barras,precio_unitario,cantidad} = values;
    const [selected, setSelected] = useState(Object.values(categories)[0]);




    useEffect(() => {
        if(activeProduct){
            setValues(activeProduct);
        }else{
            setValues(initForm);
        }
    }, [activeProduct,setValues]);







    const closeModal=()=>{
        dispatch(uiCloseModal());
        dispatch(productClearActive());
        dispatch(productStartLoading());
        reset();
    }


const handleSelectChange=(e)=>{
    setSelected(e.target.value);
}

    const handleSubmit = async (e) => {
        e.preventDefault();
        let arreglo = selected.split(",");
        if(activeProduct){
            dispatch(productUpdated(values));
        }else{

            dispatch(productCreate({
                ...values,
             categoria: {_id: arreglo[0], descripcion: arreglo[1]}
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
                                <h4>{activeProduct? 'Editar': 'Agregar'} Producto</h4>
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
                                <label>Cod. Barras</label>
                                <input type="text" name="cod_barras" onChange={handleInputChange} value={cod_barras} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Precio unitario</label>
                                <input type="text" name="precio_unitario" onChange={handleInputChange} value={precio_unitario} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Cantidad</label>
                                <input type="text" name="cantidad" onChange={handleInputChange} value={cantidad} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Categoria</label>
                                <select className="form-control" value={selected} onChange={handleSelectChange} >
                                    {categories.map(c => (
                                        <option key={c._id} value={`${c._id},${c.descripcion}`}>
                                            {c.descripcion}
                                        </option>
                                    ))}
                                </select>
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

export default AddProduct;

