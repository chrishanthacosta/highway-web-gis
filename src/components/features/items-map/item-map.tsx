"use client"


import 'ol/ol.css';
// import { Map, View, Layer, Tile, Feature, Source, Vector } from 'openlayers-fiber';
import { fromLonLat, toLonLat } from 'ol/proj';
// import { Point, Icon } from 'ol/geom';
import { toStringHDMS } from "ol/coordinate";
import { click, pointerMove, altKeyOnly } from "ol/events/condition";

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
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
import { useItemsStore } from './item-store';
import { BridgePopup } from './bridge-popup';
import { CulvertPopup } from './culvert-popup';
import { styleFunctionItems } from './item-styles';
import { Underdog } from 'next/font/google';
// import  {GeometryType}  from "ol/geom/GeometryType";
// import  Geometry  from "ol/geom";
// import { useItemsStore } from "./store";


export const image = new CircleStyle({
    radius: 10,
    stroke: new Stroke({ color: "red", width: 8 }),
});
export const imageSelected = new CircleStyle({
    radius: 10,
    stroke: new Stroke({ color: "green", width: 8 }),
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

export const styleFunction = (feature: any) => {
    // console.log("q11- ret st",)
    return styles["Point"];
    // return styles[(feature?.getGeometry()?.getType() as string) ?? "point" ];
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
export const selectedStyle = new Style({
    fill: new Fill({
        color: "red",
        // color: "#eeeeee",
    }),
    stroke: new Stroke({
        color: "rgba(255, 255, 255, 0.7)",
        width: 2,
    }),
});

export const selectedStyleFunction = (feature:any) => {
    const color = feature.get("COLOR") || "green";
    selectedStyle?.getFill()?.setColor(color);
    return selectedStyle;
};

export type SelectedItem = {
    type: string;
    id: number;
}

export default function ItemsMap() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [vectorSource, setVectorSource] = useState<VectorSource>();
    // const [locCoord, setlocCoord] = useState([]);
    const [gj, setgj] = useState<any>({});
    const [error, setError] = useState("");
    //const assetSourceRef = useRef(null);
    const assetLayerRef = useRef(null);
    const mapRef = useRef(null);
    //const coords = useRef([]);
    const [coordinates, setCoordinates] = useState(undefined);
    const [sclickCoord, setsclickCoord] = useState(undefined);

    const [popup, setPopup] = useState();

    const items = useItemsStore((state) => state.items);
    const [selectMethod, setSelectMethod] = useState("singleClick");
    const [displayText, setDisplayText] = useState("0 selected features");
    const [selectedItemType, setselectedItemType] = useState<SelectedItem>()
    const [popupNode, setpopupNode] = useState(<div>empty</div>)

    const onSingleclick = useCallback((evt) => {
        const { coordinate } = evt;
         
        setsclickCoord(coordinate);
        //setCoordinates(coordinate);
    }, []);

    useEffect(() => {
        if (selectedItemType?.type) {
            
            setCoordinates(sclickCoord);
        } else {
            
            //setsclickCoord(undefined);
            //setCoordinates(undefined)
        }
    }, [sclickCoord, selectedItemType])

    const handleSelect = useCallback((e) => {
        
        const fs = e.target.getFeatures()
        
        if (fs.getLength() > 0) {
            setDisplayText(
                ` ${fs.item(0).get("type")} `
            );
            setselectedItemType({ type: fs.item(0).get("type"), id: fs.item(0).get("id") })
        } else {
            
           
            setselectedItemType({ type: "", id: 0 })
             
        }

       
    }, []);

   
    useEffect(() => {

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
     




    }, []);

    useEffect(() => {
         
        const itemsList = items?.map(i => {
            return {
                type: "Feature",
                geometry: {
                    type: "Point", coordinates: fromLonLat([i.longitude, i.latitude])
                },
                properties: {
                    type: i.type,
                    id: i.id,
                    location: i.location,
                }
            }
        })

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
                    properties: {
                        type: "current-location",
                        id: "0"
                    }
                }, ...itemsList
            ],
        })

    }, [items])

 
    
    useEffect(() => {
        // console.log("rendering11- inside add gj hook", gj.features?.length, assetSourceRef.current)

        if (gj?.features?.length > 0 && vectorSource) {
            vectorSource.clear();
            console.log("rendering11 -q11- added gj to source",)
            const e = new GeoJSON().readFeatures(gj);

            vectorSource.addFeatures(e);
        }


        // }, [assetSourceRef?.current, gj?.features?.length,])
    }, [vectorSource, gj])

    const selectCondition = useMemo(() => {
        switch (selectMethod) {
            case "singleClick":
                return click;
            case "pointerMove":
                return pointerMove;
            case "altClick":
                return (mapBrowserEvent:any) => {
                    return click(mapBrowserEvent) && altKeyOnly(mapBrowserEvent);
                };
            default:
                return () => false;
        }
    }, [selectMethod]);

    const GetPopupNode =useCallback( () => {
        
        switch (selectedItemType?.type) {
            case "bridge":
                return(<BridgePopup  id={selectedItemType?.id }/> )
                break;
            case "culvert":
                return (<CulvertPopup id={selectedItemType?.id} />)
                break;

            default:
                return (<div  >default</div>)
                break;
        }



    }, [selectedItemType])

    return (
        <div>
            <div
                ref={setPopup}
                style={{
                    backgroundColor: "white",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    padding: "15px",
                    borderRadius: "10px",
                    border: "1px solid #cccccc",
                    minWidth: "280px",
                    color: "black",
                }}
            >
                <button
                    type="button"
                    onClick={(e) => {
                        setCoordinates(undefined);
                        setsclickCoord(undefined);
                        setselectedItemType({id:0,type:""})
                        e.target.blur();
                        return false;
                    }}
                    style={{
                        textDecoration: "none",
                        position: "absolute",
                        top: "2px",
                        right: "8px",
                    }}
                >
                    ✖
                </button>
                <div id="popup-content">
                    {GetPopupNode()}
                </div>
            </div>
            {/* <Map ref={mapRef} style={{ width: "90vw", height: "90vh" }}   > */}
            <Map ref={mapRef} style={{ width: "90vw", height: "90vh" }} onSingleclick={onSingleclick}   >
                {popup ? (
                    <olOverlay
                        element={popup}
                        position={coordinates}
                        autoPan
                        autoPanAnimation={{
                            duration: 250,
                        }}
                    />
                ) : null}
               
                <olView initialCenter={[-472202, 7530279]} initialZoom={3} />
                <olLayerTile>
                    <olSourceOSM />
                </olLayerTile>
                <olLayerVector ref={assetLayerRef} style={styleFunctionItems}   >
                    <olSourceVector ref={setVectorSource} />
                   
                    {/* <olStyleStyle attach="style" fill={fill} stroke={stroke}>
                        <olStyleCircle
                            attach="image"
                            args={{ radius: 7, fill: circleFill }}
                        />
                    </olStyleStyle> */}

                    {/* <olFeature>
                            <olGeomCircle center={[1e6, 1e6]} radius={100} />
                        </olFeature>

                    </olSourceVector> */}
                </olLayerVector>
                <olInteractionSelect
                    args={{ condition: selectCondition }}
                    style={selectedStyleFunction}
                    onSelect={handleSelect}
                />

            </Map>
            <span>{displayText}</span>
            {/* <span>{`${lon}--${lat}`}</span>
            <span>{`-ref-${coords.current[0]}--${coords.current[1]}`}</span> */}
            {/* </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog> */}


        </div>
    );
}



