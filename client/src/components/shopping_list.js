import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromShoppingList } from '../actions'

class ShoppingList extends Component{
    render(){
        let list = '';
        if(this.props.shoppingList){
            list = this.props.shoppingList.map((ele, index)=>{
                return <li onClick={()=>this.props.removeFromShoppingList(ele)} key={index}>{ele}</li>
            });

        }

        return (
            <section className="shopping_list">
                <ul start= '1'>Shopping List
                    {list}
                </ul>
            </section>
        );
    }
}

function mapStateToProps(state){
    return {
        shoppingList: state.shoppingList.shoppingList
    }
}

export default connect(mapStateToProps, {removeFromShoppingList})(ShoppingList);