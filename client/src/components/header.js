import React, { Component } from 'react';
import '../assets/css/header.css';
import hamicon from '../assets/images/burger-menu.png';
import HamburgerMenu from '../components/hamburger_menu';
import { Link } from 'react-router-dom';
import backButton from '../assets/images/back_arrow.png';
import { connect } from 'react-redux';
import logo from '../assets/images/ourlogo.png';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuShow: false
        }
    }

    hamburgerMenu(){
        this.setState({
            menuShow: !this.state.menuShow,
        });
    }

    backdropClicked(event){
        if(event.target.className === 'menu_backdrop'){
            this.setState({
                menuShow: !this.state.menuShow,
            });
        }
    }

    goBack(){
        this.props.history.goBack();
    }

    displayLogInBtn(){
        if(this.props.location.pathname === '/'){
           return( <Link to='/login'>
                <button className='btn btn-flat white-text btn-small headerBtn'>Login</button>
        </Link> )
        } 
        // else {
        //     return (
        //         <div onClick={this.goBack.bind(this)} className="btn btn-large backArrow">
        //             <i className="material-icons medium" >arrow_back</i>
        //         </div>
        //     )
        // }
    }
    displayBackBtn(){
        return (
            <div onClick={this.goBack.bind(this)} className="btn btn-large backArrow">
                <i className="material-icons medium" >arrow_back</i>
            </div>
        )
    }
    displayHeaderButton(success, username){
        if (this.props.location.pathname === '/'){
            if(success){
                return (<div>
                    <h6 className='center'>Hello, {username}</h6>
                        </div>)
            }else{
                return (this.displayLogInBtn())
            }
        }else{
            if (success) {
                return (<div>
                    <h6 className='center'>Hello, {username}</h6>
                    {this.displayBackBtn()}
                </div>)
            }else {
                return ((this.displayBackBtn()))
            }
        }
    }
    render() {
        let menuClass = this.state.menuShow ? ['menu', 'menu_backdrop'] : ['no_menu', 'no_menu'];
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
            <div className='header'>
                {this.displayHeaderButton(success, username)}
                <div>
                    <Link to='/'>
                        <img src={logo} className="logo"/>
                    </Link>
                </div>
                <div>
                    <img src={hamicon} className='hamicon' onClick={()=>this.hamburgerMenu()}/>
                </div>
                <div className={menuClass[1]} onClick={(event)=>this.backdropClicked(event)}>
                    <div className={menuClass[0]}>
                        <HamburgerMenu hideMenu={()=>this.hamburgerMenu()}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        loginResponse: state.userLoginResponse.userLoginResponse.data
    }
}

export default connect(mapStateToProps, {})(Header);
