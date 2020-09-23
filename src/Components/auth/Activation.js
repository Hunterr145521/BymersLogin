import Avatar from 'avataaars';
import React, { useState,useEffect } from 'react';
import '../../assets/index.css';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import Layout from  '../../core/Layout';
import 'react-toastify/dist/ReactToastify.min.css'
import jwt from 'jsonwebtoken';



const Activate = ({match}) => {
    const [values,setValues] = useState({
        name: '',
        token: '',
        show: true
    });

    useEffect(() => {
        console.log(match);
        let  token = match.params.token;
        let { name } = jwt.decode(token);
        

        if(token) {
            setValues({
                ...values,
                name,
                token
            })
        }
    },[])


    const { name,token,show  } = values;

 //on click
    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url:  `${process.env.REACT_APP_API}/account-activation`,
            data: {token}
        }).then(res => {
            console.log("Account Active :) ", res);
            setValues({
                ...values,
                show: false
            });
            toast.success(res.data.message);
        }).catch(err => { 
            console.log('SignUp Error' , err.response.data.error);
            toast.error(err.response.data.error);
            
        })
    }

    return (
       <Layout>
           <ToastContainer />
            <div className="row shadow-lg p-3 mb-5 bg-white rounded">
                <div className="col-sm-6">
                <Avatar
                    avatarStyle='Transparent'
                    topType='LongHairStraight'
                    accessoriesType='Round'
                    hairColor='Black'
                    facialHairType='Blank'
                    clotheType='Hoodie'
                    clotheColor='Gray02'
                    eyeType='Default'
                    eyebrowType='Default'
                    mouthType='Smile'
                    skinColor='Light'
                    />
                </div>
                <div className="col-sm-6">
                    <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                        <h1>Hey {name}, Ready to activate your account?</h1>
                        <div>
                        <button type="submit" className="btn btn-success" onClick={handleSubmit}>Activate Account</button>
                        </div>
                    </div>
                </div>
            </div>
       </Layout>
    );
  
}


export default Activate;