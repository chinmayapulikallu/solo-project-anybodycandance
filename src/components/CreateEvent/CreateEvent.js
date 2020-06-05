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

import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
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
        width: '90ch',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },


});



class CreateEvent extends Component {

    state = {
        event_name: '',
        event_location: '',
        event_date: new Date(),
        event_image: '',
        event_dancer_count: '',
        event_description: '',
        street: '',
        city: '',
        state: '',
        zip: ''
    }

    //Post an event to the database
    addEvent = () => {
        this.props.dispatch({type: 'CREATE_EVENT', payload:this.state}) 
        this.props.history.push('/home');
    }

    //cancels the inputs and goes back to home
    cancelCreate = () => {
        this.props.history.push('/home');
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
        const { classes } = this.props;  
        return (
            <div className="home-image">
                <div className="new-user">
                    <h1>Create Event</h1>
                </div>
                <TextField
                    label="Event_name"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
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
                
                        </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={(event) => this.handleChange('event_location', event)} 
                />
                <TextField
                    label="street"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">

                        </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={(event) => this.handleChange('street', event)}
                />
                <TextField
                    label="city"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">

                        </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={(event) => this.handleChange('city', event)}
                />
                <TextField
                    label="state"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">

                        </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={(event) => this.handleChange('state', event)}
                />
                <TextField
                    label="zip"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">

                        </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={(event) => this.handleChange('zip', event)}
                />

                <TextField
                    label="Event Date & Time"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker  value={this.state.event_date} onChange={this.handleDateChange} />
                            </MuiPickersUtilsProvider>
                        </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={this.handleDateChange}
                />
                <TextField
                    label="Image Path"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                           
                        </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={(event) => this.handleChange('event_image', event)}
                />
                <TextField
                    label="Dancer Count"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <PermIdentityIcon />
                        </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={(event) => this.handleChange('event_dancer_count', event)}
                />
                <TextField
                    id="outlined-start-adornment"
                    label="Event Description"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                           
                        </InputAdornment>,
                    }}
                    multiline
                    rows={6}
                    variant="outlined"
                    onChange={(event) => this.handleChange('event_description', event)}
                />
                <Button variant="contained" color="primary"
                   onClick={this.addEvent}>Create Event</Button>
                <Button variant="contained" color="secondary"
                onClick={this.cancelCreate}>Cancel</Button>
            </div>   
        )
    }
}




const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer
})
export default (withStyles(useStyles))(withRouter(connect(putReduxStateOnProps)(CreateEvent)));