import React,{Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Link } from 'react-router-dom';
import './UserPage.css';
import AllEvents from '../AllEvents/AllEvents';
import NewEvent from '../NewEvent/NewEvent';


class UserPage extends Component {

    render() {
        console.log("UserPage :: ", this.props.user)
        let infoData = ''
        if (this.props.user.admin) {
            infoData = (
                <>                              
                    <AllEvents />
                </>
            )
        } else {
            infoData = (
                <>
                  <NewEvent />
                </>                    
            )
        }

        return (
            <div className="user-image">
            <div>
                <h1 id="welcome">
                    Welcome, {this.props.user.username}!
                </h1>
            </div>
            <div>
                {infoData}
                {/* <p>Your ID is: {this.props.user.id}</p> */}
                {/* <LogOutButton className="log-in" /> */}   
            </div>
            </div>
            
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user
})
export default connect(putReduxStateOnProps)(UserPage);




