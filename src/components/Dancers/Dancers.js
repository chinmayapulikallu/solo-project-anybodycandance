import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import  './Dancers.css';

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



class Dancers extends Component {

    componentDidMount() {
        this.getDancers();
    }

    //If a dancer details  has to be deleted this function deletes the details from 
    //database
    deleteDancer = (id) => {
        console.log('in delete dancer', id);
        this.props.dispatch({ type: 'DELETE_DANCER', payload: id })
    }

    //When the page loads componentDidMount triggers the getDancers function
    //to display on DOM the details of dancers
    getDancers = () => {
        this.props.dispatch({ type: 'GET_DANCERS' });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="event-image">
                     <h1>Dancer List</h1>
                    <div>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead className={classes.head}>
                            <StyledTableRow>
                                <StyledTableCell>First Name</StyledTableCell>
                                <StyledTableCell>Last Name</StyledTableCell>
                                <StyledTableCell>Contact Number</StyledTableCell>
                                <StyledTableCell>Email Id</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.dancers.map(dancer =>
                                <StyledTableRow key={dancer.id}>
                                    <StyledTableCell>{dancer.first_name}</StyledTableCell>
                                    <StyledTableCell>{dancer.last_name}</StyledTableCell>
                                    <StyledTableCell>{dancer.contact_number}</StyledTableCell>
                                    <StyledTableCell>{dancer.email_id}</StyledTableCell>                                    
                                    <TableCell align="left"><IconButton aria-label="delete" onClick={() => this.deleteDancer(dancer.id)}>
                                        <DeleteIcon fontSize="large" /></IconButton>
                                    </TableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table> 
                    </div>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    dancers:reduxState.dancerReducer
})

export default (withStyles(useStyles))(withRouter(connect(putReduxStateOnProps)(Dancers)));
