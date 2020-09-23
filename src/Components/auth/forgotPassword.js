import React, { useState,useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import '../../assets/index.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const ForgotPassword = ({history}) => {

    const [value,setValue] = useState({
        email: '',
        buttonText: 'Authenticate Me!',
        disableButton : false
    })


    
    const handleChange = (e) => {
        setValue({
            ...value,
            email: e.target.value
        })
    }


    const handleClick = (e) => {
        e.preventDefault();
        setValue({
            ...value,
            buttonText: 'Authentication in process!',
            disableButton: true
        });

        axios({
            method: 'PUT',
            url:  `${process.env.REACT_APP_API}/forgot-password`,
            data: {email}
        })
        .then(res => {
            console.log("Forgot Password Success", res);
            toast.success("Email Has Been Sent to your Registered Email Address")
        }).then(res => {
            setValue({
                ...value,
                buttonText: 'Authenticate Me!',
                disableButton: false
            });
        })

        .catch(err => {
            console.log("Forgot Password Error", err.response.data);
            setValue({
                ...value,
                buttonText: 'Authenticate Me!',
                disableButton: false
            })
            toast.error(err.response.data.error);
        })











    }

    const  {email,buttonText,disableButton} = value;

    return(
        <div className="forgotPassword">
        <ToastContainer/>
            <div className="container">
                <div className="forgotbox shadow-lg p-3 mb-5 bg-light rounded">
                    <NavLink to={"/SignIn"}>Back</NavLink>
                    <div className="textcenter">
                        <h1>Forgot Password</h1>
                        <hr/>
                        
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={handleChange}/>
                                <small id="emailHelp" class="form-text text-muted">Enter your registered email id</small>
                            </div>
                            <button className="btn btn-success" onClick={handleClick} disabled={disableButton}>{buttonText}</button>
                        </form>
                    </div>
                </div>
                
            </div>
            
        </div>
    )

}

export default ForgotPassword;