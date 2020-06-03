import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,

    DateTimePicker,
    // TimePicker
} from '@material-ui/pickers';
import { withRouter } from 'react-router-dom';
import  './UpdateEvent.css';


class UpdateEvent extends Component {

    state = {
        id: '',
        event_name: '',
        event_location: '',
        event_date: new Date()
    }

    componentDidMount() {
        //I have used match params id to get the /:id of a particular event
        const currentId = this.props.match.params.id //id in url
        const currentEvent = this.props.events.find(event => event.id === parseInt(currentId))
        console.log("UpdateEvent :: ", currentId, currentEvent)
        this.setState({
            id: currentEvent.id,
            event_name: currentEvent.event_name,
            event_location: currentEvent.event_location,
            event_date: currentEvent.event_date
        })
    }
 
    //If the admin wants to go back to info page this function pushes to '/info'
    handleGoBack = () => {
        console.log('in handleGoBack');
        this.props.history.push('/info')
    }

    //updates state when there is a change in event location
    handleChange = (name, event) => {
        this.setState({
            ...this.state,
            [name]: event.target.value
        })
    }

    //updates date of the event when there is a change
    handleDateChange = (date) => {
        this.setState({
             ...this.state,
            event_date: date
        })
    };

    //Onclick update the event by dispatching the props
    updateEvent = () => {
        console.log('in update event');
        this.props.dispatch({type:'UPDATE_EVENT', payload:this.state})
        this.props.history.push('/home');
    }

    


    render() {
        return (
            <div className="edit-event">
                <div className="edit-heading">
                   <h2>Update Event</h2> 
                </div>
                <div>
                <input type="text" placeholder="event name"
                            value={this.state.event_name} 
                            onChange={(event) => this.handleChange('event_name', event)} />
                 </div>
                 <div>
                    <input type="location" value={this.state.event_location} placeholder="location"
                        onChange={(event) => this.handleChange('event_location', event)} />
                </div>
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker label="event_date"value={this.state.event_date} 
                                                onChange={this.handleDateChange} />
                    </MuiPickersUtilsProvider>
                </div>
                <div>
                    <div className="edit-link">
                        <button onClick={this.updateEvent}>Save Update</button>
                        <button onClick={this.handleGoBack}>Go Back</button>
                    </div>                
                </div>
            </div>
            
        )
    }

}
const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer
})
export default withRouter(connect(putReduxStateOnProps)(UpdateEvent));