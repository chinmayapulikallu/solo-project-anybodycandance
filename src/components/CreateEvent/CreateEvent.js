import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
   
    DateTimePicker,
    // TimePicker
} from '@material-ui/pickers';
import './CreateEvent.css';
import { withRouter } from 'react-router-dom';


class CreateEvent extends Component {

    state = {
        event_name: '',
        event_location: '',
        event_date: new Date(),
        event_image: '',
        event_dancer_count: '',
        event_description: ''
    }

    //Post an event to the database
    addEvent = () => {
        console.log('in addEvent');
        console.log('---->state', this.state)
        this.props.dispatch({type: 'CREATE_EVENT', payload:this.state}) 
        this.props.history.push('/info');
    }

    //sets state with new inputs
    handleChange = (name, event) => {
        this.setState({
            ...this.state,
            [name]:event.target.value
        })
    }

    //set state of date
    handleDateChange = (date) => {
        this.setState({
             ...this.state,
            event_date: date
        })
    };


    render() {
        return (
            <div className="post-event">
                <div className="event-name">
                <h1>Add Event</h1>
                </div>
                <div>
                <div>
                    <input type="text" placeholder="event name" 
                    onChange={(event) => this.handleChange('event_name', event)}/>
                </div>
                <div>
                    <input type="location" placeholder="location" 
                    onChange={(event) => this.handleChange('event_location', event)} />
                </div>
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                         <DateTimePicker label="event_date" value={this.state.event_date} onChange={this.handleDateChange} />
                    </MuiPickersUtilsProvider>
                </div> 
                <div>
                    <input type="url" placeholder="image path" 
                    onChange={(event) => this.handleChange('event_image', event)} />
                </div>
                <div>
                    <input type="number" placeholder="dancer count" 
                    onChange={(event) => this.handleChange('event_dancer_count', event)} />
                </div>
                <div>
                    <textarea name="event_description" rows="4" cols="50" 
                    onChange={(event) => this.handleChange('event_description', event)}></textarea>
                </div>
                   
                <div className="add-event">
                    <button onClick={this.addEvent}>Add Event</button>
                </div>    
            </div>
        </div>
        )
    }
}




const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer
})
export default withRouter(connect(putReduxStateOnProps)(CreateEvent));