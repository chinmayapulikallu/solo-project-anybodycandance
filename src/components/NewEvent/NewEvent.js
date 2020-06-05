import React, {Component} from 'react';
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
import Button from '@material-ui/core/Button';
import './NewEvent.css';
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
        margin:30
    },
    media: {
        height: 250,
        width: 250,
        padding:25
        // height: 0,
        // paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
        width: 60,
    },
    paper: {
        height: 500,
        width: 300,
    },
    control: {
        padding: theme.spacing(2),
    },
    cardPadding: {
        padding:30
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
    },

});



class NewEvent extends Component {
    state = {
        openValue: false,
        currentEvent: {},
    };
    
    componentDidMount() {
        this.getEvents();
    }

    //get function to dispatch when the page loads
    getEvents = () => {
        this.props.dispatch({ type: 'GET_NEW_EVENT'});
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

    //allows user to view events under his account
    handleMyEvents = () => {
        this.props.history.push('/myevent')
    }

    //when a user is interested in an event and clicks join button 
    //this function gets triggered.
    joinEvent = (id) => {
    console.log('in joinEvent', id);
        this.props.dispatch({type: 'JOIN_EVENT', payload:{user_id: this.props.user.id,
                                                          event_id: id}})    
    }


    render() { 
        const { classes } = this.props;
        const openVal = false
        const setOpenVal = {}
        
        return(
            <div className="new-event-image">
                <span className="float-right">
                    <Button variant="contained" color="primary" size="large"
                    onClick={this.handleMyEvents}>My Events</Button>
                </span>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="flex-start" spacing={9}>
                {this.props.events.map(event =>
                    <span key={event.id} className={"spanClass"+event.id}>
                        <Grid item className={classes.cardPadding}>
                        <Card variant="outlined" className={classes.Paper}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        New
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
                                onClick={() => {this.handleOpen(event, classes)}}
                                
                            />
                                
                            <CardContent className="align-center">
                                {/* <Typography variant="body2" color="textSecondary" component="p">
                                    {event.event_description}
                                </Typography> */}
                                    <span>
                                        {event.event_dancer_count > event.current_dancer_count &&
                                        <Button variant="contained" color="primary"
                                        onClick={() => {this.joinEvent(event.id)}}>Join</Button> 
                                        }
                                        {event.event_dancer_count <= event.current_dancer_count &&
                                            <Button variant="outlined" disabled>Its full !!!</Button>
                                        }

                                        {/* {event.event_dancer_count > event.current_dancer_count &&
                                            <Button variant="contained" color="primary"
                                                onClick={() => { this.joinEvent(event.id) }}>Join</Button>
                                        } */}
                                    </span>
                                    
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
                {/* <MapBox />  */}
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
    dancers:reduxState.dancerReducer,
    user: reduxState.user
})

export default (withStyles(useStyles))(withRouter(connect(putReduxStateOnProps)(NewEvent)));
