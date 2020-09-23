import React, { useState,useEffect } from 'react';
import jwt from 'jsonwebtoken';
import {NavLink} from 'react-router-dom';
import '../../assets/index.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const ResetPassword = ({ match }) => {

    const [value,setValue] = useState({
        name: '',
        newPassword: '',
        confirmPassword: '',
        token: '',
        buttonText: 'Reset Password!',
    });


    useEffect(() => {
        let token = match.params.passwordResetToken
        let { name } = jwt.decode(token);
        if(token){
            setValue({
                ...value,
                name,
                token
            })
        }
    },[])


    const {name,newPassword,token,buttonText, confirmPassword} = value;


    
    const handleChange = (e) => {
            setValue({
                ...value,
                [e.target.id]: e.target.value
            })
        

    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if(newPassword === confirmPassword){
            setValue({
                ...value,
                buttonText: 'Submitting'
            });

            axios({
                method: 'PUT',
                url:  `${process.env.REACT_APP_API}/reset-password`,
                data: {newPassword, resetPasswordLink: token}
            })
            .then(res => {
                console.log("Reset Password Success", res);
                toast.success("Password Changed Successfully");
                setValue({
                    ...value,
                    buttonText: 'Resetting.....'
                })
            })
            .catch(err => {
                console.log("RESET PASSWORD ERROR" , err);
                toast.error(err.response.data.error);
                setValue({
                    ...value,
                    buttonText: 'Reset Password!'
                })
            })
        }else{
            toast.warning("Password didn't Match in Feilds!");
        }
    }

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     setValue({
    //         ...value,
    //         buttonText: 'Authentication in process!',
    //         disableButton: true
    //     });

    //     axios({
    //         method: 'PUT',
    //         url:  `${process.env.REACT_APP_API}/forgot-password`,
    //         data: {email}
    //     })
    //     .then(res => {
    //         console.log("Forgot Password Success", res);
    //         toast.success("Email Has Been Sent to your Registered Email Address")
    //     }).then(res => {
    //         setValue({
    //             ...value,
    //             buttonText: 'Authenticate Me!',
    //             disableButton: false
    //         });
    //     })

    //     .catch(err => {
    //         console.log("Forgot Password Error", err.response.data);
    //         setValue({
    //             ...value,
    //             buttonText: 'Authenticate Me!',
    //             disableButton: false
    //         })
    //         toast.error(err.response.data.error);
    //     })
    // }



    return(
        <div className="forgotPassword">
            <ToastContainer />
            <div className="container">
                <div className="forgotbox shadow-lg p-3 mb-5 bg-light rounded">
                    <NavLink to={"/SignIn"}>Back</NavLink>
                        

                    <h4>Hey {name} ....</h4>
                    <div className="textcenter">
                        <h1>Reset Password</h1>
                        <hr/>
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Password</label>
                                <input type="password" class="form-control" id="newPassword" onChange={handleChange} value={newPassword} required/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Confirm Password</label>
                                <input type="password" class="form-control" id="confirmPassword" onChange={handleChange} required/>
                            </div>
                            <button className="btn btn-success" onClick={handleSubmit}>{buttonText}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ResetPassword;