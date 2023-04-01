import React from 'react';
import Admin from "../components/ui/Admin";
import User from "../components/users/User";
import AddStudent from "../components/users/AddUser";
import {
    BrowserRouter as Router,
    Routes, Route
} from "react-router-dom";
import Menu from "../components/ui/Menu";
import Product from "../components/products/Product";
import Category from "../components/categories/Category";
import AddCategory from "../components/categories/AddCategory";

const AppRouter = () => {
    return (
        <div>
            <Router>
                <Menu/>
                <Routes>
                    <Route path="/" element={<Admin/>}/>
                    <Route exact path="/productos" element={<Product/>} />
                    <Route exact path="/categorias" element={<Category/>} />
                    <Route exact path="/categorias/agregar" element={<AddCategory/>} />
                    <Route exact path="/usuarios" element={<User />} />
                    <Route exact path="/usuarios/agregar" element={<AddStudent/>} />
                </Routes>
            </Router>
        </div>
    );
};

export default AppRouter;
