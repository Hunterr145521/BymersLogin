import React from 'react';
import GoogleLogin from 'react-google-login';
import '../../assets/index.css';
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios';


const Google = ({informParent = f => f}) => {
    const responseGoogle = (res) => {
        console.log(res.tokenId);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/google-login`,
            data: {idToken: res.tokenId}
        })
        .then(res => {
            console.log("GOOGLE LOGIN SUCCESS",res);

            informParent(res);
            

        })
        .catch(err => {
            console.log("GOOGLE LOGIN ERROR",err.response);
        })

    }



    return (
        <div className="pb-3">
            <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
            render={renderProps => (
            <div onClick={renderProps.onClick} disabled={renderProps.disabled} className="shadow p-3 mb-5 bg-white rounded Facebook"><FcGoogle /> Google</div>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            
            />
        </div>
    )

}


export default Google;