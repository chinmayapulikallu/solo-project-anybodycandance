import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//material - ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';
import './MyEvents.css';
//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MapBox from '../MapBox/MapBox';



const useStyles = (theme) => ({
    root: {
        // maxWidth: 345,
        borderColor: 'red',
        // backgroundColor: '#80deea',
        flexGrow: 1,
        margin: 30
    },
    media: {
        height: 250,
        width: 250,
        padding: 25
        // height: 0,
        // paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
        width: 40,
    },
    paper: {
        height: 500,
        width: 300,
    },
    control: {
        padding: theme.spacing(2),
    },
    cardPadding: {
        padding: 30
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        maxWidth: "70%",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }

});


class MyEvents extends Component {

    state = {
        openValue: false,
        currentEvent: {},
    };

    componentDidMount() {
        this.getEvents();
    }

    //get function to dispatch when the page loads
    //and get events the dancer is part of
    getEvents = () => {
        this.props.dispatch({ type: 'GET_MY_EVENT' });
    }

    //Once the user views events redirects to home page
    handleHome = () => {
        this.props.history.push('/home');
    }

    //modal function to display when clicked on image
    handleOpen = (event, classes) => {
        console.log("in handleOpen :: ", event, classes)
        this.setState({
            ...this.state,
            currentEvent: event,
            openValue: true,
        });
    };

    //closes modal on click
    handleClose = () => {
        this.setState({
            openValue: false,
        });
    };

    render() {
        const { classes } = this.props;  
         const openVal = false
        const setOpenVal = {}
        return (
            <div>
                
                <div className="new-event-image">
                    <Button variant="contained" color="secondary"
                        onClick={this.handleHome}>Back Home</Button>
                    <h2 className="my-title">My Events</h2>
                    <Grid container className={classes.root} spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify="flex-start" spacing={9}>
                                {this.props.events.map(event =>
                                    <span key={event.id}>
                                        <Grid key={event.id} item className={classes.cardPadding}>
                                            <Card variant="outlined" className={classes.paper}>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                                            <CheckCircleIcon />
                                                        </Avatar>
                                                    }
                                                    action={
                                                        <IconButton aria-label="settings">
                                                        </IconButton>
                                                    }
                                                    title={event.event_name}
                                                />
                                                <CardMedia
                                                    component="img"
                                                    className={classes.media}
                                                    image={event.event_image}
                                                    onClick={() => { this.handleOpen(event, classes) }}
                                                />
                                                <CardContent>
                                                    {/* <Typography variant="body2" color="textSecondary" component="p">
                                                        {event.event_description}
                                                    </Typography> */}
                                                    {/* {event.event_dancer_count > event.current_dancer_count &&
                                                        <Button variant="contained" color="primary"
                                                            onClick={() => { this.joinEvent(event.id) }}>Join</Button>} */}

                                                </CardContent>
                                                <CardActions>

                                                </CardActions>
                                            </Card>
                                        </Grid>

                                    </span>
                                )}

                            </Grid>
                        </Grid>

                    </Grid>
                </div> 
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.openValue}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.openValue}>
                        <div className={classes.modalPaper}>
                            <h3>{this.state.currentEvent.event_name}</h3>
                            <p>{this.state.currentEvent.event_description}</p>
                            <MapBox event={this.state.currentEvent} />
                        </div>
                    </Fade>
                </Modal>               
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer,
    dancers: reduxState.dancerReducer,
    user: reduxState.user
})

export default (withStyles(useStyles))(withRouter(connect(putReduxStateOnProps)(MyEvents)));