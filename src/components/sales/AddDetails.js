


import React,{useEffect,useState} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import {uiCloseModal} from "../../actions/ui";
import {useForm} from "../../hooks/useForm";
import {productClearActive, productCreate, productStartLoading, productUpdated} from "../../actions/product";
import {saleAddDetaill, saleDetaillsNew, saleDetailsStartLoading} from "../../actions/sale";

const initForm = {
    cantidad: '',
    producto: {}
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




const AddDetails= () => {
    let results= [];
    const dispatch= useDispatch();
    const {modalOpen} = useSelector(state=>state.ui );
    const {products} = useSelector(state=> state.product);
    const [currentPage, setCurrentPage] =useState(1);
    const [userPerPage]=useState(5);
    const [values,handleInputChange,reset,setValues] = useForm(initForm);
    const {cantidad} = values;
    const [search, setSearch]= useState("");
    const indexLastUser = currentPage* userPerPage;
    const indexOfFirstUser = indexLastUser - userPerPage;
    const currentUsers= products.slice(indexOfFirstUser,indexLastUser);


    const handleSearch=(e)=>{
        setSearch(e.target.value);
    }
    const closeModal=()=>{
        dispatch(uiCloseModal());
        dispatch(productClearActive());
        reset();
    }



    const handleAddDetails = async (product, cantidad)=>{
        dispatch(saleDetaillsNew({
            product,
            cantidad
        }))
        dispatch(uiCloseModal());
    }

    if(!search){
        results= currentUsers
    }else{
        results= products.filter((x)=>
            x.descripcion.toLowerCase().includes(search.toLowerCase())
        )
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
                                <h4>Agregar Producto</h4>
                            </div>

                        </div>
                    </div>
                    <div className="card-body">

                            <div className="form-group mb-3">
                                <label>Cantidad</label>
                                <input
                                    type="text"
                                    name="cantidad"
                                    onChange={handleInputChange}
                                    value={cantidad}
                                    autoComplete="off"
                                    className="form-control" />
                            </div>
                            <div className="col-5">
                                <input value={search} onChange={handleSearch} type="text" placeholder="Buscar Producto" className="mb-3 form-control"/>
                            </div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">descripcion</th>
                                    <th scope="col">Precio unitario</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    results.map((x, key) =>{
                                            return (
                                                <tr key={x._id}>
                                                    <th scope="row">{key+1}</th>
                                                    <td>{x.descripcion}</td>
                                                    <td>{x.precio_unitario}</td>
                                                    <td>{x.categoria.descripcion}</td>
                                                    <td>
                                                        <button onClick={()=>handleAddDetails(x,cantidad)} className="btn btn-info"><i className="fa fa-plus"></i></button>
                                                   </td>
                                                </tr>
                                            );
                                        }
                                    )
                                }
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default AddDetails;

