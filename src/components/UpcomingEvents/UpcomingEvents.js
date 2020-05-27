import React, {Component} from 'react';
import {connect} from 'react-redux';


class UpcomingEvents extends Component {
    componentDidMount() {
        this.getEvents();
    }

    getEvents = () => {
        this.props.dispatch({type: 'GET_EVENTS'});
    }

    render() {
        console.log("upcoming this.props :: ", this.props)
        return (
            <div>
               <ul>
                   {this.props.events.map(event => {
                       return (
                           <li key={event.id}>{event.event_name}</li>
                       )
                   })}
               </ul>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer
})

export default connect(putReduxStateOnProps)(UpcomingEvents);