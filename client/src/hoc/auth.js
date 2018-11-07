import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (WrappedComponent, path='/') {
    class Auth extends Component {
        componentDidMount(){
            this.checkAuth();
        }

        componentDidUpdate(){
            this.checkAuth();
        }

        checkAuth(){
            if(!localStorage.userInfo){
                this.props.history.push(path);
            }
        }

        render(){
            return <WrappedComponent {...this.props}/>
        }
    }
    return connect(null)(Auth)
}