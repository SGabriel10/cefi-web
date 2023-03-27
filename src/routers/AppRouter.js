import React from 'react';
import Admin from "../components/ui/Admin";
import User from "../components/users/User";
import AddStudent from "../components/users/AddUser";
import {
    BrowserRouter as Router,
    Routes, Route
} from "react-router-dom";
import Menu from "../components/ui/Menu";

const AppRouter = () => {
    return (
        <div>
            <Router>
                <Menu/>
                <Routes>
                    <Route path="/" element={<Admin/>}/>
                    <Route exact path="/usuarios" element={<User />} />
                    <Route exact path="/usuarios/agregar" element={<AddStudent/>} />
                </Routes>
            </Router>
        </div>
    );
};

export default AppRouter;
