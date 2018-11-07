import React, { Fragment } from 'react';
import '../assets/css/login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLogin, setLoginErrorToDefault } from "../actions";
import { Field, reduxForm } from 'redux-form';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.resetLoginError = this.resetLoginError.bind(this);
    }

    userLoggingIn = (values) =>{
        this.props.userLogin(values.username, values.password);
        const resp = this.props.loginResponse.userLoginResponse.data;
        if(resp){
            if(!resp.success){
                this.setState({
                    loginError: ''
                });
            }
        }
    };

    componentDidMount(){

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
    resetLoginError(e){
        this.props.loginDefault();
    }

    render(){
        const resp = this.props.loginResponse.userLoginResponse.data;
        let userLoggedIn = false;
        if(resp){
            userLoggedIn =  resp.success;
        }

        const { handleSubmit } = this.props;

        return (
            userLoggedIn ? `${this.props.history.push('/')}`
                :
                <div className='loginContainer'>
                    <div className='login'>
                        <form className='col' onSubmit={handleSubmit(this.userLoggingIn)}>
                            <div className='input-field col s6'>
                                <i className="material-icons prefix">account_circle</i>
                                <Field name='username' label='Username' type='text' component={this.renderInput} onFocus={this.resetLoginError}/>
                            </div>
                            <div className='input-field col s6'>
                                <i className="material-icons prefix">lock</i>
                                <Field name='password' label='Password' type='password' component={this.renderInput} onFocus={this.resetLoginError}/>
                            </div>
                            { this.props.loginResponse.loginError === false ?
                                <div className='center-align red-text'>
                                    <p>Invalid username and/or password.</p>
                                </div> : ''}
                            <button className='btn btn-block center-block'>Log In</button>
                        </form>
                        <div className='center'>
                            <Link to='/signup'>Sign Up</Link>
                        </div>
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

export default connect(mapStateToProps, {userLogin: userLogin, loginDefault: setLoginErrorToDefault})(Login);