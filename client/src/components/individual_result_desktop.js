import React from 'react';
import '../assets/css/indiv_result.css';
import { Link } from 'react-router-dom';



function OneResult(props) {
    const { id, imageSrc, title, likes } = props;

    return (
        <Link to={`/recipe/${id}`}>
            <div className='mainContentRecipe'>
                <div className="row resultRow col s4" key={id}>
                    <div id="pictureFrame">
                        <img src={imageSrc} />
                    </div>
                    <div className="titleText"><p>{title}</p></div>
                    <div className="likeTitle">Likes: {likes}</div>
                </div>
            </div>
        </Link>
    );
}

export default OneResult;