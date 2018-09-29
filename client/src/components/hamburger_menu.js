import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/hamburger.css';
import { connect } from 'react-redux';
import axios from "axios";
import { userLogout } from '../actions';

class HamburgerMenu extends Component{
    logOutUser = async () => {
        this.props.hideMenu();
        console.log('aa:', this.props.userLogout());
    };

    render() {
        let username = '';
        let success = false;
        if(localStorage.userInfo !== undefined){
            username = (JSON.parse(localStorage.userInfo))['firstname'];
            success = (JSON.parse(localStorage.userInfo))['success']
        } else if(this.props.loginResponse){
            username = this.props.loginResponse.username;
            success = this.props.loginResponse.success;
        }
        return (
            <div className='home'>
                <div className='right-align'>
                    <i className='material-icons closeIcon'
                       onClick={this.props.hideMenu}>close</i>
                </div>
                { success ? <div className="greetFont"><i className="material-icons prefix">portrait</i> Hello, <span className="hamMenuGreetingName greetFont">{username}</span></div> : '' }
                <i className='material-icons prefix'>home</i>
                <Link to='/'
                      onClick={this.props.hideMenu} className='menuItem'>&nbsp;Home</Link><br/>
                <i className='material-icons prefix'>favorite</i>
                <Link to='/favorites'
                      onClick={this.props.hideMenu} className='menuItem'>&nbsp;Favorites</Link><br/>
                <i className='material-icons prefix'>group</i>
                <Link to='/about_us'
                      onClick={this.props.hideMenu} className='menuItem'>&nbsp;About Team</Link><br/>
                { success ?
                    <div>
                        <i className='material-icons prefix'>exit_to_app</i>
                        <Link to='/' onClick={this.logOutUser} className='menuItem'>&nbsp;Log out</Link>
                    </div>
                    :
                    <div>
                        <i className='material-icons prefix'>account_circle</i>
                        <Link to='/login'
                               onClick={this.props.hideMenu} className='menuItem'>&nbsp;Log In</Link><br/>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        loginResponse: state.userLoginResponse.userLoginResponse.data,
    }
}

export default connect(mapStateToProps, { userLogout: userLogout })(HamburgerMenu);