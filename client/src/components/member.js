import React from 'react';
import '../assets/css/member.css';

function Member(props){
    return (
        <div className='body valign-wrapper memberIndividual'>
            <div className='memberPicture center-align'>
                <img className='memberImg' src={props.image} />
            </div>
            <div className='memberInfo center-block'>
                <h5 className='left-align nameOfPerson'>{props.name}</h5>
                <p className='title'>{props.title} </p>
                <a className='linkedin' href={props.linkedin} target="_blank">Linkedin</a>
                <br/>
                <a className='github' href={props.github} target="_blank">GitHub</a> <br/>
                <a className='github' href={props.portfolio} target="_blank">Portfolio</a>
            </div>
        </div>
    );
}

export default Member;