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
    // expand: {
    //     transform: 'rotate(0deg)',
    //     marginLeft: 'auto',
    //     transition: theme.transitions.create('transform', {
    //         duration: theme.transitions.duration.shortest,
    //     }),
    // },
    // expandOpen: {
    //     transform: 'rotate(180deg)',
    // },
    avatar: {
        backgroundColor: red[500],
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
    componentDidMount() {
        this.getEvents();
    }
    getEvents = () => {
        this.props.dispatch({ type: 'GET_NEW_EVENT' });
    }
    render() { 
        const { classes } = this.props;  
        return(
              <>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="left" spacing={9}>
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
                                    <Button variant="contained">Join</Button>
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

            </>  
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer
})
export default (withStyles(useStyles))(connect(putReduxStateOnProps)(NewEvent));
