import React from 'react';
import { Link } from 'react-router-dom';

function OneResult(props){
    let style = {
        'width': '120px',
        'border': '2px solid #7F977C'
    };

    const {id, imageSrc, title, likes} = props;

    return (
        <Link to={`/recipe/${id}`}>
            <div className=''>
                <div className="row resultRow" key={id}>
                    <div className="col s5 " id="pictureFrame">
                        <img src={imageSrc} style={style}/>
                    </div>
                    <div className="col s6"id="titleText">{title}</div>
                    <div className="col s6 likeTitle">Likes: {likes}</div>
                </div>
            </div>
        </Link>
    );
}

export default OneResult;