import React,  { Component }  from "react";
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import Dashboard from '../components/Home/Dashboard';
import Profile from '../components/Auth/Profile';
import Login from '../components/Auth/Login';
import Logout from "../components/Auth/Logout";
import Warehouse from "../components/Warehouse/Index";
import AvailableLocation from "../components/AvailableLocation/Index";
import Merchant from "../components/Merchant/Index";
import Locations from "../components/Locations/Index";
import Permission from  "../components/Permission/Permission";
import Role from  "../components/Role/Role";
import Deliveryman from "../components/Deliveryman/Index";

var user = JSON.parse(localStorage.getItem('user'));
    let isLoggedIn = false;
    if(user != null){
        isLoggedIn = true;
    }else{
        isLoggedIn = false;
    }
    
    const RequireAuth = ({ children }) => {
      if (!isLoggedIn) {
        return <Redirect to="/login" />;
      }
      return children;
    };

   const AppLayout = () => (
      <Switch> 
         <Route  path="/login"> 
            {isLoggedIn ? <Redirect to="/dashboard"/> : <Login/>}
         </Route>
         <RequireAuth>
           <Route exact path="/" component={Dashboard}/>
           <Route path="/dashboard" component={Dashboard}/>
           <Route path="/profile" component={Profile}/>
           <Route path="/permission" component={Permission}/>
           <Route path="/role" component={Role}/>
           <Route path="/warehouse" component={Warehouse}/>
           <Route path="/merchant" component={Merchant}/>
           <Route path="/locations" component={Locations}/>
           <Route path="/available-location" component={AvailableLocation}/>
           <Route path="/deliveryman" component={Deliveryman}/>
           <Route path="/logout" component={Logout} />
         </RequireAuth>
      </Switch>
   );
   export default AppLayout;
