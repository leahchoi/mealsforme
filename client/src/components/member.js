import React from 'react';
import '../assets/css/member.css';

function Member(props){
    return (
        <div className='body valign-wrapper memberIndividual'>
            <div className='memberPicture center-align'>
                <img className='memberImg' src={props.image} />
            </div>
            <div className='memberInfo'>
                <h5 className='left-align nameOfPerson'>{props.name}</h5>
                <p className='title'>{props.title} </p>
                <a className='linkedin' onClick={()=>props.clicked(props.linkedin)}>Linkedin</a>
                <br/>
                <a className='github' onClick={()=>props.clicked(props.github)} className='left-align'>GitHub</a>
            </div>
        </div>
    );
}

export default Member;