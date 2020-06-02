import React,{Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Link } from 'react-router-dom';



class UserPage extends Component {
    render() {
    
           
    
        console.log("UserPage :: ", this.props.user)
        let infoData = ''
        if (this.props.user.admin) {
            infoData = (
                <>             
                    <section className="section-link">
                        <Link to="/event">
                            <h2>All Events</h2>
                        </Link>
                        <Link to="/create">
                            <h2>Post Event</h2>
                        </Link>
                        <Link to="/dancer">
                            <h2>Dancers</h2>
                        </Link>
                        <Link to="/newevent">
                            <h2>New Event</h2>
                        </Link>
                    </section>
                </>
            )
        } else {
            infoData = (
                <>
                   
                    <section className="section-link">
                        {/* <Link to="/newdancer">
                            <h2>New Dancer Registration</h2>
                        </Link> */}
                        <Link to="/newevent">
                            <h2>New Event</h2>
                        </Link>
                        <Link to="/myevent">
                            <h2>My Events</h2>
                        </Link>
                    </section>
                </>
            )
        }

        return (
            <div>
            <div>
                <h1 id="welcome">
                    Welcome, {this.props.user.username}!
                </h1>
            </div>
            <div>
                {infoData}
                {/* <p>Your ID is: {this.props.user.id}</p> */}
                <LogOutButton className="log-in" />
            </div>
            </div>
            
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user
})
export default connect(putReduxStateOnProps)(UserPage);




// // this could also be written with destructuring parameters as:
// // const UserPage = ({ user }) => (
// // and then instead of `props.user.username` you could use `user.username`
// const UserPage = (props) => (
//     <div>
//         <h1 id="welcome">
//             Welcome, {props.user.username}!
//     </h1>
    
//         {/* <p>Your ID is: {props.user.id}</p> */}
//         <LogOutButton className="log-in" />
//     </div>
// );

// // Instead of taking everything from state, we just want the user info.
// // if you wanted you could write this code like this:
// // const mapStateToProps = ({user}) => ({ user });
// const mapStateToProps = state => ({
//     user: state.user,
// });

// // this allows us to use <App /> in index.js
// export default connect(mapStateToProps)(UserPage);