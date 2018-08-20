import React, { Component } from 'react';
import '../assets/css/about_us.css';
import Member from './member';

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.members = [
            { name: 'Leah Choi', github: 'a.a', linkedin: 'l.l', image: 'i.i'},
            { name: 'Josh Sohn', github: 'a.a', linkedin: 'l.l', image: 'i.i'},
            { name: 'Sudip Baral', github: 'https://github.com/pujasudip', linkedin: 'https://www.linkedin.com/in/sudip-baral-5a2a96113/', image: 'i.i'},
            { name: 'Sean Prouty', github: 'a.a', linkedin: 'l.l', image: 'i.i'},
        ];
    }
    render() {
        const member = this.members.map((element, index)=>{
            return (
                <Member key={index} name={element.name} github={element.github} linkedin={element.linkedin} image={element.image}/>
            );
        });
        return (
            <div>
                {member}
            </div>
        )
    }
}

export default AboutUs;
