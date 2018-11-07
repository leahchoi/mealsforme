import React, { Component } from 'react';
import '../assets/css/ingredient.css';

class Ingredients extends Component{
    render(){
        return (
            <section className="nutrition">
                <div className="ingredientsList">
                    {this.props.ingredients}
                </div>
            </section>
        );
    }
}

export default Ingredients;