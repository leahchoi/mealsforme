import React, {Component} from 'react';
import '../assets/css/recipe.css';
import emptyHeart from '../assets/images/heart-outline.png';
import redHeart from '../assets/images/heart-icon-red.png';
import Directions from './directions';
import Ingredients from './ingredients';
import ShoppingList from './shopping_list';
import { connect } from 'react-redux';
import { getDetailsById, addToShoppingList, addToFavorite, getFavorites, deleteFromFavorite, setShoppingList } from '../actions';
import wine_up from '../assets/images/wine_up.png';

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: emptyHeart,
            addFavText: 'Add to Favorites',
            component: 'Directions',
            toastMessageAddFav: 'hideToast',
            toastMessageRemFav: 'hideToast',
            modalClass: 'hideModal',
            wineSlider: '',
            showall: 'ingredientList',
            showHideIcon: 'expand_more',
            tabIndex: 0,
            loginConfirmToast: 'hideLoginToast'
        };
        this.userId = '';
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount(){
        if((typeof localStorage.userInfo !== undefined) && (typeof localStorage.userInfo !== "undefined")){
            this.userId = (JSON.parse(localStorage.userInfo))['user_id'];
            this.props.getFavorites(this.userId);
        } else if((typeof this.props.userInfo.data !== undefined) && (typeof this.props.userInfo.data !== "undefined")) {
            this.userId = typeof this.props.userInfo.data.user_id;
            this.props.getFavorites(this.userId);
        }
    }

    componentDidMount(){
        const recipe_id =  this.props.match.params.id;
        this.props.getDetailsById(recipe_id);
        const favList = this.props.favorites;

        if(favList.length !== 0){
            for(let item of favList){
                if(item.recipe_id === recipe_id){
                    this.setState({
                        imgSrc: redHeart
                    });
                }
            }
        }
    }

    changeHeart(){
        const recipe_id =  this.props.match.params.id;
        let heartStatus;
        if(this.userId !== ''){
            if(this.state.imgSrc === emptyHeart){
                heartStatus = redHeart;
                this.setState({
                    toastMessageAddFav: 'favToastAdd'
                });
                setTimeout(()=>{
                    this.setState({
                        toastMessageAddFav: 'hideToast'
                    });
                },1100);
                this.props.addToFavorite(this.userId, recipe_id);
            } else {
                heartStatus = emptyHeart;
                this.setState({
                    toastMessageRemFav: 'favToastRem'
                });
                setTimeout(()=>{
                    this.setState({
                        toastMessageRemFav: 'hideToast'
                    });
                },1100);
                this.props.deleteFromFavorite(this.userId, recipe_id);
            }
            this.setState({
                imgSrc: heartStatus
            });
        } else {
            this.setState({
                loginConfirmToast: 'showLoginToast'
            });
        }

    }
    handleSelect(key) {
        alert(`selected ${key}`);
        this.setState({ key: key });
    }

    dynamicComponent(directions){
        const comp = this.state.component;

        switch(comp){
            case 'Directions':
                return <Directions directions={directions}/>;
            case 'ShoppingList':
                return <ShoppingList />;
        }
    }

    setStateForComponentRender(comp, index){
        this.setState({
            component: comp,
            tabIndex: index
        });
    }

    dietOptions(diet){
        if(diet === 1){
            return 'Yes';
        }else{
            return 'No';
        }
    }

    addToShopingList(item){
        const recipe_id =  this.props.match.params.id;

        if(this.userId !== ''){
            this.props.setShoppingList(this.userId, recipe_id, item.name)
        } else {
            this.props.addToShoppingList(item.name);
        }


    }

    clickHandler(){
        this.setState({
            modalClass: this.state.modalClass === 'showModal' ? 'hideModal' : 'showModal',
        });
    }

    showHideControl(){
        var showHide = this.state.showall === 'showall' ? 'ingredientList' : 'showall';
        var controllBtn  = this.state.showHideIcon === 'expand_more' ? 'expand_less' : 'expand_more';
        this.setState({showall: showHide, showHideIcon: controllBtn});
    }
    confirmLogin(){
        this.setState({
            loginConfirmToast: 'hideLoginToast'
        });
        this.props.history.push('/login');
    }
    cancelLogin(){
        this.setState({
            loginConfirmToast: 'hideLoginToast'
        });
    }

    render() {
        let directions = '';
        let ingredients = '';
        let pairedWines = '';
        if(typeof this.props.details.data !== undefined && typeof this.props.details.data !== "undefined"){
            if((typeof this.props.details.data.data !== undefined) && (typeof this.props.details.data.data !== "undefined")){
                directions = this.props.details.data.data[0];
                ingredients = JSON.parse(directions.Ingredients);
                pairedWines = JSON.parse(directions.winepairings).pairedWines;
            }
        }
        let ingredientList = '';
        let wineList = '';

        if(ingredients){
            ingredientList = ingredients.map((ele, index)=>{
                return <li key={index} onClick={this.addToShopingList.bind(this, ele)} className="ingList"><i className="material-icons">check_circle</i>{ele.measures.us.amount} {ele.measures.us.unitShort} {ele.name}</li>
            });
        }
        if(pairedWines){
            wineList = pairedWines.map((ele, index)=>{
                return <li key={index}>{ele}</li>
            });
        }

        return(
        <div className='contain'>
            { this.props.details ?
                <div>
            <section id='mainContent'>
                <div className="pictureContainer">
                    <img src={directions.Image} className="mainPicture" onClick={()=>this.clickHandler()}/>
            </div>
                    <section id='splittingAnimation'>
                    <div className="splittingLine"></div>
                    <div className="splittingLine"></div>
                    </section>
            <div className="heartPic center"><img src= {this.state.imgSrc} onClick={() => this.changeHeart()}></img>
                    <p>{this.state.addFavText}</p>
            </div>
        </section>
            <section className="dishDetails center">
                <h1>{directions.Name}</h1>
                <h3>Prep & Cooking Time: {directions.Time} mins</h3>
                <p>Vegan Friendly: {this.dietOptions(directions.vegan)}</p>
                <p>Vegetarian Friendly: {this.dietOptions(directions.vegetarian)}</p>
            </section>
                    <h6 className="center">Ingredients</h6>
        <div className={`${this.state.showall}`}>
            <Ingredients ingredients={ingredientList} />
        </div>
                   <div className="center expandIngredients">
                       <i className="material-icons" onClick={()=>this.showHideControl()}>{this.state.showHideIcon}</i>
                   </div>
            <div className='row s12 tabs'>
                <div className={'tab col s6' + (this.state.tabIndex===0 ? ' activeTab' : '')} title='Directions' onClick={()=>this.setStateForComponentRender('Directions')}>Directions</div>
                <div className={'tab col s6' + (this.state.tabIndex===1 ? ' activeTab' : '')} title='ShoppingList' onClick={()=>this.setStateForComponentRender('ShoppingList')}>Shopping List</div>
            </div>
            <div>
                {this.dynamicComponent(directions)}
            </div>
                    {
                        wineList.length ?
                            <div className={`wine_pairing_slider valign-wrapper ${this.state.wineSlider}`}>
                                <i className='material-icons wineNavLeft'>navigate_before</i>
                                <p className="wineheader">Wine Pairing</p>
                                <div>
                                    <ul className="winelist">
                                        {wineList}
                                    </ul>
                                </div>
                            </div> : ''

                    }
                </div> : ""}

            <div className={`${this.state.toastMessageAddFav}`}>
                <div className="message"><i className="material-icons prefix">check</i>Added to Favorite</div>
            </div>
            <div className={`${this.state.toastMessageRemFav}`}>
                <div className="message"><i className="material-icons prefix">clear</i>Removed from Favorite</div>
            </div>
            <div className={this.state.modalClass}>
                <div className='inner-content-modal'>
                    <i className='material-icons close' onClick={()=>this.clickHandler()}>close</i>
                    <div className='webpage'>
                        <div className="imageContainer">
                           <img src={directions.Image}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`confirmLogin ${this.state.loginConfirmToast}`}>
                <div className="favConfirmHeader center-align"><h5>Confirm?</h5></div>
                <hr />
                <div className="loginConfirmMessage center-align"><p>To add to favorite you have to login.</p></div>
                <hr />
                <div className="favConfirmBtns">
                    <div className="btn btn-small favLoginConfirmBtn" onClick={()=>this.confirmLogin()}>OK</div>
                    <div className="btn btn-small favLoginCancelBtn red" onClick={()=>this.cancelLogin()}>Cancel</div>
                </div>
            </div>
        </div>
        )}
}

function mapStateToProps(state){
    return {
        details: state.search.details,
        userInfo: state.userLoginResponse.userLoginResponse,
        favorites: state.favorites.favorites,
    }
}


export default connect(mapStateToProps, {getDetailsById, addToShoppingList, addToFavorite, getFavorites, deleteFromFavorite, setShoppingList})(Recipe);


