import React, {useState, useEffect} from 'react';
import Layout from '../../core/Layout'
import '../../assets/index.css';
import {GrStatusInfo} from 'react-icons/gr';
import { FaUserNinja, FaCriticalRole } from 'react-icons/fa';
import { SiMinutemailer } from 'react-icons/si';
import ToggleDisplay from 'react-toggle-display';
import { MdCancel } from 'react-icons/md';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../auth/helper';
import { toast, ToastContainer } from 'react-toastify';

const Profile = ({ history }) => {
    const [toogleForm,setToggleForm] = useState(false);
    const [Data,setData] = useState({
        name: "",
        email: "",
        role: "",
        password: ""
    })

    useEffect(() => {
        loadProfile()
    }, [])

    const token = getCookie('token');

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log("Sucessfully Done " , res);
            const {name,role,email} = res.data
            setData({
                ...Data,
                name,
                email,
                role
            })

        })
        .catch(err => {
            console.log("error ", err);
            if(err.response.status === 401 || err.response.status === 400){
                signout(() => {
                    history.push('/SignIn');
                });
            }
        })
    }


    const handleChange = (e) => {
        setData({
            ...Data,
            [e.target.id] : e.target.value
        })
    }

    const submitForm = (e) => {

        e.preventDefault();

        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/update`,
            headers: {
                    Authorization: `Bearer ${token}`
            },
            data: {name, password}
        }).then(res => {
            setToggleForm(!toogleForm);
            updateUser(res,() => {
                toast("Sucessfully Updated!");
                console.log(res);
            });  
        }).catch(error => {
            toast.error(error.response.data.error);
            console.log(error);
        })

    }

    // const submitForm = (e) => {
    //     e.preventDefault();
    //     axios({
    //         method: 'PUT',
    //         url: `${process.env.REACT_APP_API}/user/update`,
    //         headers : {
    //             Authorization: `Bearer ${token}`
    //         },
    //         data: {name, password}
    //     })
    //     .then(res => {
    //         toast.success("Profile Updated Successfully");
    //         setToggleForm(!toggleForm)
    //     })
    //     .catch(err => {
    //         toast.error(error.response.data.error);
    //         console.log(err);
    //     })
    // }


    const  { name,email,role,password } = Data;

    const handleClick = () => {
        setToggleForm(!toogleForm);
    }
    return(
        <Layout>
                <ToastContainer />
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center">
                        
                        <section>
                            <h1 className="textstyle d-flex justify-content-center">
                                Profile Details
                            </h1>
                            <div className="wave wave1"></div>
                            <div className="wave wave2"></div>
                            <div className="wave wave3"></div>
                            <div className="wave wave4"></div>
                        </section>
                    </div>
                </div>
                <div className="container containers shadow-lg p-3 mb-5 bg-light rounded">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-5 btns btns1">
                            <div className="textstyles">
                            <h3><FaUserNinja />   	  Username</h3>
                            </div>
                            <div className="textstyleData">
                            <h5>{name}</h5>
                            </div>        
                        </div>
                        <div className="col-md-5 btns btns2">
                            <div className="textstyles">
                            <h3><SiMinutemailer />  	 Email</h3>
                            </div>    
                            <div className="textstyleData">
                            <h5>{email}</h5>
                            </div>  
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-5 btns btns3">
                            <div className="textstyles">
                            <h3><GrStatusInfo  />   Status</h3>
                            </div>
                            <div className="textstyleData">
                            <h5>Active</h5>
                            </div>                  
                        </div>
                        <div className="col-md-5 btns btns4">
                            <div className="textstyles">
                            <h3><FaCriticalRole />  Role</h3>
                            </div>
                            <div className="textstyleData">
                            <h5>{role}</h5>
                            </div>      
                        </div>
                    </div>

                    <div className="btn btn-primary d-flex justify-content-center" onClick={handleClick}>
                        Update Details
                    </div>

                </div>
                {/* ToggleForm */}
                <ToggleDisplay show={toogleForm}>
                    <div className="container d-flex justify-content-center inMid">
                        <div className="row">
                            <div className="col-md-12">
                            <h1>Profile Update</h1> 
                                <div className="right" onClick={handleClick}>
                                    <MdCancel />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <form>
                                <div class="form-group">
                                    <label>Email address</label>
                                    <input type="email" class="form-control" id="email" disabled="true" defaultValue={email}/>
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                    <label>Username</label>
                                    <input type="text" class="form-control" id="name"  value={name} onChange={handleChange}/>
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" class="form-control" id="password"  value={password} onChange={handleChange}/>
                                </div>
                                <div class="form-group">
                                    <label>role</label>
                                    <input type="text" class="form-control" id="role" disabled="true" defaultValue={role}/>
                                </div>

                                <button className="btn btn-success" onClick={submitForm}>Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </ToggleDisplay>
            
        </Layout>
    )
}


export default Profile;