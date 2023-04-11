import React, {useEffect, useState} from 'react';
import moment from "moment";
import DateTimePicker from 'react-datetime-picker';
import {useDispatch, useSelector} from "react-redux";
import {clientStartLoading} from "../../actions/client";
import AddDetails from "./AddDetails";
import {uiOpenModal} from "../../actions/ui";
import {productStartLoading} from "../../actions/product";

const now = moment();

const Sale = () => {

    const dispatch = useDispatch();
    const [search, setSearch]= useState("");
    const {clients} = useSelector(state => state.client)
    const [ dateStart, setDateStart ] = useState( now.toDate() );
    useEffect(() => {
        dispatch(clientStartLoading());
        dispatch(productStartLoading());
    }, [dispatch]);

    const handleModal=()=>{
        dispatch(uiOpenModal());
    }

    const handleSearch=(e)=>{
        setSearch(e.target.value);
    }
    const onSearch=(x)=>{
        setSearch(x);
    }
    const handleStartDateChange = ( e ) => {
        setDateStart( e );
    }
    return (
        <div className="container ml-250">
            <div className="card card-info">
                <div className="card-header">
                    <h3 className="card-title">Venta</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-3">
                            <div className="row">
                                <label className="col-3">
                                    Cliente
                                </label>
                                <input type="text" value={search} onChange={handleSearch} className="col-9 form-control"/>
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
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <label className="col-2">
                                    Fecha
                                </label>

                                <DateTimePicker
                                    onChange={ handleStartDateChange }
                                    value={ dateStart }
                                />
                            </div>
                        </div>
                        <div className="col-5">

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                <span> Vender</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="mb-2 col-md-4 offset-md-8">
                    <button
                        onClick={handleModal}
                        type="submit"
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
                    <th scope="col">descripcion</th>
                    <th scope="col">Precio unitario</th>
                    <th scope="col">cantidad</th>
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            <AddDetails/>
        </div>
    );
};

export default Sale;