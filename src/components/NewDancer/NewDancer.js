import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NewDancer.css';
//form validator 
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import EmailIcon from '@material-ui/icons/Email';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
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
        width: '30ch',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
        selectEmpty: {
        marginTop: theme.spacing(2),
    },
    

});

class NewDancer extends Component {

    state = {
        user_id:'',
        first_name: '',
        last_name: '',
        contact_number: '',
        email_id: '',
        dance_style: 0
    }

    //captures user inputs 
    handleChange = (name, event) => {
        // console.log('in handleChange', name, event.target.value);
        this.setState({
            ...this.state,
            [name]: event.target.value
        })
    }

    submitDetails = () => {
        this.setState({
            ...this.state,
            user_id: this.props.user.id
        }, () => {
            console.log('in submit hhhh :: ', this.props.user.id, this.state)
            this.props.dispatch({ type: 'SET_DANCER', payload: this.state }) 
        })
        
    }

    render() {
     const { classes } = this.props;  
        return(
            <div className="dancer-form">
                <div className="new-user">
                    <h1>New User Registration</h1>
                </div>
                <TextField
                    label="First Name"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <PermIdentityIcon />
                            </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={(event) => this.handleChange('first_name', event)} 
                />
                <TextField
                    label="Last Name"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <PermIdentityIcon />
                        </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={(event) => this.handleChange('last_name', event)} 
                />
                <TextField
                    label="Contact Number"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                          <AddIcCallIcon />
                        </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={(event) => this.handleChange('contact_number', event)} 
                />
                <TextField
                    label="Email id"
                    id="outlined-start-adornment"
                    className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>,
                    }}
                    variant="outlined"
                    onChange={(event) => this.handleChange('email_id', event)} 
                />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Dance Style</InputLabel>
                    <Select
                        native
                        value={this.state.danceStyle}
                        onChange={(event) => this.handleChange('dance_style', event)}
                        label="Dance Style"
                        inputProps={{
                            name: 'dance style',
                            id: 'outlined-age-native-simple',
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value={1}>Western</option>
                        <option value={2}>Tap dance</option>
                        <option value={3}>Classical</option>
                        <option value={4}>Break Dance</option>
                        <option value={5}>Folk</option>
                        <option value={6}>Modern</option>
                        <option value={7}>Bollywood</option>
                        <option value={8}>Hip-Hop</option>
                        <option value={9}>Semi-classical</option>
                    </Select>
                </FormControl>
                <div className="add-dancer">
                    <Button variant="contained" color="primary"
                    onClick={this.submitDetails}>Submit</Button>
                </div> 
              </div>  

                
          
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    dancer: reduxState.dancer,
    user: reduxState.user
})
export default (withStyles(useStyles))(connect(putReduxStateOnProps)(NewDancer));