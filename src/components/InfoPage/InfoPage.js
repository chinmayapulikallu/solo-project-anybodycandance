import React from 'react';
import { Link } from 'react-router-dom';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => (
    <div>
        <h1>Info</h1>
        <Link to="/events">
            <h2>All Events</h2>
        </Link>
        <Link to="/post">
            <h2>Post Event</h2>
        </Link>
        <Link to="/dancers">
            <h2>Dancers</h2>
        </Link>
        <Link to="/newdancer">
            <h2>New Dancer Registration</h2>
        </Link>
        <Link to="/newevent">
            <h2>New Event</h2>
        </Link>
    </div>
);

export default InfoPage;
