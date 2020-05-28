import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewDancer extends Component {

    state = {
        first_name: '',
        last_name: '',
        contact_number: '',
        email_id: '',
        dance_style: ''
    }

    //captures user inputs 
    handleChange = (name, event) => {
        console.log('in handleChange');
        this.setState({
            ...this.state,
            [name]: event.target.value
        })
    }

    submitDetails = () => {
        console.log('in submit ');
        console.log('---->state', this.state)
        this.props.dispatch({ type: 'SET_DANCER', payload: this.state }) 
    }




    render() {
        return(
            <div>
                <h2>New User Registration</h2>
                <input type="text" placeholder="first name" onChange={(event) => this.handleChange('first_name', event)}/>
                <input type="text" placeholder="last name" onChange={(event) => this.handleChange('last_name', event)}/>
                <input type="text" placeholder="email" onChange={(event) => this.handleChange('contact_number', event)}/>
                <input type="text" placeholder="contact number" onChange={(event) => this.handleChange('email_id', event)}/>
                <select onChange={(event) => this.handleChange('dance_style', event)}>
                    <option value="0">Western</option>
                    <option value="1">Tap dance</option>
                    <option value="2">Classical</option>
                    <option value="3">Break dance</option>
                    <option value="4">Folk</option>
                    <option value="5">Modern</option>
                    <option value="6">Bollywood</option>
                    <option value="7">Hip-Hop</option>
                    <option value="6">Semi-Classical</option>
                </select>
                <button onClick={this.submitDetails}>Submit</button>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    dancer: reduxState.dancer
})
export default connect(putReduxStateOnProps)(NewDancer);