import React, {Component, Fragment} from 'react';
import {getShoppingList, shoppingStatus, deleteFromShoppingListServer} from '../actions';
import '../assets/css/shopping-todo.css';
import {connect} from 'react-redux';


class ShoppingToDo extends Component{
    constructor(props){
        super(props);
        this.userId = '';
    }
    componentDidMount(){
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

    render(){
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
                    status = 'check';
                } else {
                    linethrough = '';
                    btnStyle = 'amber accent-3';
                    check = 'crop_din';
                    status = 'cancel';
                }
                return (
                    <li className="shopTodo" key={ele.id}>
                        <div className="sNo" onClick={()=>this.changeStatus(ele.id, ele.status, ele.user_id)}><i className="material-icons hide-on-small-and-down">{check}</i></div>
                        <div className={`item ${linethrough}`}>{ele.items}</div>
                        <div className="opBtn">
                            <div className="shopDel btn red darken-1" onClick={()=>this.deleteFromShoppingList(ele.user_id, ele.recipe_id, ele.items, ele.id)}><i className="material-icons show-on-small show-on-medium hide-on-large-only">delete</i><span className="show-on-large">Delete</span></div>
                            <div className={`shopDone btn ${btnStyle}`} onClick={()=>this.changeStatus(ele.id, ele.status, ele.user_id)}><i className="material-icons show-on-small show-on-medium hide-on-large-only">{status}</i><span className="show-on-large">{ele.status}</span></div>
                        </div>
                    </li>
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
                    <div className={`operations ${nothingToShop}`}>
                        Operations
                    </div>
                    <ul>
                        {shoppingList.length === 0 ? <div className="nothingToShopHeader"><p>Nothing is in the list. You can add items here from the recipe page to shop for later.</p><div className="nothingToShopImg"></div></div> : shoppingList}
                    </ul>
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