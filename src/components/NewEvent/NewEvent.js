import React, {Component} from 'react';
import { connect } from 'react-redux';


class NewEvent extends Component {
    componentDidMount() {
        this.getEvents();
    }

    getEvents = () => {
        this.props.dispatch({ type: 'GET_EVENT' });
    }

    render() {
        return(
            <div>
                <h2>New Event</h2>
                <p>{this.props.events.event_name}</p>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    events: reduxState.eventReducer
})
export default connect(putReduxStateOnProps)(NewEvent);
