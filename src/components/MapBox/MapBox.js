import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

export default function MapBox() {
    console.log(process.env.REACT_APP_MAPBOX_TOKEN)
    const [viewport, setViewport] = useState({
        latitude: 44.986656,
        longitude: -93.258133,
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
                latitude={44.854300499999994}
                longitude={-93.24217}>
                <div>
                    <img src="marker.jpg" width="25px" height="25px" />
                </div>

            </Marker>


        </ReactMapGL>
    </div>
}