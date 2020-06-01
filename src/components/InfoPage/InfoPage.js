import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './InfoPage.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {
    render() {
        console.log("InfoPage :: ", this.props.user)
        let infoData = ''
        if (this.props.user.admin) {
            infoData = (
                <>
                <h1 className="info">Info</h1>
                <section className="section-link">
                <Link to="/events">
                    <h2>All Events</h2>
                </Link>
                <Link to="/post">
                    <h2>Post Event</h2>
                </Link>
                <Link to="/dancers">
                    <h2>Dancers</h2>
                </Link>
                    <Link to="/newevent">
                        <h2>New Event</h2>
                    </Link>
                </section>
                </>
            )
        } else {
            infoData = (
                <>
                    <h1 className="info">Info</h1>
                    <section className="section-link">
                <Link to="/newdancer">
                        <h2>New Dancer Registration</h2>
                    </Link>
                    <Link to="/newevent">
                        <h2>New Event</h2>
                </Link>
                    </section>
                </>
            )
        }
        
        return (
            <div>
                {infoData}
                
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user
})
export default connect(putReduxStateOnProps)(InfoPage);
