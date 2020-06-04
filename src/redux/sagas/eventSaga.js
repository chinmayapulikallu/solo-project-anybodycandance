import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* eventSaga() {
    yield takeLatest('GET_EVENTS', fetchEvents);
    yield takeLatest('GET_NEW_EVENT', fetchNewEvents);
    yield takeLatest('JOIN_EVENT', joinEvent);
    yield takeLatest('DELETE_EVENT', deleteEvent);
    yield takeLatest('CREATE_EVENT', addEvent);
    yield takeLatest('UPDATE_EVENT', updateEvent);
    yield takeLatest('GET_MY_EVENT', fetchMyEvent);
    yield takeLatest('GET_COORDINATES', fetchCoordinates);

}


function* fetchCoordinates(action) {
    //move to function input event return endpoint
    //const url = buildEndpoint(event)
    const event = action.payload
    const fullAddress = event.street+ " " + event.city+ " " + event.state+ " " + event.Zip
    const endpoint = "https://api.mapbox.com/geocoding/v5/mapbox.places/" 
                        + encodeURI(fullAddress)
                        + ".json?access_token="
                        + process.env.REACT_APP_MAPBOX_TOKEN
    console.log("fetchCoordinates :: ", endpoint)
    //https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiY2hpbm1heWFwdWxpa2FsbHUiLCJhIjoiY2thcmR6YjgzMDZrOTJycGpzajkycGx6YiJ9.Xb8SnTJKy_KcQUC9Gbl-ZA
    try {
        const response = yield axios.get(endpoint);
        console.log(':::::::::', response.data)
        const coordinatesResponse = response.data.features[0].geometry.coordinates
        const coordinates = {latitude: coordinatesResponse[1],
                             longitude: coordinatesResponse[0]}
        console.log("mapbox response :: ", coordinates)
        yield put({ type: 'SET_MAP', payload: coordinates })
    } catch (error) {
        console.log(error)
    }
}


//axios to GET all events from server
function* fetchEvents() {
    try {
        const response = yield axios.get('/api/event');
        console.log(':::::::::',response.data)
        yield put({ type: 'SET_EVENTS', payload: response.data })
    } catch (error) {
        console.log(error)
    }
}

//creates a new event and dispatches to database server
function* addEvent(action) {
    try {
        yield axios.post('/api/event', {
            event_name: action.payload.event_name,
            event_location: action.payload.event_location,
            event_date: action.payload.event_date,
            event_image: action.payload.event_image,
            event_dancer_count: action.payload.event_dancer_count,
            event_description: action.payload.event_description,
            street: action.payload.street,
            city: action.payload.city,
            state: action.payload.state,
            zip: action.payload.zip
        });
        yield put({ type: 'GET_EVENTS' })
    } catch (err) {
        console.log(err)
    }
}


//axios to GET new event from server
function* fetchNewEvents() {
    try {
        const newEventResponse = yield axios.get('/api/event/recent');
        console.log('.......', newEventResponse.data)
        yield put({ type: 'SET_EVENTS', payload: newEventResponse.data  })
    } catch (error) {
        console.log(error);
    }
}


//axios to GET event list a dancer is part of
function* fetchMyEvent() {
    try {
        const myEventResponse = yield axios.get('/api/event/myevent');
        console.log('.......', myEventResponse.data)
        yield put({ type: 'SET_EVENTS', payload: myEventResponse.data })
    } catch (error) {
        console.log(error);
    }
}

//update an event when there's a change in the event
function* updateEvent(action) {
    try {
        console.log('updateEvent :::::::::', action.payload)
        yield axios.put(`/api/event/${action.payload.id}`, {
            event_name: action.payload.event_name,
            event_location: action.payload.event_location,
            event_date: action.payload.event_date
        });
    } catch (error) {
        console.log(error)
    }
}

//dancer can join an event if interested
function * joinEvent(action) {
    try {
        yield axios.post('/api/event/join', action.payload);
        yield put({ type: 'GET_NEW_EVENT' })
}
catch (err) {
        console.log(err)
}
}


//deletes an event from the database
function* deleteEvent(action) {
    try {
        console.log(':::::::::', action.payload)
        yield axios.delete(`/api/event/${action.payload}`);
        yield put({ type: 'GET_EVENTS' });
    } catch (error) {
        console.log(error)
    }
}




export default eventSaga;