import React, { Ref } from "react";
import { ImageOverlay } from "react-leaflet";
import L, { bounds } from "leaflet";

export const AddImageToMap = (props:{
  imageUrl:string,
  bounds: [[number, number], [number, number]], // 左上,右下(緯度,經度)
  map: React.MutableRefObject<null | {leafletElement:any}>,
  options? : {}
}) => {
  L.imageOverlay(props.imageUrl, props.bounds,{...props.options}).addTo(props.map.current?.leafletElement);
};
