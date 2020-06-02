import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyEvents extends Component {


    componentDidMount() {
        this.getEvents();
    }

    //get function to dispatch when the page loads
    //and get events the dancer is part of
    getEvents = () => {
        this.props.dispatch({ type: 'GET_MY_EVENT' });
    }

    render() {
        return (
            <div>
                <h2>My Events</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Event Location</th>
                            <th>Event Date & Time</th>      
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.events.map(event => <tr key={event.id}>
                            <td>{event.event_name}</td>
                            <td>{event.event_location}</td>
                            <td>{event.event_date}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer,
    dancers: reduxState.dancerReducer,
    user: reduxState.user
})

export default (connect(putReduxStateOnProps)(MyEvents));