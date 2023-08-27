import React, {useEffect, useState} from 'react';
import moment from "moment";
import DateTimePicker from 'react-datetime-picker';
import {useDispatch, useSelector} from "react-redux";
import {clientStartLoading} from "../../actions/client";
import AddDetails from "./AddDetails";
import {uiCloseModal, uiOpenModal} from "../../actions/ui";
import {productStartLoading} from "../../actions/product";
import {saleCreate, saleDetailDelete} from "../../actions/sale";

const now = moment();

const Sale = () => {

    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const {clients} = useSelector(state => state.client);
    const {name} = useSelector(state => state.auth);
    const {details, total} = useSelector(state => state.sale);
    const [dateStart, setDateStart] = useState(now.toDate());
    useEffect(() => {
        dispatch(clientStartLoading());
        dispatch(productStartLoading());
    }, [dispatch]);
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);
    const handleSubmit=()=>{
        if(search===""){
            setSearch("Sin Nombre");
        }
        dispatch(saleCreate({
            cliente: search,
            vendedor: name,
            fecha: dateStart,
            total
        },details));
        setSearch("");
    }
    const handleModal = () => {
        dispatch(uiOpenModal());
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const onSearch = (x) => {
        setSearch(x);
    }
    const handleStartDateChange = (e) => {
        setDateStart(e);
    }

    const handleDelete = (detail) => {
        dispatch(saleDetailDelete(detail));
    }


    const handleKeyPress = e =>{
        if(e.key==="F2"){
            dispatch(uiOpenModal());
        }
        if(e.key==="Enter"){
            dispatch(uiCloseModal());
        }
        if(e.key==="f"){
            document.getElementById("cliente").focus();
            setSearch("");
        }
    }
    

    return (
        <div className="content-wrapper">
            <div className="card card-info">
                <div className="card-header">
                    <h3 className="card-title">Venta</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                            <div className="form-group col-xs-4 col-md-2">
                                <label className="control-label">
                                    Cliente
                                </label>
                                <input id="cliente" type="text" value={search} onChange={handleSearch} className="form-control pt-1 pb-1"/>
                                <div className="dropdown">
                                    {clients
                                        .filter(item=>{
                                            const searchTerm = search.toLowerCase();
                                            const full_name = item.name.toLowerCase();
                                            return searchTerm && full_name.startsWith(searchTerm);
                                        })
                                        .map(item => <div onClick={()=> {onSearch(item.name+" "+item.last_name)}} className="dropdown-row">
                                    {item.name+" "+item.last_name}
                                </div>)
                                    }
                                </div>
                        </div>

                        <div className="form-group col-xs-4 col-md-3">
                            <label className="control-label">
                                Fecha
                            </label>


                            <DateTimePicker
                                onChange={ handleStartDateChange }
                                value={ dateStart }
                                className="form-control pt-1 pb-1"
                            />
                        </div>
                        <div className="form-group col-xs-4 cols-md-4">
                            <label className="control-label">
                                Vendedor
                            </label>
                            <div className="form control">
                                <input type="text" value={name} disabled className="pt-1 pb-1"/>
                            </div>

                        </div>
                        <div className="form-group col-xs-4 col-md-3">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="btn btn-primary mtop"
                            >
                                <span> Vender</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="mb-2 col-md-4 offset-md-8 text-right">
                    <button
                       onClick={handleModal}
                        className="btn btn-primary"

                    >
                        <span> Agregar Producto</span>
                    </button>
                </div>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">DESCRIPCION</th>
                    <th scope="col">PRECIO UNITARIO</th>
                    <th scope="col">CANTIDAD</th>
                    <th scope="col">SUBTOTAL</th>
                    <th scope="col">ACCIONES</th>
                </tr>
                </thead>
                <tbody>
                {
                    details.map((x, key) =>{
                            return (
                                <tr key={x.product._id}>
                                    <th scope="row">{key+1}</th>
                                    <td>{x.product.descripcion}</td>
                                    <td>{x.product.precio_unitario}</td>
                                    <td>{x.cantidad}</td>
                                    <td>{x.cantidad*x.product.precio_unitario}</td>
                                    <td className="text-center">
                                       <button onClick={()=>handleDelete(x)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                            );
                        }
                    )
                }
                </tbody>
            </table>
            <AddDetails/>
            <div className="row">
                <label className="col-1">Total</label>
                <input type="text" value={total} className=" col-2 form-control" disabled/>
                <label className="col-2">gs</label>
            </div>

        </div>
    );
};

export default Sale;
