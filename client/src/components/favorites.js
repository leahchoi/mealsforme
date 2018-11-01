import React, { Component } from 'react';
import '../assets/css/favorites.css';
import IndividualFavorite from './individual_favorite';
import { getFavorites, deleteFromFavorite } from '../actions';
import { connect } from 'react-redux';

class Favorites extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
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
            <div className="favWholeContainer">
                <div className="favContainer">
                    { favList.length === 0 ? <div className="noFavInList"><p>Nothing here yet, add a recipe to your favorites to remember it for later.</p><div className="noFavInListImg"></div></div> : favList}
                </div>
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
