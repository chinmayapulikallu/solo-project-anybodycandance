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

import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';


const useStyles = (theme) => ({
    root: {
        // display: 'flex',
        // flexWrap: 'wrap'
    },
    margin: {
        margin: theme.spacing(2),
    },
    withoutLabel: {
        marginTop: theme.spacing(4),
    },
    textField: {
        width: '120ch',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});


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
        this.props.history.push('/home')
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
        const { classes } = this.props; 
        return (
            <div className="edit-event">
                <div className="edit-heading">
                   <h2>Update Event</h2> 
                </div>
                <TextField
                    label="Event Name"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            {this.state.event_name} 
                        </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={(event) => this.handleChange('event_name', event)}
                />
                <TextField
                    label="Event Location"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            {this.state.event_location}
                        </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={(event) => this.handleChange('event_name', event)}
                />
                <TextField
                    label="Event Date & Time"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker  value={this.state.event_date}
                                    onChange={this.handleDateChange} />
                            </MuiPickersUtilsProvider>
                        </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={(event) => this.handleChange('event_name', event)}
                />
                <div>
                    <div className="edit-link">
                        <Button variant="contained" color="primary"
                        onClick={this.updateEvent}>Save Update</Button>
                        <Button variant="contained" color="secondary"
                        onClick={this.handleGoBack}>Go Back</Button>
                    </div>                
                </div>
            </div>
            
        )
    }

}
const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer
})
export default (withStyles(useStyles))(withRouter(connect(putReduxStateOnProps)(UpdateEvent)));