import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,

    DateTimePicker,
    // TimePicker
} from '@material-ui/pickers';
import './AllEvents.css';

class AllEvents extends Component {
    componentDidMount() {
        this.getEvents();
    }

    //If an event has to be updated this function dispatches the event id 
    // and deletes the event from database
    updateEvent = (id) => {
        
        
        console.log('in update event',id);
        this.props.history.push('/edit/' + id);
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

    handleBack = () => {
        this.props.history.push('/info');
    }

    render() {
        console.log("upcoming this.props :: ", this.props)
        return (
            <div>
                <div>
                    <h2 className="event-title">Events List</h2>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Location</th>
                            <th>Date & time</th>                 
                            <th>Delete</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.events.map(event => 
                        <tr key={event.id}>
                            <td>{event.event_name}</td>
                            <td>{event.event_location}</td>
                            <td>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker value={event.event_date} disabled/>
                                    </MuiPickersUtilsProvider>
                            </td>                        
                            <td><button onClick={()=> this.deleteEvent(event.id)}>Delete</button></td>
                            <td><button onClick={() => this.updateEvent(event.id)}>Edit</button></td>
                        </tr>
                        )}
                    </tbody>
                </table>
                <br />
                <br />
                <br />
                <br />

                <div>
                <button onClick={this.handleBack}>Go Back</button>
                </div>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer
})

export default withRouter(connect(putReduxStateOnProps)(AllEvents));