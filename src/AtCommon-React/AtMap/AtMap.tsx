import React, { useImperativeHandle, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { type LeafletEventHandlerFnMap, Map as LeafletMap } from "leaflet";

// model相關
import { AtMapEventRef, AtMapProps, AtMapRef } from "./AtMapModle/AtMapModel";

// leaflet
import { useMapEvents } from "react-leaflet";
import "leaflet-contextmenu";

// css相關
import "leaflet/dist/leaflet.css";
import "./style.css"; // 客製化Leaflet
import AtMapHandler from "./AtMapModle/AtMapHandler";
import { AtFeatureTypes } from "./AtMapModle/AtFeature";

const AtMap: React.ForwardRefRenderFunction<AtMapRef, AtMapProps> = (
  props: AtMapProps,
  ref?
) => {
  // 預設參數
  const mapRef = React.createRef<AtMapEventRef>();
  const [mapProps, setMapProps] = React.useState(
    Object.assign(
      {
        center: [24.5, 121],
        zoom: 7,
        dragging: true,
        doubleClickZoom: true,
        scrollWheelZoom: true,
        attributionControl: false,
        zoomControl: true,
        tileLayer: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        eventHandler: {},
        atFeatures: [],
      },
      { ...props }
    ) as AtMapProps
  );

  // 對外服務部分
  useImperativeHandle(
    ref,
    () =>
      ({
        GetMap: () => {
          return mapRef.current?.GetMap();
        },
        atAddFeatures: (features: AtFeatureTypes[]) => {
          setMapProps((pre) => {
               return { ...pre , atFeatures:[...pre.atFeatures! , ...features]};
          });
        },
        removeFeature: (feature: AtFeatureTypes) => {
          setMapProps((pre) => {
            return {
              ...pre,
              atFeatures: [...pre.atFeatures!.filter((e) => e != feature)],
            };
          });
        },
      } as AtMapRef)
  );

  React.useEffect(() => {
    setMapProps((pre) => {
      return { ...pre, ...props };
    });
  }, [props]);

  //#region 最後輸出
  //============================================================================
  return (
      <MapContainer {...mapProps}>
        <>
          {/* 底圖服務 */}
          <TileLayer url={mapProps.tileLayer as string} />

          {/* 地圖事件 */}
          <EventHandler handler={mapProps.eventHandler!} />

          {/* 地圖物件 */}
          <AtMapHandler ref={mapRef} />

          {/* 加入其他物件 */}
          {mapProps.optionJSX}
          {<>{mapProps.atFeatures}</>}
        </>
      </MapContainer>
  );
  //#endregion
};
export default React.forwardRef(AtMap);

// 設定地圖Event事件
const EventHandler = (props: { handler: LeafletEventHandlerFnMap }) => {
  useMapEvents(props.handler);
  return <></>;
};
