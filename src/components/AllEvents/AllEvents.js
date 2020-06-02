import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
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
import './AllEvents.css';



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
        const { classes } = this.props;
        console.log("upcoming this.props :: ", this.props)
        return (
            <div className="event-image">
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

export default (withStyles(useStyles))(withRouter(connect(putReduxStateOnProps)(AllEvents)));
