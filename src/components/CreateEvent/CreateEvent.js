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
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Button from '@material-ui/core/Button';


const useStyles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
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
    buttonMargin: {
        margin: 15
    },
    dateField: {
        width: 150
    }

});



class CreateEvent extends Component {

    state = {
        event_name: '',
        event_location: '',
        event_date: new Date(),
        event_image: '',
        event_dancer_count: '',
        event_description: `` ,                
        street: '',
        city: '',
        state: '',
        zip: ''
    }

    autoFillForm = () => {
        this.setState({
            event_name: 'Arts Alliance',
            event_location: 'Mall Of America',
            event_date: new Date(),
            event_image: 'https://i0.wp.com/ww2.panasianartsalliance.org/wp-content/uploads/2019/03/front.jpg?resize=768%2C505',
            event_dancer_count: '4',
            event_description: `The 8th Annual Pan Asian Arts Festival returns to the Mall of America on Saturday, May 4th from 11 AM to 8 PM. The event is open and free to the public.
                        
                                THEME: NEW YEAR PARTY,
                                PARTICIPANT AGE: 10-15 Years,
                                COSTUME: WILL UPDATE SOON!!!` ,
            street: '60 East Broadway',
            city: 'Bloomington',
            state: 'MN',
            zip: '55425'
        })
    }

    //Post an event to the database
    addEvent = () => {
        this.props.dispatch({type: 'CREATE_EVENT', payload:this.state}) 
        this.props.history.push('/home');
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Event is posted',
            showConfirmButton: false,
            timer: 1000
            })
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
                <div>
                    <h1>Create Event</h1>
                </div>
                <div className="center-container">
                    <Button onClick={this.autoFillForm}></Button>
                    <TextField
                        label="Event_name"
                        id="outlined-start-adornment"
                        value={this.state.event_name}
                        className={clsx(classes.margin, classes.textField)}
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start">
                        //     </InputAdornment>,
                        // }}
                        variant="outlined"
                        onChange={(event) => this.handleChange('event_name', event)}
                    />
                    <TextField
                        label="Event Location"
                        id="outlined-start-adornment"
                        className={clsx(classes.margin, classes.textField)}
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start">
                    
                        //     </InputAdornment>,
                        // }}
                        variant="outlined"
                        value={this.state.event_location}
                        onChange={(event) => this.handleChange('event_location', event)} 
                    />
                    <TextField
                        label="street"
                        id="outlined-start-adornment"
                        className={clsx(classes.margin, classes.textField)}
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start">

                        //     </InputAdornment>,
                        // }}
                        variant="outlined"
                        value={this.state.street}
                        onChange={(event) => this.handleChange('street', event)}
                    />
                    <TextField
                        label="city"
                        id="outlined-start-adornment"
                        className={clsx(classes.margin, classes.textField)}
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start">

                        //     </InputAdornment>,
                        // }}
                        variant="outlined"
                        value={this.state.city}
                        onChange={(event) => this.handleChange('city', event)}
                    />
                    <TextField
                        label="state"
                        id="outlined-start-adornment"
                        className={clsx(classes.margin, classes.textField)}
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start">

                        //     </InputAdornment>,
                        // }}
                        variant="outlined"
                        value={this.state.state}
                        onChange={(event) => this.handleChange('state', event)}
                    />
                    <TextField
                        label="zip"
                        id="outlined-start-adornment"
                        className={clsx(classes.margin, classes.textField)}
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start">

                        //     </InputAdornment>,
                        // }}
                        variant="outlined"
                        value={this.state.zip}
                        onChange={(event) => this.handleChange('zip', event)}
                    />

                    <TextField
                        label="Event Date & Time"
                        id="outlined-start-adornment"
                        className={clsx(classes.margin, classes.textField)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DateTimePicker className={classes.dateField} value={this.state.event_date} onChange={this.handleDateChange} />
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
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start">
                            
                        //     </InputAdornment>,
                        // }}
                        variant="outlined"
                        value={this.state.event_image}
                        onChange={(event) => this.handleChange('event_image', event)}
                    />
                    <TextField
                        label="Dancer Count"
                        id="outlined-start-adornment"
                        className={clsx(classes.margin, classes.textField)}
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start">
                        //         <PermIdentityIcon />
                        //     </InputAdornment>,
                        // }}
                        variant="outlined"
                        value={this.state.event_dancer_count}
                        onChange={(event) => this.handleChange('event_dancer_count', event)}
                    />
                    <TextField
                        id="outlined-start-adornment"
                        label="Event Description"
                        className={clsx(classes.margin, classes.textField)}
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start">
                            
                        //     </InputAdornment>,
                        // }}
                        multiline
                        rows={6}
                        variant="outlined"
                        value={this.state.event_description}
                        onChange={(event) => this.handleChange('event_description', event)}
                    />
                    <div className="create-event">
                        <Button variant="contained" color="primary" className={classes.buttonMargin}
                        onClick={this.addEvent}>Create Event</Button>
                        <Button variant="contained" color="secondary" className={classes.buttonMargin}
                        onClick={this.cancelCreate}>Cancel</Button>
                    </div>
                </div>
            </div>   
        )
    }
}




const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer
})
export default (withStyles(useStyles))(withRouter(connect(putReduxStateOnProps)(CreateEvent)));