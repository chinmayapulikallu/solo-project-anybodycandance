import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputAdornment, InputLabel, Input } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import './RegisterPage.css';
import { withRouter } from 'react-router-dom';


class RegisterPage extends Component {
    state = {
        username: '',
        password: '',
    };

    registerUser = (event) => {
        event.preventDefault();

        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'REGISTER',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            });
            this.props.history.push('/newdancer')
        } else {
            this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
        }
    } // end registerUser

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render() {
        return (


            <div className="home-image">
                {/* {this.props.errors.registrationMessage && (
                    <h2
                        className="alert"
                        role="alert"
                    >
                        {this.props.errors.registrationMessage}
                    </h2>
                )} */}
                <form className="login-form" onSubmit={this.registerUser}>
                    <h1 className="title">Register User</h1>
                    <div>
                        <InputLabel htmlFor = "input-with-icon-adornment">Username</InputLabel>
                        <Input 
                            startAdornment={
                                <InputAdornment position="start">
                                    <PermIdentityIcon />
                                </InputAdornment>
                            }
                            label="Username"
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInputChangeFor('username')}
                        />
                    </div>
                    <br/>
                    <div>
                        <InputLabel htmlFor = "input-with-icon-adornment">Password</InputLabel>
                        <Input
                            startAdornment={
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            }
                            label="Password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChangeFor('password')}
                        />
                        <br />
                        <br />
                    </div>
                    <div>
                        <input
                            className="register"
                            type="submit"
                            name="submit"
                            value="Register"
                        />
                    </div>
                    <div className="login-links">
                        <span style={{ opacity: .5 }}>Already have an account?</span>
                       
                    <center>
                        <Button variant="contained" color="primary"
                            type="button"
                            className="link-button"
                            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
                            >
                            Login
                        </Button>                  
                    </center>
                    </div>
                    </form>
                    
                </div>
        )                           
    }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
    errors: state.errors,
});

export default withRouter(connect(mapStateToProps)(RegisterPage));

