import React, { useState,useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import {useDispatch, useSelector} from 'react-redux';


export default function MapBox({event}) {

    let dispatch = useDispatch()
    
    let map = useSelector(state => state.mapReducer)

    useEffect( () => {
        dispatch({type: 'GET_COORDINATES', payload: event})
    }, []) 


    console.log("in Map box :: ", event, map)
    const [viewport, setViewport] = useState({
        latitude: map.latitude,
        longitude: map.longitude,
        zoom: 10,
        width: '50vw',
        height: '50vh'
    })
    return <div>
        <ReactMapGL {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/chinmayapulikallu/ckaygy68y0s041hlt61is6sva"
            onViewportChange={viewport => {
                setViewport(viewport)
            }}
        >
            <Marker
                latitude={map.latitude}
                longitude={map.longitude}>
                <div>
                <img src="/images/marker.jpg" alt="marker" width="20px" height="20px" /> 
                </div>
            </Marker>
        </ReactMapGL>
    </div>
}