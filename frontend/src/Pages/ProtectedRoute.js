import {Navigate, Route} from 'react-router-dom';
import React from "react";

function ProtectedRoute({isAuth: isAuth, element: Element, ...rest}) {
    return <Route {...rest} render={(props)=> {
        if(isAuth) {
            return <Element />;
        } else {
            return <Navigate to={{pathname:'/', state: {from: props.location}}}/>;
        }
    }}
    />
   
}


export default ProtectedRoute;