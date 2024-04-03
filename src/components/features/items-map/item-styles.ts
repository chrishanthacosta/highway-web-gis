  
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  Circle,
  Text,
} from "ol/style";

export const imageBridge = new CircleStyle({
    radius: 3,
    stroke: new Stroke({ color: "red", width: 4 }),
});
export const imageCulvert = new CircleStyle({
    radius: 3,
    stroke: new Stroke({ color: "green", width: 4 }),
});
export const imageCurLoc = new CircleStyle({
    radius: 3,
    stroke: new Stroke({ color: "yellow", width: 4 }),
});

export const styleFunctionItems = (feature: any, resolution: number) => {
    let image;
    const type = feature.get("type")
    const location = feature.get("location")

    switch (type) {
        case "bridge":
            image=imageBridge
            break;
        case "culvert":
            image=imageCulvert
            break;
        case "current-location":
            image=imageCurLoc
            break;
    
        default:
            break;
    }


    //console.log("qwerty-resolution",resolution)
    let t = "";
   // if (resolution < 300)
    //   t =
    //     feature.get("prop_name") +
    //       (feature.get("prop_alias") ? "/" + feature.get("prop_alias") : "") ??
    //     "";
    const s = new Style({
      text: new Text({
        text: location,
        // text: feature.get("propertyid") ??"", prop_name, prop_alias
        offsetX: 0,
        offsetY: -10,
        font: "14px serif",
      }),
      image,
      stroke: new Stroke({
        color: "red",
        width: 2,
      }),
      fill: new Fill({
        color: "red",
      }),
    });

    return s;
  };
