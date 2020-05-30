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


class EditEvent extends Component {

    state = {
        event_name: '',
        event_location: '',
        event_date: new Date()
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="event name" onChange={(event) => this.handleChange('event_name', event)} />
                <input type="location" placeholder="location" onChange={(event) => this.handleChange('event_location', event)} />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker value={this.state.event_date} onChange={this.handleDateChange} />
                    <DateTimePicker value={this.state.created_date} onChange={this.handleDateChange} />
                </MuiPickersUtilsProvider>
                <button>Save Update</button>
            </div>
            
        )
    }

}
const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer
})
export default withRouter(connect(putReduxStateOnProps)(EditEvent));