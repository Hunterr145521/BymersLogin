import React, {Fragment} from 'react';
import { IoLogoFacebook } from "react-icons/io";
import { AiOutlineLinkedin } from 'react-icons/ai';
import {FcGoogle} from "react-icons/fc";
import { Link, withRouter, Redirect } from 'react-router-dom';
import { isAuth, signout } from '../Components/auth/helper'
import { ToastContainer, toast } from 'react-toastify'
const Layout = ({children, match, history}) => {
    const isActive = path => {
        if (match.path === path){
            return  {
                color: '#000',
                boxShadow: "2px 1px 5px grey"

        }
        }else{
            return { color: 'grey' }
        }
    };


    const signoutUser = () => {
        signout(() => {
            history.push('/');
        })
        toast("Sign out Successfully!");
    }


//     const navbara = () => {
//         return (
//             <nav class="navbar navbar-expand-lg navbar-light bg-light">
//             <Link class="navbar-brand" to="/"><strong>Bymers</strong></Link>
//             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//                 <span class="navbar-toggler-icon"></span>
//             </button>
//         <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
//         <div class="navbar-nav">
//         <Link class="nav-link active" to={"/"} style={isActive('/')}>Home </Link>
//         <div className="col-auto"></div>
//         {!isAuth() && (
//             <Fragment>
//             <Link class="nav-link" to={"/SignIn"} style={isActive('/SignIn')}>Sign In</Link>
//             <Link class="nav-link" to={"/SignUp"} style={isActive('/SignUp')}>Sign Up</Link>
//             </Fragment>
//         )}



//         {isAuth() && isAuth().role ==='admin' && (
//             <Fragment>
//                     <div class="alert-primary nav-link">
//                     <Link to="/admin"> {isAuth().name} </Link>
//                     </div>
//                     &nbsp;
//                     <button type="button" class="btn btn-danger nav-link" onClick={() => {signoutUser();}}>Sign Out</button>
//             </Fragment>
//         )}


//         {isAuth() && isAuth().role ==='subscriber' && (
//             <Fragment>
//                     <div class="alert-primary nav-link">
//                     <Link to="/profile"> {isAuth().name} </Link>
//                     </div>
//                     &nbsp;
//                     <button type="button" class="btn btn-danger nav-link" onClick={() => {signoutUser();}}>Sign Out</button>
//             </Fragment>
//         )}
// </div>
// </div>
// </nav>
//     )
//     }


    const navbar = () => {
        return (
            <nav className="navbar navbar-light navbar-expand-md navigtion-clean-search">
                <div className="container">
                    <Link to={"/"} className="navbar-brand  titles">Bymers</Link>
                    <button data-toggle="collapse" data-target="#navcol-1" className="navbar-toggler"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navcol-1">
                    <form className="form-inline mr-auto" target="_self">
                        <div className="form-group"><label htmlFor="search-field"></label></div>
                    </form>
                    {!isAuth() && (
                    <Fragment>
                    <Link className="nav-link" to={"/SignIn"} style={isActive('/SignIn')}>Sign In</Link>
                    <Link className="nav-link" to={"/SignUp"} style={isActive('/SignUp')}>Sign Up</Link>
                    </Fragment>
                    )}
                    {isAuth() && isAuth().role ==='admin' && (
                        <Fragment>
                                <div className="alert-primary nav-link">
                                <Link to="/admin"> {isAuth().name} </Link>
                                </div>
                                &nbsp;
                                <button type="button" className="btn btn-danger nav-link" onClick={() => {signoutUser();}}>Sign Out</button>
                        </Fragment>
                    )}


                    {isAuth() && isAuth().role ==='subscriber' && (
                        <Fragment>
                                <div class="alert-primary nav-link">
                                <Link to="/profile"> {isAuth().name} </Link>
                                </div>
                                &nbsp;
                                <button type="button" class="btn btn-danger nav-link" onClick={() => {signoutUser();}}>Sign Out</button>
                        </Fragment>
                    )}

                    </div>
                </div>

            </nav>
        )
    }

    const footer  = () => {
        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4"><span className="copyright">Copyright © Bymers 2020</span></div>
                        <div className="col-md-4">
                            <ul className="list-inline social-buttons">
                                <li className="list-inline-item"><a href="#"><strong><i className="fa fa-twitter"><IoLogoFacebook /> Facebook </i></strong></a></li>
                                &nbsp;
                                <li className="list-inline-item"><a href="#"><strong><i className="fa fa-facebook"><FcGoogle /> Google</i></strong></a></li>
                                &nbsp;
                                <li className="list-inline-item"><a href="#"><strong><i className="fa fa-linkedin"><AiOutlineLinkedin color="black"/> LinkedIn</i></strong></a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <ul className="list-inline quicklinks">
                                <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                                <li className="list-inline-item"><a href="#">Terms of Use</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }



    
    
    return (
        <Fragment>
            {navbar()}
                <div>
                    <ToastContainer />
                    {children}
                </div>
            {footer()}
        </Fragment>
    )

}

export default withRouter(Layout);
