import React, { useState,useEffect } from 'react';
import '../../assets/index.css'
import signInLogo from '../../assets/Images/signin.svg';
import { IoLogoFacebook } from "react-icons/io";
import {FcGoogle, FcInspection} from "react-icons/fc";
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Layout from  '../../core/Layout';
import { authenticate, isAuth } from './helper';
import 'react-toastify/dist/ReactToastify.min.css'
import Google from './Google';
import Facebook from './Facebook'

const SignIn = ({history}) =>  {
    const [auth, setAuth] = useState({
        email: '',
        password: '',
        buttonText: 'Login',
        disableButton : false
    });


    const { email, password, buttonText, disableButton  } = auth;

   const handleRegister = () => {
        console.log("This is Register Page Section");
    }
   const handleFacebookClick = () => {
        console.log("This is Facebook Page Section");
    }
   const handleGoogleClick = () => {
        console.log("This is Google Page Section");
    }

    const changeText = (e) => {
        setAuth({
            ...auth,
            [e.target.id] : e.target.value
        });
        
    } 
    const authLogin = (e) => {
        e.preventDefault();
        console.log("Handle Click is been called!");
    setAuth({
        ...auth,
        buttonText: 'Verifing...',
        disableButton: true
    });

    console.log(process.env.REACT_APP_API);

    axios({
        method: 'POST',
        url:  `${process.env.REACT_APP_API}/signin`,
        data: {email,password}
    }).then(res => {

        //after getting info save user info and token in localstorage and cookie
        console.log("Sign In Success ", res);
        console.log("Authenticate");
        authenticate(res, () => {
            setAuth({
                ...auth,
                email: '',
                password: '',
                buttonText: 'Login',
                disableButton: false
            });
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/profile');
            // toast.success(`Hey ${res.data.user.name}, Welcome back!`);
        })
        
    }).catch(err => {
        console.log('SignIn Error' , err.response.data);
        setAuth({
            ...auth,
            buttonText: 'Login',
            disableButton: false
        });
        toast.error(err.response.data.error);
        
    })
    }

    const redirectforgot = () => {
        history.push("/forgot")
    }


    const informParent = res => {
        authenticate(res, () => {
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/profile');
        })
    }

    return (
        <Layout>

            <ToastContainer />
            {isAuth() ? <Redirect to="/" /> : null }


        <div className="container indexStyle">
            <div className="row shadow-lg p-3 mb-5 bg-white rounded">
                <div className="col-sm-6 ">
                    <img src={signInLogo} alt="signInLogo" className="img-fluid"/>
                </div>
                <div className="col-sm-6">
                    <div className="card shadow p-3 mb-5 bg-white rounded">
                    <h3 className="title"> Sign In</h3>
                
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={changeText}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={changeText}/>
                    </div>
                    <button type="submit" className="btn btn-success" disabled={disableButton}  onClick={authLogin}>{buttonText}</button>
                    &nbsp;&nbsp;
                    <button type="submit" className="btn btn-warning" onClick={redirectforgot}>Forgot Password</button>
                </form>
                    </div>

                    <p>Sign In Using</p>

                
                    <div className="row">
                        <div className="col-sm-3"> <Google informParent={informParent} /> </div>
                        &nbsp;&nbsp;
                        <div className="col-sm-4" onClick={handleFacebookClick}> 
                        <Facebook informParent={informParent} />

                        </div>
                        &nbsp;&nbsp;
                        <div className="col-sm-4" onClick={handleRegister}>
                            <div className="shadow p-3 mb-5 bg-white rounded Facebook">
                            <NavLink to = {"/SignUp"}> <FcInspection /> Register</NavLink> 
                            </div>
                        </div>
                    </div>

                    
                
                </div>
            </div>
        </div>
    </Layout>
    );

}


export default SignIn;