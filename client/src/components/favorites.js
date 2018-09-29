import React, { Component } from 'react';
import '../assets/css/favorites.css';
import IndividualFavorite from './individual_favorite';
import { getFavorites, deleteFromFavorite } from '../actions';
import { connect } from 'react-redux';

class Favorites extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let id = '';
        if(localStorage.userInfo){
            id = (JSON.parse(localStorage.userInfo))['user_id'];
        } else if(this.props.loginResponse){
            id = this.props.userInfo.user_id;
        }
        this.props.getFavorites(id);
    }

    handleDeleteFav = (user_id, recipe_id) => {
        this.props.deleteFromFavorite(user_id, recipe_id);
    }

    render() {
        let favList = '';
        if(this.props.favorites){
            const favItem = this.props.favorites;
            if(favItem){
                favList = favItem.map((ele)=>{
                    return <IndividualFavorite item={ele} key={ele.ID} delete={this.handleDeleteFav}/>
                });
            }
        }

        return (
            <div>
                {favList}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        favorites: state.favorites.favorites,
        userInfo: state.userLoginResponse.userLoginResponse.data
    }
}

export default connect(mapStateToProps, {getFavorites, deleteFromFavorite})(Favorites);
