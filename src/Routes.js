import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './Components/auth/SignIn';
import SignUp from './Components/auth/SignUp';
import Activate from './Components/auth/Activation';
import PrivateRoute from './Components/auth/PrivateRoute'
import Profile from './Components/Private/Profile';
import Admin from './Components/Admin/Admin';
import AdminRoute from './Components/auth/AdminRoute';
import App from './App';
import ForgotPassword from './Components/auth/forgotPassword';
import ResetPassword from './Components/auth/resetPassword';



const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/SignIn" component={SignIn}/>
                <Route  path="/SignUp" component={SignUp} />
                <Route  path="/auth/activate/:token" component={Activate} />
                <Route  path="/forgot" component={ForgotPassword} />
                <Route  path="/auth/password/reset/:passwordResetToken" component={ResetPassword} />
                <AdminRoute  path="/admin" component={Admin} />
                <PrivateRoute  path="/profile" component={Profile} />
            </Switch>
        </BrowserRouter>
    )
}


export default Routes;
