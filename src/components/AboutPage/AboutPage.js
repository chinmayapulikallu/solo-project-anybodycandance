import React from 'react';
import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
    <div className="about-image">
        <div>
            <h3 className="about-title">Forget your troubles and dance, 
            because dance isn't just dance its Magical, something that sets you free. </h3>
        </div>
    </div>
)

export default AboutPage;

