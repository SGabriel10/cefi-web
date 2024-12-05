import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {startLogout} from "../../actions/auth";

const Menu = () => {
    const dispatch = useDispatch();
    const [header,setHeader]=useState({nombre: 'mi empresa', file: {url: 'http://localhost:4000/uploads/logo.jpg'}})
    const {name}= useSelector(state=> state.auth)
    const {activeHeader} = useSelector(state=>state.header);
    const handleLogout=()=>{
        dispatch(startLogout());
    }
    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i
                            className="fas fa-bars"></i></a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <button className="btn btn-outline-danger"
                            onClick={handleLogout}
                    >
                        <i className="fas fa-sign-out-alt"></i>
                        Salir
                    </button>
                </ul>
            </nav>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="index3.html" className="brand-link">
                    <img src={header.file.url} alt="FIUNI Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">{header.nombre}</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="info">
                            <a className="d-block">
                                <font style={ {verticalAlign : 'inherit'}}><font style={ {verticalAlign : 'inherit'}}>{name}</font></font>
                            </a>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                            <Link className="nav-link" to="/calcular">
                                <i class='fas fa-car'></i>
                                <p>Estacionamiento</p>
                             </Link>  
                             <Link className="nav-link" to="/imprimir">
                                <i className="fa fa-print"></i>
                                <p> Hora y fecha</p>
                             </Link>   
                            </li>
                            <li className="nav-item">
                                <Link  className="nav-link" to="/ventas">
                                    <i className="fa fa-shopping-cart"></i>
                                    <p> Ventas</p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link  className="nav-link" to="/productos">
                                    <i className="fas fa-store" aria-hidden="true"></i>
                                    <p> Productos</p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link  className="nav-link" to="/categorias">
                                    <i className="fa fa-list-alt" aria-hidden="true"></i>
                                    <p> Categorias</p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link  className="nav-link" to="/clientes">
                                    <i className="far fa-address-card"></i>
                                    <p> Clientes</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link  className="nav-link" to="/precios">
                                    <i class='far fa-money-bill-alt'></i>
                                    <p> Precios</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link  className="nav-link" to="/balance">
                                    <i class="fa fa-balance-scale"></i>
                                    <p> Balance</p>
                                </Link>     
                            </li>
                            <li className="nav-item">
                                <Link  className="nav-link" to="/ingresos">
                                    <i class='fas fa-dollar-sign'></i>
                                    <p> Ingresos</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link  className="nav-link" to="/egresos">
                                    <i class='fas fa-coins'></i>
                                    <p> Egresos</p>
                                </Link>
                            </li>


                            <li className="nav-item">
                                <Link  className="nav-link" to="/usuarios">
                                    <i className="fas fa-user-alt"></i>
                                    <p> Usuarios</p>
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/upload">
                                    <i class="fa fa-cog"></i>
                                    <p>Configuracion factura</p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        </div>
    );
};

export default Menu;
