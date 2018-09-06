import React, { Component } from 'react';
import '../assets/css/landing.css';
import plus from '../assets/images/plus.png';
import minus from '../assets/images/minus.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchIngredient, addIngredeints, removeIngredients, clearUserIngredientInputs } from '../actions';
//import bg_image from '../assets/images/bg.jpg';
import bg_image from '../assets/images/mobile-bg.png';
import slogan from '../assets/images/chicken_soup.gif';
import commonIngredientsRef from '../assets/dummy_data/commonIngredientsRef';

class LandingPage extends Component {
    foodIndex = 0;

    constructor(props) {
        super(props);
        this.state = {
            currentIngredientInput: '',
            commonIngredients: commonIngredientsRef[this.foodIndex].protein,
        };
    }

    // componentDidMount() {
    //     document.body.style.backgroundImage = `url(${bg_image})`;
    // }

    userInputHandler(event) {
        this.setState({
            currentIngredientInput: event.target.value
        });
    }

    addIngredientToListFromInput(event) {
        let item = '';

        if (event.target) {
            item = this.state.currentIngredientInput.toLowerCase();
            if(item.length === 0){
                return;
            }
        }

        this.props.addIngredient(item);

    }

    addIngredientToListFromButton(item){
        console.log('foodGroup:', this.foodGroup);
        this.foodGroup.shift();
        this.props.addIngredient(item);

        if(this.props.ingredients.length < 2){
            this.setState({
                commonIngredients: commonIngredientsRef[this.foodGroup[0]].food
            });
        }
    }

    removeFromTheIngredient(index) {
        debugger;
        console.log(this.foodGroup);
        this.foodGroup.push(index);
        this.foodGroup.sort();
        this.props.removeIngredient(index);
        const modifiedIngredient = commonIngredientsRef[this.foodGroup[0]].food;
        console.log('modifiedIngredient:', modifiedIngredient);
        this.setState({
            commonIngredients: modifiedIngredient
        });
    }

    clearUserInputs(){
        this.props.clearUserIngredientInputs();
        this.foodGroup = [0,1,2];
    }

    commonFoodCarousel(direction){

        switch(direction){
            case 'left':
                return
        }


        this.setIndex({
            commonIngredients: commonIngredientsRef[this.foodIndex].protein,
        });
    }

    render() {
        console.log('prosp:', this.props.ingredients);
        const colorArray = ['#C98474','#EFB951', '#874C62'];
        const ingredient = this.props.ingredients.map((item, index) => {
            return (<div key={index} className='row'>
                <div className='col s10'>
                    <input value={item} readOnly className='center'/>
                </div>
                <div className='col s2 right-align'>
                    <img id="ingAddMinImg" src={minus} alt='' onClick={() => this.removeFromTheIngredient(index)} />
                </div>
            </div>);
        });

        const commonIngredientsBtns = this.state.commonIngredients.map((item, index) => {

            return (<button className={`btn btn-flat ${colorArray[0]}`} onClick={() => this.addIngredientToListFromButton(item, index)} key={index}>{item}</button>)
        });

        return (
            <div className='container bgImg ' style = {{backgroundImage:`url(${bg_image})`}}>
                <div className='text center'>
                    <h4 className='margin-top-zero'>Enter your Ingredients</h4>
                </div>
                {this.props.ingredients.length < 3 ?
                    <div className='search_field'>
                        <div className='col s12'> 
                            <input placeholder='Insert upto 3 ingredents' className='col s6 left' onChange={(event) => this.userInputHandler(event)} value={this.state.currentIngredientInput} />
                            <img id="ingAddMinImg" src={plus} onClick={this.addIngredientToListFromInput.bind(this)} />
                        </div>
                    </div>
                    :
                    <div className='center purple-text'><h5>Go for the food</h5></div>
                }
                <div className='container'>
                    {ingredient}
                </div>
                {this.props.ingredients.length < 3 ?
                    <div className="ingredientBtns center">
                        <div>
                            <h5 className='commonFoodHeader'>Common Choices</h5>
                        </div>
                        <div className="row s12 valign-wrapper">
                            <div className="col s2">
                                <i className="material-icons" onClick={this.commonFoodCarousel.bind(this)}>chevron_left</i>
                            </div>
                            <div className="col s8">
                                {commonIngredientsBtns}
                            </div>
                            <div className="col s2">
                                <i className="material-icons">chevron_right</i>
                            </div>
                        </div>
                    </div>
                    : ''
                }
                <div>
                    <Link className="landPgSearchBtn btn btn-block center-block" to='/results'>Search</Link>
                    <div className='center' style={this.props.ingredients.length !== 3 ? { 'display': 'none' } : {}}>
                        <button type='button' className='btn btn-flat clearBtn waves-effect' onClick={() => this.clearUserInputs()}>Clear Inputs</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        ingredients: state.search.ingredients
    }

}


const mapActionsToProps = {
    searchIngredient: searchIngredient,
    addIngredient: addIngredeints,
    removeIngredient: removeIngredients,
    clearUserIngredientInputs: clearUserIngredientInputs
};

export default connect(mapStateToProps, mapActionsToProps)(LandingPage);