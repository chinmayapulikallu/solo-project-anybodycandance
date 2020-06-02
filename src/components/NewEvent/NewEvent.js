import React, {Component} from 'react';
import { connect } from 'react-redux';
//material - ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './NewEvent.css';

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
    }

});



class NewEvent extends Component {

    state = {
       
    }

    componentDidMount() {
        this.getEvents();
    }

    //get function to dispatch when the page loads
    getEvents = () => {
        this.props.dispatch({ type: 'GET_NEW_EVENT'});
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
        // let joinEvent = (
        // if(this.props.events.event_dancer_count !== this.props.events.current_dancer_count) {
        //     <Button variant="contained" color="primary"
        //     onClick={() => { this.joinEvent(event.id) }}>Join</Button>
        // )
        // } else {
        //         joinEvent = (
        //             <Button variant="contained" color="primary"
        //               >Full</Button>
        //         )
        // }
        return(
            <div className="new-event-image">
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
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {event.event_description}
                                </Typography>
                                    {event.event_dancer_count > event.current_dancer_count &&
                                    <Button variant="contained" color="primary"
                                    onClick={() => {this.joinEvent(event.id)}}>Join</Button> }
                                    
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
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer,
    dancers:reduxState.dancerReducer,
    user: reduxState.user
})

export default (withStyles(useStyles))(connect(putReduxStateOnProps)(NewEvent));
