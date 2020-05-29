import React, { Component } from 'react';
import { connect } from 'react-redux';


class Dancers extends Component {
    componentDidMount() {
        this.getDancers();
    }

    editDancer = () => {
        console.log('in edit dancer');
    }

    deleteDancer = (id) => {
        console.log('in delete dancer', id);
        this.props.dispatch({ type: 'DELETE_DANCER', payload: id })
    }


    getDancers = () => {
        this.props.dispatch({ type: 'GET_DANCERS' });
    }

    render() {
        return (
            <div>
                <h1>Dancers</h1>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Contact Number</th>
                            <th>Email Id</th>
                            <th>Delete</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.dancers.map(dancer => <tr key={dancer.id}>
                            <td>{dancer.first_name}</td>
                            <td>{dancer.last_name}</td>
                            <td>{dancer.contact_number}</td>
                            <td>{dancer.email_id}</td>
                            <td><button onClick={() => this.deleteDancer(dancer.id)}>Delete</button></td>
                            <td><button onClick={this.editDancer}>Edit</button></td>
                        </tr>
                        )}
                    </tbody>
                </table>

                {/* <ul>
                    {this.props.dancers.map(dancer => {
                        return (
                            <li key={dancer.id}>{dancer.first_name},{dancer.last_name},{dancer.contact_number}, {dancer.email_id}</li>
                        )
                    })}
                </ul> */}
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    dancers:reduxState.dancerReducer
})

export default connect(putReduxStateOnProps)(Dancers);