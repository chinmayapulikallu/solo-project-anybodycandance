import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';


function* updateEventSaga() {
    yield takeLatest('UPDATE_EVENT', updateEvent);
}


function* updateEvent(action) {
    try {
        console.log('updateEvent :::::::::', action.payload)
        yield axios.put(`/api/events/${action.payload.id}`, { event_name: action.payload.event_name, 
                                          event_location: action.payload.event_location, 
                                          event_date:action.payload.event_date});
    } catch (error) {
        console.log(error)
    }
}



export default updateEventSaga;