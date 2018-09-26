import React from 'react';
import './404_page.css';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className="wholePage">
            <div className="textContainer center">
                <h4>
                    Page Not Found
                </h4>
                <div>
                    <Link to="/">
                        <button className="btn btn-small goHome">
                            Go Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}