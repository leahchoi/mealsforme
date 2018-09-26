import React, {Component} from 'react';
import '../assets/css/recipe.css';
import emptyHeart from '../assets/images/heart-outline.png';
import redHeart from '../assets/images/heart-icon-red.png';
import Directions from './directions';
import Ingredients from './ingredients';
import ShoppingList from './shopping_list';
import { connect } from 'react-redux';
import { getDetailsById, addToShoppingList, addToFavorite, getFavorites, deleteFromFavorite } from '../actions';
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
            showHideIcon: 'control_point',
            tabIndex: 0
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount(){
        const id =  this.props.match.params.id;
        this.props.getDetailsById(id);
    }

    changeHeart(){
        if(!localStorage.userInfo && !this.props.userInfo){
            this.props.history.push('/login');
        }
        let userId = (JSON.parse(localStorage.userInfo))['user_id'] || this.props.userInfo.user_id;
        const recipe_id =  this.props.match.params.id;
        let heartStatus;
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
            this.props.addToFavorite(userId, recipe_id);
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
            this.props.deleteFromFavorite(userId, recipe_id);
        }
        this.setState({
            imgSrc: heartStatus
        });
    }
    handleSelect(key) {
        alert(`selected ${key}`);
        this.setState({ key: key });
    }

    dynamicComponent(directions, index){
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
        this.props.addToShoppingList(item.name);
    }

    clickHandler(){
        this.setState({
            modalClass: this.state.modalClass === 'showModal' ? 'hideModal' : 'showModal',
        });
    }

    showHideControl(){
        var showHide = this.state.showall === 'showall' ? 'ingredientList' : 'showall';
        var controllBtn  = this.state.showHideIcon === 'control_point' ? 'remove_circle_outline' : 'control_point';
        this.setState({showall: showHide, showHideIcon: controllBtn});
    }

    render() {
        let directions = '';
        let ingredients = '';
        let pairedWines = '';
        if(this.props.details){
            directions = this.props.details.data.data[0];
            ingredients = JSON.parse(directions.Ingredients);
            pairedWines = JSON.parse(directions.winepairings).pairedWines;
        }
        let ingredientList = '';
        let wineList = '';

        if(ingredients){
            ingredientList = ingredients.map((ele, index)=>{
                return <li key={index} onClick={this.addToShopingList.bind(this, ele)}>{ele.measures.us.amount} {ele.measures.us.unitShort} {ele.name}</li>
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
                   <div className="center">
                       <i className="material-icons" onClick={()=>this.showHideControl()}>{this.state.showHideIcon}</i>
                   </div>
            <div className='row s12 tabs'>
                <div className={'tab col s4' + (this.state.tabIndex===0 ? ' activeTab' : '')} title='Directions' onClick={()=>this.setStateForComponentRender('Directions', 0)}>Directions</div>
                <div className={'tab col s4' + (this.state.tabIndex===1 ? ' activeTab' : '')} title='ShoppingList' onClick={()=>this.setStateForComponentRender('ShoppingList', 1)}>Shopping List</div>
            </div>
            <div>
                {this.dynamicComponent(directions)}
            </div>
            <div className={`wine_pairing_slider valign-wrapper ${this.state.wineSlider}`}>
                <i className='material-icons wineNavLeft'>navigate_before</i>
                <p className="wineheader">Wine Pairing</p>
                <div>
                    <ul className="winelist">
                        {wineList}
                    </ul>
                </div>
            </div>
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
        </div>
        )}
}

function mapStateToProps(state){
    return {
        details: state.search.details,
        userInfo: state.userLoginResponse.userLoginResponse.data
    }
}


export default connect(mapStateToProps, {getDetailsById, addToShoppingList, addToFavorite, getFavorites, deleteFromFavorite})(Recipe);


