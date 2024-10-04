import React from 'react';
import Menu from "../components/ui/Menu";
import {Route, Routes} from "react-router-dom";
import Admin from "../components/ui/Admin";
import Sale from "../components/sales/Sale";
import Product from "../components/products/Product";
import Category from "../components/categories/Category";
import AddCategory from "../components/categories/AddCategory";
import Client from "../components/clients/Client";
import AddClient from "../components/clients/AddClient";
import User from "../components/users/User";
import AddUser from "../components/users/AddUser";
import Price from '../components/prices/Price';
import AddPrice from '../components/prices/AddPrice';
import Ticket from '../components/ticket/Ticket';
import Imprimir from '../components/ticket/Imprimir';
import CalculateHours from '../components/ticket/CalculateHours';
import UploadFile from '../components/upload/UploadFile';

const DashBoard = () => {
    return (
        <div>
            <Menu/>
            <Routes>
                <Route path="/" element={<Admin/>}/>
                <Route exact path="/ventas" element={<Sale/>}/>
                <Route exact path="/productos" element={<Product/>} />
                <Route exact path="/categorias" element={<Category/>} />
                <Route exact path="/categorias/agregar" element={<AddCategory/>} />
                <Route exact path="/clientes" element={<Client/>} />
                <Route exact path="/clientes/agregar" element={<AddClient/>} />
                <Route exact path="/usuarios" element={<User />} />
                <Route exact path="/usuarios/agregar" element={<AddUser/>} />
                <Route exact path="/precios" element={<Price/>} />
                <Route exact path="/precios/agregar" element={<AddPrice/>}/>
                <Route exact path="/ticket" element={<Ticket/>}/>
                <Route exact path="/imprimir" element={<Imprimir/>}/>
                <Route exact path="/calcular" element={<CalculateHours/>}/>
                <Route exact path="/upload" element={<UploadFile/>}/>
            </Routes>
        </div>
    );
};

export default DashBoard;


