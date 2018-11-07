import React from 'react';
import '../assets/css/indiv_result.css';
import { Link } from 'react-router-dom';
import '../assets/css/indiv_result.css';

function OneResult(props){

    const {id, imageSrc, title, likes} = props;

    return (
        <div className="resultContainer">
            <Link to={`/recipe/${id}`}>
                <div className="resultRow" key={id}>
                    <div className="foodImg">
                        <img src={imageSrc}/>
                    </div>
                    <div className="title-likes">
                        <div className="resultTitle">{title}</div>
                        <div className="resultLikes">Likes: {likes}</div>
                    </div>
                </div>
            </Link>
        </div>

    );
}

export default OneResult;