import React from 'react';
import {useForm} from "../../hooks/useForm";
import Swal from "sweetalert2";
import {startRegister} from "../../actions/auth";
import {useDispatch} from "react-redux";

const Register = () => {
    const dispatch= useDispatch();

    const [formRegisterValues, handleRegisterInputChange ]= useForm( {
        registerName: 'Nando',
        registerLastName: 'Herrera',
        registerEmail: 'nando@gmail.com',
        registerPassword1: '123456',
        registerPassword2: '123456'

    });
    const {registerName,registerLastName,registerEmail, registerPassword1,registerPassword2}= formRegisterValues;
    const handleRegister=(e)=>{
        e.preventDefault();
        if(registerPassword1!==registerPassword2){
            Swal.fire('Error','Las contraseñas son diferentes','error');
        }
        dispatch(startRegister(registerEmail,registerPassword1,registerName,registerLastName));
    }
    return (
       <div className="register-page">
           <div className="register-box">
               <div className="card card-outline card-primary">
                   <div className="card-header text-center">
                       <h1>
                           <b>CEFI</b>
                       </h1>
                   </div>
                   <div className="card-body">
                       <p className="login-box-msg">Registrar nuevo usuario</p>

                       <form onSubmit={handleRegister}>
                           <div className="input-group mb-3">
                               <input
                                   type="text"
                                   name="registerName"
                                   value={registerName}
                                   onChange={handleRegisterInputChange}
                                   className="form-control"
                                   placeholder="Nombres"/>
                               <div className="input-group-append">
                                   <div className="input-group-text">
                                       <span className="fas fa-user"></span>
                                   </div>
                               </div>
                           </div>
                           <div className="input-group mb-3">
                               <input type="text"
                                      className="form-control"
                                      name="registerLastName"
                                      value={registerLastName}
                                      onChange={handleRegisterInputChange}
                                      placeholder="Apellidos"/>
                               <div className="input-group-append">
                                   <div className="input-group-text">
                                       <span className="fas fa-user"></span>
                                   </div>
                               </div>
                           </div>
                           <div className="input-group mb-3">
                               <input type="email"
                                      name="registerEmail"
                                      value={registerEmail}
                                      onChange={handleRegisterInputChange}
                                      className="form-control"
                                      placeholder="Correo electronico"/>
                               <div className="input-group-append">
                                   <div className="input-group-text">
                                       <span className="fas fa-envelope"></span>
                                   </div>
                               </div>
                           </div>
                           <div className="input-group mb-3">
                               <input type="password"
                                      name="registerPassword1"
                                      value={registerPassword1}
                                      onChange={handleRegisterInputChange}
                                      className="form-control"
                                      placeholder="Contraseña"/>
                               <div className="input-group-append">
                                   <div className="input-group-text">
                                       <span className="fas fa-lock"></span>
                                   </div>
                               </div>
                           </div>
                           <div className="input-group mb-3">
                               <input type="password"
                                      name="registerPassword2"
                                      value={registerPassword2}
                                      onChange={handleRegisterInputChange}
                                      className="form-control"
                                      placeholder="Repita la contraseña"/>
                               <div className="input-group-append">
                                   <div className="input-group-text">
                                       <span className="fas fa-lock"></span>
                                   </div>
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-8">
                                   <div className="icheck-primary">
                                       <input type="checkbox" id="agreeTerms" name="terms" value="agree"/>
                                       <label htmlFor="agreeTerms">
                                           Estoy de acuerdo con los <a href="#">terminos</a>
                                       </label>
                                   </div>
                               </div>
                           </div>
                       <div className="social-auth-links text-center">
                           <button type="submit" className="btn btn-primary btn-block">Registrar</button>
                       </div>
                       </form>



                   </div>
               </div>
           </div>
       </div>

);
};

export default Register;
