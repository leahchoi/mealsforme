import React, { Component } from 'react';
import '../assets/css/about_us.css';
import Member from './member';
import leah from '../assets/images/leah-min.jpg';
import sudip from '../assets/images/sudip-min.jpg';
import sean from '../assets/images/sean-min.jpg';
import josh from '../assets/images/josh-min.jpg';


class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.members = [
            { name: 'Leah Choi',title:'Team lead / Frontend developer', github: 'https://github.com/leahchoi', linkedin: 'https://www.linkedin.com/in/soorachoi/', portfolio: 'https://soorachoi.com/', image: leah},
            { name: 'Josh Sohn',title:'Backend developer', github: 'https://github.com/sohnOfGod', linkedin: 'https://www.linkedin.com/in/joshsohn93/', portfolio: 'https://joshsohn.co/', image: josh},
            { name: 'Sudip Baral',title:'Frontend developer', github: 'https://github.com/pujasudip', linkedin: 'https://www.linkedin.com/in/sudip-baral-5a2a96113/', portfolio: 'https://codingbaral.com', image: sudip},
            { name: 'Sean Prouty',title:'Backend developer', github: 'https://github.com/prouty411', linkedin: 'https://www.linkedin.com/in/sean-prouty-129243167/', portfolio: 'https://sean-prouty.com/', image: sean},
        ];
    }

    render() {
        const member = this.members.map((element, index)=>{
            return (
                <Member key={index}
                        name={element.name}
                        title={element.title}
                        github={element.github}
                        linkedin={element.linkedin}
                        portfolio={element.portfolio}
                        image={element.image} />
            );
        });
        return (
            <div className='containerAboutUs'>
                {member}
            </div>
        )
    }
}

export default AboutUs;
