import React from 'react';
import Admin from "../components/ui/Admin";
import User from "../components/users/User";
import {
    BrowserRouter as Router,
    Routes, Route
} from "react-router-dom";
import Login from "../components/auth/Login";
import DashBoard from "./DashBoard";
import {useDispatch, useSelector} from "react-redux";
import Register from "../components/auth/Register";

const AppRouter = () => {
    const dispatch = useDispatch();
    const {logged} = useSelector(state => state.auth);
    /*useEffect(() => {
        dispatch(startChecking);
    }, [dispatch]);*/
    return (
        <div>
            <Router>
                <Routes>
                    {
                        (!logged) &&
                        <><Route path="/" element={<Login/>}/>
                            <Route exact path="/login" element={<Login/>}/>
                            <Route exact path="/register" element={<Register/>}/>
                            <Route path="*" element={<Login/>}/></>
                    }

                    {
                        (logged) && <Route path="*" element={<DashBoard/>}/>
                    }
                </Routes>
            </Router>
        </div>
    );
};

export default AppRouter;
