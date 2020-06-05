import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,

    DateTimePicker,
    // TimePicker
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import './AllEvents.css';
import Swal from 'sweetalert2'; 




const useStyles = (theme) => ({
    table: {
        minWidth: 650,
    },
    dateField: {
        // color: theme.palette.common.black,
        // opacity: 1
        pointerEvents: "none",
        fontSize: 30,
        borderBottom: "0px"
    }
    // head: {
    //     backgroundColor: theme.palette.common.black,
    //     color: theme.palette.common.white,
    // }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 30,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

class AllEvents extends Component {


    componentDidMount() {
        this.getEvents();
    }


    //On click renders create event page
    createEvent = () => {
        console.log('in create event');
        this.props.history.push('/create')
    }


    //On click renders dancers list
    viewDancers = () => {
        console.log('in dancers');
        this.props.history.push('/dancer')
    }



    //If an event has to be updated this function dispatches the event id 
    // and updates the event in database
    updateEvent = (id) => {      
        console.log('in update event',id);
        this.props.history.push('/edit/' + id);
    }

    //If an event is cancelled this function dispatches the event id 
    // and deletes the event from database
    deleteEvent = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#dd3',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    text: 'Deleted!',
                    width: 100,
                    padding: '1em',
                    background: '#fff url()',
                    showConfirmButton: false,
                    timer: 1500
                })
        console.log('in delete event', id);
        this.props.dispatch({type: 'DELETE_EVENT', payload: id})
            }
        })

    } 

    // deleteEvent = (id) => {
    //       Swal.fire({
    //                 text: 'Deleted!',
    //                 width: 100,
    //                 padding: '1em',
    //                 background: '#fff url()',
    //                 showConfirmButton: false,
    //                 timer: 1500,
    //             })
    //     console.log('in delete event', id);
    //     this.props.dispatch({type: 'DELETE_EVENT', payload: id})
        
    // }

    // Swal = () => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#dd3',
    //         confirmButtonText: 'Yes!'
    //     }). then (result => {
    //         if(result.value) {
    //             Swal.fire({
    //                 text: 'Deleted!',
    //                 width: 100,
    //                 padding: '1em',
    //                 background: '#fff url()',
    //                 showConfirmButton: false,
    //                 timer: 1500,
    //             })
    //             this.deleteEvent();
    //         }
    //     })

    // }



    //on page loading componentDidMount calls this function
    //to dispatch and get all the events from database
    getEvents = () => {
        this.props.dispatch({type: 'GET_EVENTS'});
    }



    render() {
        const { classes } = this.props;
        console.log("upcoming this.props :: ", this.props)
        return (
            <div className="event-image">
                <Button variant="contained" color="primary"
                    onClick={() => this.createEvent()}>Create Event</Button>
                <Button variant="contained" color="primary"
                    onClick={() => this.viewDancers()}>View Dancers</Button>

                <div>
                    <h2 className="event-title">Events List</h2>
                </div>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.head}>
                        <StyledTableRow>
                            <StyledTableCell>Event Name</StyledTableCell>
                            <StyledTableCell>Location</StyledTableCell>
                            <StyledTableCell>Date & time</StyledTableCell>                 
                            <StyledTableCell>Delete</StyledTableCell>
                            <StyledTableCell>Edit</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.events.map(event => 
                        <StyledTableRow key={event.id}>
                            <StyledTableCell>{event.event_name}</StyledTableCell>
                            <StyledTableCell>{event.event_location}</StyledTableCell>
                            <StyledTableCell>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker className={classes.dateField} value={event.event_date}/>
                                    </MuiPickersUtilsProvider>
                            </StyledTableCell> 
                                <TableCell align="left"><IconButton aria-label="delete" onClick={() => this.deleteEvent(event.id)}>
                                    <DeleteIcon fontSize="large"/></IconButton></TableCell>
                                    <TableCell  align="left"><IconButton aria-label="delete" onClick={() => this.updateEvent(event.id)}>
                                    <EditIcon fontSize="large"/></IconButton></TableCell>                        
                        </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
                <br />
                <br />
                <br />
                <br />

                {/* <div>
                <button onClick={this.handleBack}>Go Back</button>
                </div> */}
            
                    
            </div>

     
            


        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer
})

export default (withStyles(useStyles))(withRouter(connect(putReduxStateOnProps)(AllEvents)));
