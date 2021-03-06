import React, { Component } from 'react';
import '../assets/css/landing.css';
import plus from '../assets/images/plus.png';
import minus from '../assets/images/minus.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchIngredient } from '../actions';
import bg_image from '../assets/images/bg.jpg';
import slogan from '../assets/images/chicken_soup.gif';
<<<<<<< HEAD
// import commonIngredients from "../data/dummydata.json";
=======
import commonIngredientsRef from '../assets/dummy_data/commonIngredientsRef';
>>>>>>> 170d3fb8a1d3fb6709e8d88fb6c85ef766f6ebd2

class LandingPage extends Component {
    // commonIngredientsRef = [
    //     {
    //         'food' : ['beef', 'chicken', 'salmon', 'shrimp', 'crab', 'fish'],
    //         'displayButtons': true},
    //     {
    //         'food' : ['broccoli', 'spinach', 'carrot', 'cucumber', 'potato'],
    //         'displayButtons': false},
    //     {
    //         'food' : ['pepper', 'turmeric','salt', 'sugar', 'honey'],
    //         'displayButtons': false
    //     }
    // ];

    commonFoodIndex = 0;

    constructor(props) {
        super(props);
        this.state = {
            currentIngredientInput: '',
            ingredients: [],
            commonIngredients: ['beef', 'chicken', 'salmon', 'shrimp', 'crab', 'potato', 'fish']
        };
    }

    componentDidMount() {
        // document.body.style.backgroundImage = `url(${bg_image})`;
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
            if(item.length === 0){
                return;
            }
        }

        let index = this.state.commonIngredients.indexOf(item);

        if(index !== -1){
            const newCommonIngredients = this.state.commonIngredients;
            newCommonIngredients.splice(index, 1);
        }


        this.setState({
            currentIngredientInput: '',
            ingredients: [...this.state.ingredients, item],
            // commonIngredients: newCommonIngredients
        });

    }

    addIngredientToListFromButton(item, index){
        this.commonFoodIndex++;
        let newIngredients = this.state.ingredients;
        newIngredients.push(item);

        const newCommonIngredients = this.state.commonIngredients;
        newCommonIngredients.splice(index, 1);

        this.setState({
            ingredients: newIngredients,
            commonIngredients: newCommonIngredients
        });

        console.log(this.commonFoodIndex);

        if(this.commonFoodIndex < 3){
            this.setState({
                commonIngredients: commonIngredientsRef[this.commonFoodIndex].food
            });
        }
    }

    removeFromTheIngredient(index) {
        const newList = this.state.ingredients;
        const item = newList.splice(index, 1);
        let newCommonItems = '';
        if(!this.commonIngredientsRef.includes(item[0])){
            this.setState({
                ingredients: newList,
            });
        } else {
            newCommonItems = [item, ...this.state.commonIngredients];
            this.setState({
                // ingredients: newList,
                commonIngredients: newCommonItems
            });
        }
    }

    render() {
        const colorArray = ['#ffebee red lighten-2', 'green lighten-2', '#795548 brown'];
        const ingredient = this.state.ingredients.map((item, index) => {
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
            return (<button className={`btn btn-flat ${colorArray[this.commonFoodIndex]}`} onClick={() => this.addIngredientToListFromButton(item, index)} key={index}>{item}</button>)
        });

        return (
            <div className='container'>
                <div className='slogan center'>
                    <img src={slogan}/>
                </div>
                {this.state.ingredients.length < 3 ?
                    <div className='search_field'>
                        <div>
                            <input placeholder='Insert upto 3 items' className='center' onChange={(event) => this.userInputHandler(event)} value={this.state.currentIngredientInput} />
                        </div>
                        <div className='center'>
                            <img id="ingAddMinImg" src={plus} onClick={this.addIngredientToListFromInput.bind(this)} />
                        </div>
                    </div>
                    :
                    <div className='center purple-text'><h5>Go for the food</h5></div>
                }
                <div className='container'>
                    {ingredient}
                </div>
                <div>
                    <Link className="landPgSearchBtn btn btn-block center-block" to='/results'>Search</Link>
                </div>
                {this.state.ingredients.length < 3 ?
                    <div className="ingredientBtns center">
                        <div>
                            <h5 className='commonFoodHeader'>COMMON FOODS</h5>
                        </div>
                        {commonIngredientsBtns}
                    </div>
                    : ''
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        src: state.search.userI,
    }

}

export default connect(mapStateToProps, { searchIngredient: searchIngredient})(LandingPage);