import React, { Component } from 'react';
import { connect } from 'react-redux';

class Directions extends Component{
    render(){
        let directions = '';
        {(this.props.directions)?
            directions = JSON.parse(this.props.directions.Instructions)[0].steps : ''
        }

        let directionList = '';
        if(directions !== '') {
            let directionListArray = directions.map((ele) => {
                return ele.step;
            });
            directionListArray = directionListArray.join('');
            directionListArray = directionListArray.split('.');
            directionList = directionListArray.map((ele, index) => {
                return <li key={index}>{ele}</li>;
            });
            directionList.pop();
        }
        return (
            <div className="directions">
                <h5>Directions:</h5>
                <ul>
                    {directionList}
                </ul>
            </div>
        );
        
    }
        
    
}

function mapStateToProps(state){
    return {
    }
}

export default connect(mapStateToProps, {})(Directions);
