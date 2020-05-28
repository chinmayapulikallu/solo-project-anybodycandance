import React, { Component } from 'react';
import { connect } from 'react-redux';


class Dancers extends Component {
    componentDidMount() {
        this.getDancers();
    }

    getDancers = () => {
        this.props.dispatch({ type: 'GET_DANCERS' });
    }

    render() {
        return (
            <div>
                <h1>Dancers</h1>
                <ul>
                    {this.props.dancers.map(dancer => {
                        return (
                            <li key={dancer.id}>{dancer.first_name},{dancer.last_name},{dancer.contact_number}, {dancer.email_id}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    dancers:reduxState.dancerReducer
})

export default connect(putReduxStateOnProps)(Dancers);