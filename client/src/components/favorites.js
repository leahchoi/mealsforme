import React, { Component } from 'react';
import '../assets/css/favorites.css';
import IndividualFavorite from './individual_favorite';
import { getFavorites, deleteFromFavorite } from '../actions';
import { connect } from 'react-redux';

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDeletionDialogBox: 'hideConfirmDelFav',
            showedSpinner: false
        }
        this.user_id = '';
        this.recipe_id = '';
        this.count  = 0;
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

    handleDeleteFav = (user_id, recipe_id, name) => {
        this.user_id = user_id;
        this.recipe_id = recipe_id;

        let confirmDelBody = document.getElementById('favDelContent');
        confirmDelBody.textContent = name + ' ?';

        this.setState({
            confirmDeletionDialogBox: ''
        });
    }

    confirmDeletionFav(confirm){
        if(confirm.toLowerCase() === 'cancel'){
            this.setState({
                confirmDeletionDialogBox: 'hideConfirmDelFav'
            });
        } else if(confirm.toLowerCase() === 'ok') {
            this.setState({
                confirmDeletionDialogBox: 'hideConfirmDelFav'
            });
            this.props.deleteFromFavorite(this.user_id, this.recipe_id);
        }
    }

    render() {
        let favList = '';
        if(typeof this.props.favorites === "object" && this.props.favorites.length === 0){
            return (
                <div className='loading-spinner'><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span className="sr-only">Loading...</span></div>
            );
        }
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
                    { this.props.favorites === '' ? <div className="noFavInList"><p>Nothing here yet, add a recipe to your favorites to remember it for later.</p><div className="noFavInListImg"></div></div> : favList}
                </div>
                <div className={`confirmDeletionFav ${this.state.confirmDeletionDialogBox}`}>
                    <div className="confirmDeletionFavHeader">
                        <h5>Delete Confirm?</h5>
                    </div>
                    <div className="confirmDeletionFavBody">
                        <p id="favDelContent"></p>
                    </div>
                    <div className="confirmDeletionFavFooter">
                        <div className="btnsFav">
                            <div className="btn btn-small btnFavOk" onClick={()=>this.confirmDeletionFav('ok')}>OK</div>
                            <div className="btn btn-small btnFavCancel" onClick={()=>this.confirmDeletionFav('cancel')}>Cancel</div>
                        </div>
                    </div>
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
