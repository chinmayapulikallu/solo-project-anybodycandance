import React, {Component} from 'react';
import {connect} from 'react-redux';


class AllEvents extends Component {
    componentDidMount() {
        this.getEvents();
    }

    //If an event has to be updated this function dispatches the event id 
    // and deletes the event from database
    updateEvent = (event) => {
        console.log('in update event', event);
        this.props.dispatch({type: 'EDIT_EVENT',payload: event })
    }

    //If an event is cancelled this function dispatches the event id 
    // and deletes the event from database
    deleteEvent = (id) => {
        console.log('in delete event', id);
        this.props.dispatch({type: 'DELETE_EVENT', payload: id})
    }



    getEvents = () => {
        this.props.dispatch({type: 'GET_EVENTS'});
    }

    render() {
        console.log("upcoming this.props :: ", this.props)
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Location</th>
                            <th>Date & time</th>
                            <th>Created Date</th>
                            <th>Delete</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.props.events.map(event => <tr key={event.id}>
                        <td>{event.event_name}</td>
                        <td>{event.event_location}</td>
                        <td>{event.event_date}</td>
                        <td>{event.created_date}</td>
                        <td><button onClick={()=> this.deleteEvent(event.id)}>Delete</button></td>
                        <td><button onClick={(event) => this.updateEvent(event)}>Edit</button></td>
                        </tr>
                        )}
                    </tbody>
                </table>
               {/* <ul>
                   {this.props.events.map(event => {
                       return (
                           <li key={event.id}>{event.event_name},{event.event_location},{event.event_date}</li>
                       )
                   })}
               </ul> */}
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer
})

export default connect(putReduxStateOnProps)(AllEvents);