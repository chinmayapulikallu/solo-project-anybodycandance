import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
   
    DateTimePicker,
    // TimePicker
} from '@material-ui/pickers';


class PostEvent extends Component {

    state = {
        event_name: '',
        event_location: '',
        event_date: new Date(),
        created_date: new Date(),
       
    }

    //Post an event to the database
    addEvent = () => {
        console.log('in addEvent');
        console.log('---->state', this.state)
        this.props.dispatch({type: 'POST_EVENT', payload:this.state}) 
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
            event_date: date,
            created_date: date,
        })
    };


    render() {
        return (
            <div>
                <h1>Add Event</h1>
                <input type="text" placeholder="event name" onChange={(event) => this.handleChange('event_name', event)}/>
                <input type="location" placeholder="location" onChange={(event) => this.handleChange('event_location', event)}/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={this.state.event_date} onChange={this.handleDateChange} />  
                    <DateTimePicker value={this.state.created_date} onChange={this.handleDateChange} />

                    {/* <DatePicker label="Event Date" value={moment(this.state.event_date)} onChange={this.handleDateChange} /> */}
                    {/* <TimePicker
                        margin="normal"
                        label="Time picker"
                        value={this.state.event_time}
                        onChange={this.handleDateChange}
                    /> */}
                    
                    {/* <DatePicker label="created date" value={this.state.created_date} onChange={this.handleDateChange} /> */}
                </MuiPickersUtilsProvider>
               
                <button onClick={this.addEvent}>Add Event</button>

            </div>
        )
    }
}




const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer
})
export default connect(putReduxStateOnProps)(PostEvent);