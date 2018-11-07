import React, {Component, Fragment} from 'react';
import {getShoppingList, shoppingStatus, deleteFromShoppingListServer} from '../actions';
import '../assets/css/shopping-todo.css';
import {connect} from 'react-redux';


class ShoppingToDo extends Component{
    constructor(props){
        super(props);
        this.userId = '';
        this.state = {
            confirmDeletionDialogBox: 'hideConfirmDelSL'
        }
        this.user_id = '';
        this.recipe_id = '';
        this.item = '';
        this.id = '';
    }
    componentWillMount(){
        if((typeof localStorage.userInfo !== undefined) && (typeof localStorage.userInfo !== "undefined")){
            this.userId = (JSON.parse(localStorage.userInfo))['user_id'];
        } else if((typeof this.props.userInfo !== undefined) && (typeof this.props.userInfo !== "undefined")) {
            this.userId = typeof this.props.userInfo.data.user_id;
        }
        if(this.userId !== ''){
            this.props.getShoppingList(this.userId);
        }
    }

    changeStatus(id, status, userId){
        let newStatus = '';
        if(status === 'complete'){
            newStatus = 'incomplete'
        } else {
            newStatus = 'complete';
        }
        this.props.shoppingStatus(id, newStatus, userId);
    }

    deleteFromShoppingList(user_id, recipe_id, item, id){
        this.props.deleteFromShoppingListServer(user_id, recipe_id, item, id);
    }

    deleteShopLDialog(user_id, recipe_id, item, id){
        this.user_id = user_id;
        this.recipe_id = recipe_id;
        this.item = item;
        this.id = id;

        let confirmDelBody = document.getElementById('shopDelContent');
        confirmDelBody.textContent = this.item + ' ?';

        this.setState({
            confirmDeletionDialogBox: ''
        });
    }

    confirmDeletionShopTodo(confirm){
        if(confirm.toLowerCase() === 'cancel'){
            this.setState({
                confirmDeletionDialogBox: 'hideConfirmDelSL'
            });
        } else if(confirm.toLowerCase() === 'ok') {
            this.setState({
                confirmDeletionDialogBox: 'hideConfirmDelSL'
            });
            this.deleteFromShoppingList(this.user_id, this.recipe_id, this.item, this.id);
        }
    }

    render(){
        if(typeof this.props.shoppingList === "object" && this.props.shoppingList.length === 0){
            return (
                <div className='loading-spinner'><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span className="sr-only">Loading...</span></div>
            );
        }
        let shoppingList = '';
        let nothingToShop = 'nothingToShop';
        if(this.props.shoppingList){
            let linethrough = '';
            let btnStyle = '';
            let check = '';
            let status = '';
            nothingToShop = '';
            shoppingList = this.props.shoppingList.map((ele, index)=>{
                if(ele.status === 'complete'){
                    linethrough = 'taskDone';
                    btnStyle = 'green';
                    check = 'check_box';
                    status = 'done';
                } else {
                    linethrough = '';
                    btnStyle = 'amber accent-3';
                    check = 'crop_din';
                    status = 'shopping_basket';
                }
                return (
                    <div className="shopTodo" key={ele.id}>
                        <div className="sNo" onClick={()=>this.changeStatus(ele.id, ele.status, ele.user_id)}><i className="material-icons hide-on-small-and-down">{check}</i></div>
                        <div className={`item ${linethrough}`}>{ele.items}</div>
                        <div className={`qty ${linethrough}`}>{ele.quantity}</div>
                        <div className="opBtn">
                            {/*<div className="shopDel btn red darken-1" onClick={()=>this.deleteFromShoppingList(ele.user_id, ele.recipe_id, ele.items, ele.id)}><i className="material-icons show-on-small show-on-medium hide-on-large-only">delete</i><span className="show-on-large">Delete</span></div>*/}
                            <div className="shopDel btn red darken-1" onClick={()=>this.deleteShopLDialog(ele.user_id, ele.recipe_id, ele.items, ele.id)}><i className="material-icons show-on-small show-on-medium hide-on-large-only">delete</i><span className="show-on-large">Delete</span></div>
                            <div className={`shopDone btn ${btnStyle}`} onClick={()=>this.changeStatus(ele.id, ele.status, ele.user_id)}><i className="material-icons show-on-small show-on-medium hide-on-large-only">{status}</i><span className="show-on-large">{ele.status}</span></div>
                        </div>
                    </div>
                )
            });
        }
        return (
            <div className="todoWholeContainer">
                <div className="shopping-todo-container">
                    <div className={`sNos hide-on-small-and-down ${nothingToShop}`}>
                        Status
                    </div>
                    <div className={`items ${nothingToShop}`}>
                        Items
                    </div>
                    <div className={`qtys ${nothingToShop}`}>
                        Qty
                    </div>
                    <div className={`operations ${nothingToShop}`}>
                        Operations
                    </div>
                    <div>
                        {shoppingList.length === 0 ? <div className="nothingToShopHeader"><p>Nothing is in the list. You can add items here from the recipe page to shop for later.</p><div className="nothingToShopImg"></div></div> : shoppingList}
                    </div>
                </div>
                <div className={`confirmDeletionSL ${this.state.confirmDeletionDialogBox}`}>
                    <div className="confirmDeletionSLHeader">
                        <h5>Delete Confirm?</h5>
                    </div>
                    <div className="confirmDeletionSLBody">
                        <p id="shopDelContent"></p>
                    </div>
                    <div className="confirmDeletionSLFooter">
                        <div className="btnsSL">
                            <div className="btn btn-small btnSLOk" onClick={()=>this.confirmDeletionShopTodo('ok')}>OK</div>
                            <div className="btn btn-small btnSLCancel" onClick={()=>this.confirmDeletionShopTodo('cancel')}>Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return ({
        shoppingList: state.shoppingList.shoppingListServer
    });
}

export default connect(mapStateToProps, {getShoppingList, shoppingStatus, deleteFromShoppingListServer})(ShoppingToDo);