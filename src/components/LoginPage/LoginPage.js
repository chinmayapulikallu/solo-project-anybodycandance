import React, { Component } from 'react';
import { connect } from 'react-redux';
import {InputAdornment, InputLabel, Input} from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';

import './LoginPage.css';

class LoginPage extends Component {
    state = {
        username: '',
        password: '',
    };

    login = (event) => {
        event.preventDefault();

        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'LOGIN',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            });
        } else {
            this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });     
        }
    } // end login

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render() {
        return (
            <div className="home-image">
                {/* {this.props.errors.loginMessage && (
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${this.props.errors.loginMessage}`,
                    })
                )} */}
                {/* {this.props.errors.loginMessage && (
                    <h2
                        className="alert"
                        role="alert"
                    >
                        {this.props.errors.loginMessage}
                    </h2>
                )} */}
                <form className="login-form" onSubmit={this.login}>
                    <h1 className="login-title">Login</h1>
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
                    <input 
                    className="log-in"
                    type="submit"
                    name="submit"
                    value="Log In"
                    />
                    <div className="login-links">
                        <span style={{opacity: .5}}>Don't have an account?</span>
                        <br />
                        <Button variant="contained" color="primary"
                            type="button"
                            className="link-button"
                            onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
                            >
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

                


// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
