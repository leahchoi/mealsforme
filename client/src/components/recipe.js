import React, {Component} from 'react';
import '../assets/css/recipe.css';
import emptyHeart from '../assets/images/heart-outline.png';
import redHeart from '../assets/images/heart-icon-red.png';
import Directions from './directions';
import Ingredients from './ingredients';
import ShoppingList from './shopping_list';
import { connect } from 'react-redux';
import { getDetailsById, addToShoppingList, addToFavorite, getFavorites, deleteFromFavorite, setShoppingList, getShoppingList, resetResultsPage } from '../actions';
import wine_up from '../assets/images/wine_up.png';

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: emptyHeart,
            component: 'Directions',
            toastMessageAddFav: 'hideToast',
            toastMessageRemFav: 'hideToast',
            modalClass: 'hideModal',
            wineSlider: '',
            showall: 'ingredientList',
            showHideIcon: 'expand_more',
            tabIndex: 0,
            loginConfirmToast: 'hideLoginToast',
            cancelTimer: 10,
            hideExpandButton: ''
        };
        this.userId = '';
        this.success = '';
        this.handleSelect = this.handleSelect.bind(this);
        this.cancelInterval = null;
        this.timer = 10;
        this.done = false;
        this.heartChanged = false;
    }

    componentWillMount(){
        window.scrollTo(0, 0);
        if((typeof localStorage.userInfo !== undefined) && (typeof localStorage.userInfo !== "undefined")){
            this.userId = (JSON.parse(localStorage.userInfo))['user_id'];
            this.success = (JSON.parse(localStorage.userInfo))['success'];
            this.props.getFavorites(this.userId);
            this.props.getShoppingList(this.userId);
        } else if((typeof this.props.userInfo.data !== undefined) && (typeof this.props.userInfo.data !== "undefined")) {
            this.userId = typeof this.props.userInfo.data.user_id;
            this.props.getFavorites(this.userId);
            this.props.getShoppingList(this.userId);
            this.success = this.props.loginResponse.success;
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
    componentDidUpdate(){
        let overflowedIngredientList = document.getElementById('overflowedOrNot');
        if(!overflowedIngredientList){
            return;
        }
        let clientHeight =  overflowedIngredientList.clientHeight;
        let scrollHeight = overflowedIngredientList.scrollHeight;

        if((scrollHeight <= clientHeight) && !this.done){
            this.setState({
                hideExpandButton: 'hideExpandButton'
            });
        }
        this.done = true;

        const favList = this.props.favorites;
        const recipe_id =  this.props.match.params.id;

        if(favList.length !== 0 && !this.heartChanged){
            for(let item of favList){
                if(item.recipe_id === recipe_id){
                    this.setState({
                        imgSrc: redHeart
                    });
                }
            }
            this.heartChanged = true;
        }
    }

    componentWillUnmount(){
        this.props.resetResultsPage();
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

            this.cancelInterval = setInterval(()=>{
                if(this.timer > 0){
                    this.setState({
                        cancelTimer: --this.timer
                    });
                } else {
                    this.setState({
                        loginConfirmToast: 'hideToast',
                        cancelTimer: 10
                    });
                    this.timer = 10;
                    clearInterval(this.cancelInterval);
                }

            }, 1000);
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

        const amount =  item.measures.us.amount;
        const unitShort = item.measures.us.unitShort;
        let qty = amount + ' ' + unitShort;

        if(this.userId !== ''){
            this.props.setShoppingList(this.userId, recipe_id, item.name, qty)
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
        clearInterval(this.cancelInterval);
        this.setState({
            loginConfirmToast: 'hideLoginToast',
            cancelTimer: 10
        });
        this.timer = 10;
        this.props.history.push('/login');
    }
    cancelLogin(){
        clearInterval(this.cancelInterval);
        this.setState({
            loginConfirmToast: 'hideLoginToast',
            cancelTimer: 10
        });
        this.timer = 10;
    }
    addAllIngredients(ings){
        const recipe_id =  this.props.match.params.id;

        for(let i = 0; i < ings.length; i++){

            const amount =  ings[0].measures.us.amount;
            const unitShort = ings[0].measures.us.unitShort;
            let qty = amount + ' ' + unitShort;

            this.props.setShoppingList(this.userId, recipe_id, ings[i].name, qty);
        }
    }
    render() {
        let directions = '';
        let ingredients = '';
        let pairedWines = '';
        let addAllBtnHide = '';
        if(this.userId === ''){
            addAllBtnHide = 'addAllBtnHide';
        }
        let delayFooterShow = 'delayFooterShow';
        if(typeof this.props.details.data !== undefined && typeof this.props.details.data !== "undefined"){
            if((typeof this.props.details.data.data !== undefined) && (typeof this.props.details.data.data !== "undefined")){
                directions = this.props.details.data.data[0];
                ingredients = JSON.parse(directions.Ingredients);
                pairedWines = JSON.parse(directions.winepairings).pairedWines;
                delayFooterShow = '';
            }
        }
        let ingredientList = '';
        let wineList = '';
        let ingredientsArray = [];

        if(ingredients){
            ingredientList = ingredients.map((ele, index)=>{
                let addOrRemove = 'add_circle';
                let ingListAdded = '';
                let iconColor = 'brown-text';
                let title = 'Click to add to the shopping list.';
                ingredientsArray.push(ele);

                if(this.userId === ''){
                    addOrRemove = 'brightness_1';
                    title = '';
                    iconColor = 'tiny';
                    ingListAdded = 'regularList'
                }

                if(this.userId !== '' && this.props.shoppingList){
                    for(let item of this.props.shoppingList){
                        if(item.items === ele.name){
                            addOrRemove = 'check_circle';
                            ingListAdded = 'ingListAdded badge';
                            iconColor = 'green-text';
                            title = 'Item has been added to the shopping list.';
                        }
                    }
                }
                return <div key={index} onClick={this.addToShopingList.bind(this, ele)} className={`ingList ${ingListAdded}`} title={title}><i className={`material-icons ${iconColor}`}>{addOrRemove}</i>{ele.measures.us.amount} {ele.measures.us.unitShort} {ele.name}</div>
            });
        }
        if(pairedWines){
            wineList = pairedWines.map((ele, index)=>{
                return <li key={index}>{ele}</li>
            });
        }

        return(
        <div className='contain'>
            <div className="heartPic center"><img src= {this.state.imgSrc} onClick={() => this.changeHeart()}></img>
            </div>
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
        </section>
            <section className="dishDetails center">
                <h1>{directions.Name}</h1>
                <h3>Prep & Cooking Time: {directions.Time} mins</h3>
                <p>Vegan Friendly: {this.dietOptions(directions.vegan)}</p>
                <p>Vegetarian Friendly: {this.dietOptions(directions.vegetarian)}</p>
            </section>
                    <h6 className="center">Ingredients</h6>
                    <div className={`btn btn-small ingAddAll ${addAllBtnHide}`} onClick={()=>this.addAllIngredients(ingredientsArray)}>Add All</div>
        <div className={`${this.state.showall}`} id="overflowedOrNot">
            <Ingredients ingredients={ingredientList} />
        </div>
                   <div className={`center expandIngredients ${this.state.hideExpandButton}`}>
                       <i className="material-icons" onClick={()=>this.showHideControl()}>{this.state.showHideIcon}</i>
                   </div>
            <div className='row s12 tabs'>
                {this.success ?
                    <div className={'tab col s6' + (this.state.tabIndex === 0 ? ' activeTab' : '')}
                         title='Directions'
                         onClick={() => this.setStateForComponentRender('Directions')}>Directions</div>
                    :
                    <div className={'tab col s12' + (this.state.tabIndex === 0 ? ' activeTab' : '')}
                                     title='Directions'
                                     onClick={() => this.setStateForComponentRender('Directions')}>Directions</div>
                }
                { this.success ?
                    <div className={'tab col s6' + (this.state.tabIndex === 1 ? ' activeTab' : '')}
                         title='ShoppingList'
                         onClick={() => this.setStateForComponentRender('ShoppingList')}>Shopping List</div>
                    :
                    ''
                }
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
                <div className="loginConfirmMessage center-align"><p>To add to favorite you have to login.</p></div>
                <div className="favConfirmBtns">
                    <div className="btn btn-small favLoginConfirmBtn" onClick={()=>this.confirmLogin()}>OK</div>
                    <div className="btn btn-small favLoginCancelBtn red" onClick={()=>this.cancelLogin()}>Cancel ({this.state.cancelTimer})</div>
                </div>
            </div>
            <div className={`recipeFooter ${delayFooterShow}`}>
                <p>The best ingredient for any food is love.</p>
            </div>
        </div>
        )}
}

function mapStateToProps(state){
    return {
        details: state.search.details,
        userInfo: state.userLoginResponse.userLoginResponse,
        favorites: state.favorites.favorites,
        shoppingList: state.shoppingList.shoppingListServer
    }
}


export default connect(mapStateToProps, {getDetailsById, addToShoppingList, addToFavorite, getFavorites, deleteFromFavorite, setShoppingList, getShoppingList, resetResultsPage})(Recipe);


