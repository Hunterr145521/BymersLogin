import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { isAuth } from  '../auth/helper';

const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isAuth() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/SignIn",
                        state: { from : props.location}
                    }}
                />
            )
        }
        ></Route>    
);


export default PrivateRoute;


