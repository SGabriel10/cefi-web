import React from 'react';
import {useDispatch} from "react-redux";
import {startLogin} from "../../actions/auth";
import {useForm} from "../../hooks/useForm";
import { useCookies } from 'react-cookie';

const Login = () => {

    const dispatch= useDispatch();
    const [cookies, setCookie] = useCookies(['username','password']);
    const [formLoginValues, handleInputChange ]= useForm( {
        loginEmail: cookies.username,
        loginPassword: cookies.password
    });

    const {loginEmail, loginPassword} = formLoginValues;

    const handleLogin=(e)=>{
        e.preventDefault();
        dispatch(startLogin(loginEmail, loginPassword));
        console.log(loginPassword);
    }

    const handleRemerberMe=()=>{
        setCookie('username', loginEmail, { path: '/' });
        setCookie('password', loginPassword, { path: '/' });
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="../../index2.html" className="h1"><b>CEFI</b> <img src="fiuni.png" alt="FIUNI Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' ,width:'50px'}} />
                        </a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Inicia sesión para iniciar tu sesión

                        </p>

                        <form action="../../index3.html" method="post">
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="loginEmail"
                                    value ={loginEmail}
                                    onChange={handleInputChange}
                                    placeholder="Email"

                                />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope"></span>
                                        </div>
                                    </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="loginPassword"
                                    value ={loginPassword}
                                    onChange={handleInputChange}
                                    placeholder="Password"/>
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input onClick={handleRemerberMe} type="checkbox" id="remember"/>
                                            <label htmlFor="remember">
                                                Acuérdate de mí
                                            </label>
                                    </div>
                                </div>


                            </div>
                        </form>

                        <div className="social-auth-links text-center mt-2 mb-3">
                                <button onClick={handleLogin} type="submit" className="btn btn-primary btn-block">Iniciar Sesion</button>
                        </div>


                        <p className="mb-1">
                            <a href="forgot-password.html">Olvidé mi contraseña</a>
                        </p>
                        <p className="mb-0">
                            <a href="register.html" className="text-center">Registrar una nueva membresía</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
