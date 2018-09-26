import React, { Component } from 'react';
import '../assets/css/ingredient.css';

class Ingredients extends Component{
    render(){
        return (
            <section className="nutrition">
                <ul className="ingredientsList">
                    {this.props.ingredients}
                </ul>
            </section>
        );
    }
}

export default Ingredients;