import React from 'react';
import { Route } from 'react-router-dom';


const  PrivateRoute =  ({ component: Component, roles,status,isLoggedIn,...rest }) => {

   return( <Route {...rest} render={({props }) => {
        return (<Component {...props} />)
    }} />)
}
export default  PrivateRoute
