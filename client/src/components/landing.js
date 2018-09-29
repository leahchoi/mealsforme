import React, { Component } from 'react';
import '../assets/css/landing.css';
import plus from '../assets/images/plus.png';
import minus from '../assets/images/minus.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearRecipes, searchIngredient, addIngredeints, removeIngredients, clearUserIngredientInputs } from '../actions';
import bg_image from '../assets/images/mobile-bg.png';
//import bg_image from '../assets/images/dogbg.jpg';
import commonIngredientsRef from '../assets/dummy_data/commonIngredientsRef';
import types from "../actions/types";
import { userLogin, setPageNo, clearSearchedRecipe } from '../actions';
import pageReducer from "../reducers/page_no_reducer";

class LandingPage extends Component {
    foodIndex = 0;
    allowedEntries = 3;

    constructor(props) {
        super(props);
        this.state = {
            currentIngredientInput: '',
            commonIngredients: commonIngredientsRef[this.foodIndex].food,
            remainingEntries: this.allowedEntries,
            zoomBackground: '',
            inputError: '',
            toastMessage: 'hideToast'
        };
    }
    componentDidMount() {
        this.props.clearUserIngredientInputs();
        this.props.setPageNo(0);
    }
//     componentWillUnmount(){
//         this.props.clearRecipes();

//     }
    componentWillUnmount() {
        this.props.clearSearchedRecipe();
        this.props.setPageNo(0);
    }

    componentWillReceiveProps(newProp) {
        // console.log(newProp,'new prop from LP')
    }

    userInputHandler(event) {
        this.setState({
            currentIngredientInput: event.target.value
        });
    }

    addIngredientToListFromInput(event) {
        let item = '';

        if (event.target) {
            item = this.state.currentIngredientInput.toLowerCase();
            if (item.length === 0) {
                return;
            }
        }

        let itemArray = item.split(',');

        if(itemArray.length === 1){
            this.props.addIngredient(item);
        } else if(itemArray.length > 3){
            this.setState({
                toastMessage: ''
            });
            setTimeout(()=>{
                this.setState({
                    currentIngredientInput: '',
                    toastMessage: 'hideToast'
                });
            }, 1000);
            return;
        } else {
            for(let i = 0; i < itemArray.length; i++){
                this.props.addIngredient(itemArray[i]);
            }
        }
        this.setState({
            currentIngredientInput: '',
            remainingEntries: this.allowedEntries - itemArray.length,
        });

    }

    addIngredientToListFromButton(item) {
        this.props.addIngredient(item);
        this.setState({
            remainingEntries: --this.allowedEntries,
        });
        this.commonFoodCarousel('right');
    }

    removeFromTheIngredient(item) {
        let index = this.props.ingredients.indexOf(item);
        // console.log('index: ', index);
        this.setState({
            remainingEntries: ++this.allowedEntries,
        });
        this.props.removeIngredient(index);
        // console.log('aaa:', this.props.ingredients.length);
    }

    clearUserInputs() {
        this.props.clearUserIngredientInputs();
        this.allowedEntries = 3;
        this.setState({
            remainingEntries: this.allowedEntries
        });
    }

    commonFoodCarousel(direction) {
        switch (direction) {
            case 'left':
                this.foodIndex--;
                if (this.foodIndex < 0) {
                    this.foodIndex = 4;
                }
                break;
            case 'right':
                this.foodIndex++;
                if (this.foodIndex > 4) {
                    this.foodIndex = 0;
                }
                break;
            default:
                return;
        }

        this.setState({
            commonIngredients: commonIngredientsRef[this.foodIndex].food,
        });
    }

    goToResultsPage = () => {
        if (this.props.ingredients.length !== 0) {
            this.props.history.push('/results');
        }
    }

    randomAccessCommonFood(index){
        this.foodIndex = index;
        this.setState({
            commonIngredients: commonIngredientsRef[this.foodIndex].food,
        });
    }

    render() {

        const colorArray = ['red accent-1', 'orange accent-1', 'green lighten-3','red lighten-4','amber accent-1'];
        const ingredient = this.props.ingredients.map((item, index) => {
            return (<div key={index} className='ingredients'>
                <div className='chip'>
                    <div className="valign-wrapper">
                        {item}
                        <i className="material-icons clickPointer" onClick={() => this.removeFromTheIngredient(item)}>close</i>
                    </div>
                </div>
            </div>);
        });


        const commonIngredientsBtns = this.state.commonIngredients.map((item, index) => {
            return (<button className={`btn btn-flat ${colorArray[this.foodIndex]}`} onClick={() => this.addIngredientToListFromButton(item, index)} key={index}>{item}</button>)
        });

        let hideBubbles = () => {
            if (this.props.ingredients.length === 3) {
                return { 'display': 'none' };
            }
        };

        return (
            <div className="center bgImg" style={{ backgroundImage: `url(${bg_image})` }}>
            {/* <div className='center bgImg' style={{ background: `linear-gradient( rgba(185, 160, 160, 0.5), rgba(0, 0, 0, 0.5) ), url(${bg_image})` }}> */}


                <div className="main">
                    <div className='text center'>
                        <h4 className='margin-top-zero' style={this.props.ingredients.length === 3 ? { 'display': 'none' } : {}}>Enter your Ingredients</h4>
                    </div>
                    <div className="center">
                        {ingredient}
                    </div>
                    {this.props.ingredients.length < 3 ?
                        <div className='search_field center-block'>
                            <div className="center-block">
                                <input placeholder={this.state.remainingEntries === 3 ?`Insert ${this.state.remainingEntries} Ingredients` : `Insert ${this.state.remainingEntries} more Ingredients`}
                                       className='ingInput center' onChange={(event) => this.userInputHandler(event)}
                                       value={this.state.currentIngredientInput} />
                            </div>
                            <img id="ingAddImg" src={plus} onClick={this.addIngredientToListFromInput.bind(this)} className="center-block" />
                        </div>
                        :
                        <div className='center green-text'><h5>Go for the food</h5></div>
                    }
                    {this.props.ingredients.length < 3 ?
                        <div className="ingredientBtns">
                            <div>
                                <h5 className="commonFoodHeader">Common Choices</h5>
                            </div>
                            <div className="row s12 valign-wrapper">
                                <div className="col s2">
                                    <i className="material-icons medium directionLeft" onClick={this.commonFoodCarousel.bind(this, 'left')}>chevron_left</i>
                                </div>
                                <div className="col s8 center">
                                    {commonIngredientsBtns}
                                </div>
                                <div className="col s2">
                                    <i className="material-icons medium directionRight" onClick={this.commonFoodCarousel.bind(this, 'right')}>chevron_right</i>
                                </div>
                            </div>
                        </div>
                        : ''
                    }
                    <div>
                        <div className="center" style={hideBubbles()}>
                            <div onClick={()=>this.randomAccessCommonFood(0)} className={this.foodIndex === 0 ? 'commonFoodBubbleActive' : 'commonFoodBubble'}>
                            </div>
                            <div onClick={()=>this.randomAccessCommonFood(1)} className={this.foodIndex === 1 ? 'commonFoodBubbleActive' : 'commonFoodBubble'}>
                            </div>
                            <div onClick={()=>this.randomAccessCommonFood(2)} className={this.foodIndex === 2 ? 'commonFoodBubbleActive' : 'commonFoodBubble'}>
                            </div>
                            <div onClick={()=>this.randomAccessCommonFood(3)} className={this.foodIndex === 3 ? 'commonFoodBubbleActive' : 'commonFoodBubble'}>
                            </div>
                            <div onClick={()=>this.randomAccessCommonFood(4)} className={this.foodIndex === 4 ? 'commonFoodBubbleActive' : 'commonFoodBubble'}>
                            </div>
                        </div>
                        <div className="landPgSearchBtn btn btn-block center-block" onClick={this.goToResultsPage}>Search</div>
                        <div className='center' style={this.props.ingredients.length !== 3 ? { 'display': 'none' } : {}}>
                            <button type='button' className='btn btn-flat clearBtn waves-effect' onClick={() => this.clearUserInputs()}>Clear Inputs</button>
                        </div>
                    </div>
                </div>
                <div>
                </div>
                <div className={`ingredientInputError ${this.state.toastMessage}`}>
                    <h5>Enter only three ingredients.</h5>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ingredients: state.search.ingredients,
    }

}

const mapActionsToProps = {
    searchIngredient: searchIngredient,
    addIngredient: addIngredeints,
    removeIngredient: removeIngredients,
    clearUserIngredientInputs: clearUserIngredientInputs,
    setPageNo: setPageNo,
    clearSearchedRecipe: clearSearchedRecipe
};

export default connect(mapStateToProps, mapActionsToProps)(LandingPage);