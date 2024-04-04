"use client"


import 'ol/ol.css';
// import { Map, View, Layer, Tile, Feature, Source, Vector } from 'openlayers-fiber';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Point, Icon } from 'ol/geom';


import { useRef, useState, useEffect, useCallback } from 'react';
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
import VectorSource from "ol/source/Vector";
// import  {GeometryType}  from "ol/geom/GeometryType";
// import  Geometry  from "ol/geom";


export const image = new CircleStyle({
    radius: 10,
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

export const styleFunction = (feature) => {
    // console.log("q11- ret st",)
    return styles[feature.getGeometry().getType()];
};


export const fill = new Fill({
    color: "rgba(255, 255, 255, 0.2)",
});
export const stroke = new Stroke({
    color: "#ffcc33",
    width: 2,
});
export const circleFill = new Fill({
    color: "#ffcc33",
});




export default function GeoPositionPicker({ setc, lat, lon }) {
    const [latitude, setLatitude] = useState(lat);
    const [longitude, setLongitude] = useState(lon);
    const [vectorSource, setVectorSource] = useState();
    // const [locCoord, setlocCoord] = useState([]);
    const [gj, setgj] = useState({});
    const [error, setError] = useState("");
    //const assetSourceRef = useRef(null);
    const assetLayerRef = useRef(null);
    const mapRef = useRef(null);
    const coords = useRef([]);

    console.log("rendering11-rendering",)
    useEffect(() => {
        if ((lat == 0 || lat == null) && (lon == 0 || lon == null)) {
            console.log("rendering11-get cur val",)
            if ('geolocation' in navigator) {

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        //console.log("q11- got lat lon",)
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                        // setlocCoord([position.coords.longitude, position.coords.latitude])
                        //console.log("q11-in ue init", position.coords.latitude, position.coords.longitude)
                    },
                    (error) => {
                        setError(error.message);
                    }
                );
            }
        } else {
            console.log("rendering11-custom val received", lat, lon)
            setLatitude(lat);
            setLongitude(lon);
        }


    }, []);

    const featureAddedHandler = useCallback(() => {
        const fs = vectorSource.getFeatures()
        const lastFCoord = fs.at(-1)?.getGeometry().flatCoordinates
        const latlong = toLonLat(lastFCoord)
        console.log("rendering11-lastFCoord", latlong,)
        setc(latlong)
        // setLat(latlong[1])
        // setLon(latlong[0])

         coords.current = [latlong[0], latlong[1]]

        for (let index = 0; index < fs.length - 1; index++) {
            const element = fs[index];
            vectorSource.removeFeature(element)

        }
        // console.log("ee11",fs.at(-1).getGeometry())
    }, [vectorSource])



    useEffect(() => {

        console.log("rendering11-vectorSource.", vectorSource)
        if (vectorSource ) {
            console.log("rendering11- event added",)
            vectorSource.on("addfeature", featureAddedHandler);
        } else {
            console.log("rendering11- event not added",)
        }


        // }, [assetSourceRef?.current, gj?.features?.length,])
    }, [vectorSource ])



    const onSingleclick = useCallback((evt) => {
        const { coordinate } = evt;
        // console.log("sclick", coordinate)
        const latlong = toLonLat(coordinate)
        setLatitude(latlong[1]);
        setLongitude(latlong[0]);
    }, []);

    useEffect(() => {

        if (latitude != 0 && longitude != 0) {
            console.log("rendering11-q11- setgj",)
            setgj({
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
                            coordinates: fromLonLat([longitude, latitude]),
                        },
                    },
                ],
            })
        } else {
            console.log("rendering11-q11- not setgj",)
        }

    }, [latitude, longitude]);

    //onSingleclick = { onSingleclick }

    useEffect(() => {
        // console.log("rendering11- inside add gj hook", gj.features?.length, assetSourceRef.current)
        
        if (gj.features?.length > 0 && vectorSource) {
            vectorSource.clear();
            console.log("rendering11 -q11- added gj to source",)
            const e = new GeoJSON().readFeatures(gj);

            vectorSource.addFeatures(e);
        }


        // }, [assetSourceRef?.current, gj?.features?.length,])
    }, [vectorSource,gj])



    return (
        <div>
            {/* <Dialog >
                <DialogTrigger asChild>
                    <Button variant="outline"> Set Geo Location</Button>
                   </DialogTrigger>
                <DialogContent className="w-3/4" >
                    <DialogHeader >
                        <DialogTitle>Add Geo-Location...</DialogTitle>
                        <DialogDescription > */}
            <Map ref={mapRef} style={{ width: "90vw", height: "500px" }}   >
                <olView initialCenter={[-472202, 7530279]} initialZoom={3} />
                <olLayerTile>
                    <olSourceOSM />
                </olLayerTile>
                <olLayerVector ref={assetLayerRef}   >
                    <olSourceVector ref={setVectorSource} />
                    <olStyleStyle attach="style" fill={fill} stroke={stroke}>
                        <olStyleCircle
                            attach="image"
                            args={{ radius: 7, fill: circleFill }}
                        />
                    </olStyleStyle>

                        {/* <olFeature>
                            <olGeomCircle center={[1e6, 1e6]} radius={100} />
                        </olFeature>

                    </olSourceVector> */}
                </olLayerVector>
                {vectorSource ? (
                    <>
                        {/* <olInteractionModify source={assetSourceRef.current} /> */}
                        <olInteractionDraw
                            args={{
                                type: "Point",
                                source: vectorSource,
                                snapTolerance: 30,
                            }}
                        />
                        <olInteractionSnap
                            source={vectorSource}
                            args={{ pixelTolerance: 10 }}
                        />
                    </>
                ) : null}

            </Map>
            {/* <span>{`${lon}--${lat}`}</span>
            <span>{`-ref-${coords.current[0]}--${coords.current[1]}`}</span> */}
            {/* </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog> */}


        </div>
    );
}



