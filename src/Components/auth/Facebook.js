import React from 'react';
import '../../assets/index.css';
import { IoLogoFacebook } from "react-icons/io";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';


const Facebook = ({informParent = f => f}) => {
    const responseFacebook = (res) => {
        console.log(res);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/facebook-login`,
            data: {userID: res.userID, accessToken: res.accessToken}
        })
        .then(res => {
            console.log("Facebook LOGIN SUCCESS",res);

            informParent(res);
            

        })
        .catch(err => {
            console.log("Facebook LOGIN ERROR",err.response);
        })

    }



    return (
        <div className="pb-3">
            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <div onClick={renderProps.onClick} className="shadow p-3 mb-5 bg-white rounded Facebook"><IoLogoFacebook/> Facebook</div>
                )}
            />
        </div>
    )

}


export default Facebook;