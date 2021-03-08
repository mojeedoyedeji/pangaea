import React, {Component} from 'react';
import logo from './logo.svg';
import history from './history';
import './App.css';

import { useDispatch, useSelector, useStore } from "react-redux";
import { Backdrop, CircularProgress} from '@material-ui/core';
import {BrowserRouter as Router, 
  Switch, Route, Link, Redirect, useLocation} from "react-router-dom";
import {MuiThemeProvider} from '@material-ui/core/styles';

import {globalStyles} from './styles/global.js';
//Account
import Default from './screens/default/Main';
import {THEME} from './styles/theme.js'


import Notify from './components/page/Notify';




function App() {
  const loading = useSelector(state => state.main.loading);
  const user = useSelector(state => state.user);
  const classes = globalStyles();
  return (
    <MuiThemeProvider theme={THEME}>
     <Router history={history}>
         <div>
         <Backdrop className={classes.backdrop} open={loading}>
           <CircularProgress color="inherit" />
         </Backdrop>
         <Notify />
         <Switch>
           <Route exact path="/" component={Default} />
         </Switch>
         </div>
       </Router>
     </MuiThemeProvider>
  );
}




const PrivateRoute = ({component: Component, user,  ...rest}) => (
  <Route
    {...rest}
    exact
    render={props => user.loggedIn
    ? (<Component {...props} />) : (<Redirect to={{pathname: "/in"}} />)}
  />)


export default App;
