import React, { Fragment } from 'react';
import '../assets/css/login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLogin } from "../actions";
import { Field, reduxForm } from 'redux-form';

class Login extends React.Component{

    userLoggingIn = (values) =>{
        this.props.userLogin(values.username, values.password);
    };

    componentDidMount(){
        console.log('login_status:', this.props.login_status);

    }

    renderInput(props){
        const {label, type,  input, meta: {touched, error}} =  props;
        return (
            <Fragment>
                <label>{label}</label>
                <input {...input} type={type} autoComplete='off'/>
                <p className='red-text'>{touched && error}</p>
            </Fragment>
        );

    }

    render(){
        const resp = this.props.loginResponse.userLoginResponse.data;
        let userLoggedIn = false;
        if(resp){
            userLoggedIn =  resp.success;
        }

        const { handleSubmit } = this.props;

        return (
            userLoggedIn ? `${this.props.history.goBack()}`
                :
           <div className='login'>
               <form className='col' onSubmit={handleSubmit(this.userLoggingIn)}>
                   <div className='input-field col s6'>
                       <i className="material-icons prefix">account_circle</i>
                       <Field name='username' label='Username' type='text' component={this.renderInput}/>
                   </div>
                   <div className='input-field col s6'>
                       <i className="material-icons prefix">lock</i>
                       <Field name='password' label='Password' type='password' component={this.renderInput}/>
                   </div>
               <button className='btn btn-block center-block'>Log In</button>
               </form>
               <div className='center'>
                <Link to='/signup'>Sign Up</Link>
               </div>
           </div>
        );
    }
}

function mapStateToProps(state){
    return {
        loginResponse: state.userLoginResponse,
    }
}

function validate(values){
    const { username, password } = values;
    const errors = {};

    if(!username){
        errors.username = 'Please enter valid username.';
    }
    if(!password){
        errors.password = 'Please enter correct password.'
    }
    return errors;
}

Login = reduxForm({
    form: 'login-form',
    validate: validate
})(Login);

export default connect(mapStateToProps, {userLogin: userLogin})(Login);