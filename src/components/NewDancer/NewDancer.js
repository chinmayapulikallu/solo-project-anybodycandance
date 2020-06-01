import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NewDancer.css';

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
        console.log('in handleChange', name, event.target.value);
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
        return(
            <div className="dancer-form">
                <div className="new-user">
                    <h2>New User Registration</h2>
                </div>
                <div>
                <div>
                    <input type="text" placeholder="first name" 
                    onChange={(event) => this.handleChange('first_name', event)}/>
                </div>
                <div>
                    <input type="text" placeholder="last name" 
                    onChange={(event) => this.handleChange('last_name', event)}/>
                </div>
                <div>
                    <input type="text" placeholder="contact number" 
                    onChange={(event) => this.handleChange('contact_number', event)}/>
                </div>
                <div>
                    <input type="text" placeholder="email id" 
                    onChange={(event) => this.handleChange('email_id', event)}/>
                </div>
                <div>
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
                </div>
                <div className="add-dancer">
                    <button onClick={this.submitDetails}>Submit</button>
                </div>   
            </div>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    dancer: reduxState.dancer,
    user: reduxState.user
})
export default connect(putReduxStateOnProps)(NewDancer);