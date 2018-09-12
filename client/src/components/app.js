import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/css/app.css';
import Header from './header';
import Landing from './landing';
import Results from './results';
import Recipe from './recipe';
import Favorites from './favorites';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './login_page';
import SignUp from './sign_up';
import AboutUs from './about_us';
import NotFound from '../404/404_page';
import auth from '../hoc/auth';

const App = () => (
    <Router>
        <div>
            <Route path="/" component={Header}/>
            <Route exact path='/' component={Landing}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/login' component={Login}/>
            <Route path='/about_us' component={AboutUs}/>
            <Route path='/recipe/:id' component={Recipe}/>
            <Route path='/results' component={Results}/>
            <Route path='/favorites' component={auth(Favorites, '/login')}/>
            {/*<Route path='/*' component={NotFound}/>*/}
        </div>
    </Router>
);

export default App;
