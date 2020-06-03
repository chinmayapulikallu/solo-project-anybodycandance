import React, { Component } from 'react';
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
// import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';




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
    }

});


class MyEvents extends Component {


    componentDidMount() {
        this.getEvents();
    }

    //get function to dispatch when the page loads
    //and get events the dancer is part of
    getEvents = () => {
        this.props.dispatch({ type: 'GET_MY_EVENT' });
    }

    render() {
        const { classes } = this.props;  
        return (
            <div>
                <h2>My Events</h2>
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
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer,
    dancers: reduxState.dancerReducer,
    user: reduxState.user
})

export default (withStyles(useStyles))(connect(putReduxStateOnProps)(MyEvents));