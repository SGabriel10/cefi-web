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
            </Routes>
        </div>
    );
};

export default DashBoard;


