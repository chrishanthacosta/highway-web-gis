"use client"

 
import 'ol/ol.css';
// import { Map, View, Layer, Tile, Feature, Source, Vector } from 'openlayers-fiber';
import { fromLonLat } from 'ol/proj';
import { Point, Icon } from 'ol/geom';
 

import { useRef, useState, useEffect } from 'react';
import { Map } from "@react-ol/fiber";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import GeoJSON from "ol/format/GeoJSON";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
 
export const image = new CircleStyle({
    radius: 10000,
    stroke: new Stroke({ color: "red", width: 8 }),
});

export const styles = {
    Point: new Style({
        image,
    }),
    LineString: new Style({
        stroke: new Stroke({
            color: "green",
            width: 1,
        }),
    }),
    MultiLineString: new Style({
        stroke: new Stroke({
            color: "green",
            width: 1,
        }),
    }),
    MultiPoint: new Style({
        image,
    }),
    MultiPolygon: new Style({
        stroke: new Stroke({
            color: "yellow",
            width: 1,
        }),
        fill: new Fill({
            color: "rgba(255, 255, 0, 0.1)",
        }),
    }),
    Polygon: new Style({
        stroke: new Stroke({
            color: "blue",
            lineDash: [4],
            width: 3,
        }),
        fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)",
        }),
    }),
    GeometryCollection: new Style({
        stroke: new Stroke({
            color: "magenta",
            width: 2,
        }),
        fill: new Fill({
            color: "magenta",
        }),
        image: new CircleStyle({
            radius: 10,
            stroke: new Stroke({
                color: "magenta",
            }),
        }),
    }),
    Circle: new Style({
        stroke: new Stroke({
            color: "red",
            width: 2,
        }),
        fill: new Fill({
            color: "rgba(255,0,0,0.2)",
        }),
    }),
};

export const styleFunction = (feature )  => {
    return styles[feature.getGeometry().getType() ];
};

export const geojsonObject = {
    type: "FeatureCollection",
    crs: {
        type: "name",
        properties: {
            name: "EPSG:3857",
        },
    },
    features: [
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [0, 0],
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [
                    [4e6, -2e6],
                    [8e6, 2e6],
                ],
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [
                    [4e6, 2e6],
                    [8e6, -2e6],
                ],
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [-5e6, -1e6],
                        [-4e6, 1e6],
                        [-3e6, -1e6],
                    ],
                ],
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "MultiLineString",
                coordinates: [
                    [
                        [-1e6, -7.5e5],
                        [-1e6, 7.5e5],
                    ],
                    [
                        [1e6, -7.5e5],
                        [1e6, 7.5e5],
                    ],
                    [
                        [-7.5e5, -1e6],
                        [7.5e5, -1e6],
                    ],
                    [
                        [-7.5e5, 1e6],
                        [7.5e5, 1e6],
                    ],
                ],
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "MultiPolygon",
                coordinates: [
                    [
                        [
                            [-5e6, 6e6],
                            [-5e6, 8e6],
                            [-3e6, 8e6],
                            [-3e6, 6e6],
                        ],
                    ],
                    [
                        [
                            [-2e6, 6e6],
                            [-2e6, 8e6],
                            [0, 8e6],
                            [0, 6e6],
                        ],
                    ],
                    [
                        [
                            [1e6, 6e6],
                            [1e6, 8e6],
                            [3e6, 8e6],
                            [3e6, 6e6],
                        ],
                    ],
                ],
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "GeometryCollection",
                geometries: [
                    {
                        type: "LineString",
                        coordinates: [
                            [-5e6, -5e6],
                            [0, -5e6],
                        ],
                    },
                    {
                        type: "Point",
                        coordinates: [4e6, -5e6],
                    },
                    {
                        type: "Polygon",
                        coordinates: [
                            [
                                [1e6, -6e6],
                                [2e6, -4e6],
                                [3e6, -6e6],
                            ],
                        ],
                    },
                ],
            },
        },
    ],
};


export default function GeoPositionPicker() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not available in your browser.');
        }
    }, []);


    return (
        <Map style={{ width: "100px", height: "640px" }}>
        {/* <Map > */}
            <olView center={[0, 6000000]} zoom={2} />
            <olLayerTile>
                <olSourceOSM/>
            </olLayerTile>
            <olLayerVector style={styleFunction} >
                    <olSourceVector features={new GeoJSON().readFeatures(geojsonObject)} >
                    {/* <olFeature>
                        <olGeomCircle center={[5e6, 7e6]} radius={10e6} />
                    </olFeature> */}
                    
                    </olSourceVector>
            </olLayerVector>

        </Map>
    );
}

 

