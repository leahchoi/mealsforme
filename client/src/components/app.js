import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/css/landscapeResponse.css';
import '../assets/css/heightResponsive.css';
import '../assets/css/app.css';
import Header from './header';
import Landing from './landing';
import Results from './results';
import Recipe from './recipe';
import Favorites from './favorites';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './login_page';
import SignUp from './sign_up';
import AboutUs from './about_us';
import NotFound from '../404/404_page';
import auth from '../hoc/auth';
import '../assets/css/desktop_navbar.css';
import ShoppingToDo from "./shopping_todo";

const App = () => (
    <Router>
        <div>
            <Route component={Header}/>
            <Switch>
                <Route exact path='/' component={Landing}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/login' component={Login}/>
                <Route path='/about_us' component={AboutUs}/>
                <Route path='/recipe/:id' component={Recipe}/>
                {/*<Route path='/recipe/:id' render={*/}
                    {/*props => {*/}
                        {/*return <Recipe {...props}/>*/}
                    {/*}*/}
                {/*}/>*/}
                <Route path='/results/:q1/:q2?/:q3?' component={Results}/>
                <Route path='/results' component={Results}/>
                <Route path='/favorites' component={auth(Favorites, '/login')}/>
                <Route path='/shopping-todo' component={auth(ShoppingToDo, '/login')}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
);

export default App;
