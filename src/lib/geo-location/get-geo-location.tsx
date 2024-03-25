
 


import React from "react";
import { useGeolocated } from "react-geolocated";

const GeoLocationComponent = ({locationHandler}:{locationHandler:(a:any)=> void}) => {
    const { coords, isGeolocationAvailable } = useGeolocated();

    if (!coords) {
        locationHandler(coords)
         
    }

    return (
      
            (<div>
                Latitude: {coords?.latitude}
                <br />
                Longitude: {coords?.longitude}
            </div>)
        )
    }
    
export default GeoLocationComponent;