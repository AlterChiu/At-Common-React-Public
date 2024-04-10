import { MapContainerProps } from "react-leaflet";
import { Map as LeafletMap } from 'leaflet';
import type { LeafletEventHandlerFnMap, Map } from "leaflet";
import { AtFeatureBase, AtFeatureTypes } from "./AtFeature";

export interface AtMapProps extends MapContainerProps{
  mapRef?:AtMapRef | LeafletMap;

  className?:string;
  eventHandler?:LeafletEventHandlerFnMap;

  // 底圖服務(WMTS)
  tileLayer?:string;

  // 其他物件
  optionJSX?:JSX.Element;
  atFeatures?:AtFeatureTypes[];
}

/*Map的對外方法*/
export interface AtMapRef{
  GetMap : ()=>LeafletMap;
  atAddFeatures : (features :AtFeatureTypes[])=>void 
  removeFeature :(feature :AtFeatureTypes)=>void
}



export interface AtMapEventRef {
  GetMap: () => Map;
  // UseMapEvents(handlers: LeafletEventHandlerFnMap): void;
}
