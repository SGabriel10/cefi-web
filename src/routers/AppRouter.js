import React from 'react';
import Admin from "../components/ui/Admin";
import User from "../components/users/User";
import {
    BrowserRouter as Router,
    Routes, Route
} from "react-router-dom";
import Menu from "../components/ui/Menu";
import Product from "../components/products/Product";
import Category from "../components/categories/Category";
import AddCategory from "../components/categories/AddCategory";
import AddClient from "../components/clients/AddClient";
import Client from "../components/clients/Client";
import AddUser from "../components/users/AddUser";
import Sale from "../components/sales/Sale";

const AppRouter = () => {
    return (
        <div>
            <Router>
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
                </Routes>
            </Router>
        </div>
    );
};

export default AppRouter;
