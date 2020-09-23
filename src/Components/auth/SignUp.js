import React, { useState,useEffect } from 'react';
import '../../assets/index.css'
import signUpLogo from '../../assets/Images/signup.svg';
import { IoLogoFacebook } from "react-icons/io";
import {FcGoogle} from "react-icons/fc";
import { RiLoginCircleFill } from 'react-icons/ri';
import { isAuth } from './helper';
import { Link, Redirect, NavLink} from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import Layout from  '../../core/Layout';
import 'react-toastify/dist/ReactToastify.min.css'




const SignUp = () => {
    const [values,setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Register',
        disableButton : false
    })


    const { name,email,password,buttonText, disableButton } = values;

    const handleLogin = () => {
        console.log("This is Register Page Section");
    }

    const changeValue = (e) => {
            setValues({
                ...values,
                [e.target.id] : e.target.value
            });

        
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
            console.log("Handle Click is been called!");
        setValues({
            ...values,
            buttonText: 'Registering...',
            disableButton: true
        });

        console.log(process.env.REACT_APP_API);

        axios({
            method: 'POST',
            url:  `${process.env.REACT_APP_API}/signup`,
            data: {name,email,password}
        }).then(res => {
            console.log("Sign Up Success ", res);
            setValues({
                ...values,
                name: '',
                email: '',
                password: '',
                buttonText: 'Register',
                disableButton: false
            });
            toast('Submitted!');
            toast.success(res.data.message);
        }).catch(err => {
            console.log('SignUp Error' , err.response.data);
            setValues({
                ...values,
                buttonText: 'Register',
                disableButton: false
            });
            toast.error(err.response.data.error);
            
        })
    }

    return (
       <Layout>
           <ToastContainer />
           {isAuth() ? <Redirect to="/" /> : null }
       <div className="container indexStyle">
            <div className="row shadow-lg p-3 mb-5 bg-white rounded">
                <div className="col-sm-6 ">
                    <img src={signUpLogo} alt="signInLogo" className="img-fluid"/>
                </div>
                <div className="col-sm-6">
                   <div className="card shadow p-3 mb-5 bg-white rounded">
                    <h3 className="title"> Sign Up</h3>

                <form>
                <div className="form-group">
                        <label htmlFor="exampleInputName1">User Name</label>
                        <input type="name" className="form-control" id="name" aria-describedby="nameHelp" onChange={changeValue} value={name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={changeValue} value={email}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" onChange={changeValue} value={password}/>
                    </div>
                    <button type="submit" className="btn btn-success" disabled={disableButton} onClick={handleSubmit}>{buttonText}</button>

                </form>







                    </div>

                    <p><b>Sign In</b></p>

                
                    <div className="row">
                        <div className="col-sm-3  shadow p-3 mb-5 bg-white rounded colorText" onClick={handleLogin}><NavLink to={"/SignIn"}> <RiLoginCircleFill color="green"/> Login </NavLink></div>
                    </div>

                    
                
                </div>
            </div>
        </div>
        </Layout>
    ); 
}


export default SignUp;