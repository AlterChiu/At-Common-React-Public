import L, { DivIcon, Icon, LatLngExpression, MarkerOptions } from "leaflet";
import React, { useImperativeHandle } from "react";
import { Marker, MarkerProps, Popup } from "react-leaflet";
import { type EventedProps } from "@react-leaflet/core";
import { AtFeatureBase } from "../AtMapModle/AtFeature";

const AtMarker: React.ForwardRefRenderFunction<AtMarkerRef, AtMarkerProps> = (
  props: AtMarkerProps,
  ref?
) => {
  // 預設參數
  let markerRef = {} as L.Marker<any> | null;
  const [markerProps, setMarkerProps] = React.useState<AtMarkerProps>(
    Object.assign(
      {
        iconSize: 60,
        iconUrl:
          process.env.PUBLIC_URL + "/Content/Image/AtMap/default-icon.png",
      },
      { ...props }
    )
  );

  // 對外服務function
  React.useImperativeHandle(
    ref,
    () =>
      ({
        getCircle: () => {
          return markerRef;
        },
        atSetIcon: (url: string, size: number) => {
          setMarkerProps(pre =>{
            return {...pre , iconUrl:url , iconSize:size}
          })
        },
      } as AtMarkerRef)
  );

  // 更新props
  React.useEffect(() => {
    setMarkerProps((pre) => {
      return { ...pre, ...props };
    });
  }, [props]);

  return (
    <Marker
      ref={(e) => (markerRef = e)}
      position={[markerProps.lat, markerProps.lon]}
      icon={L.icon({
        iconUrl: markerProps.iconUrl!,
        iconSize : L.point(markerProps.iconSize! , markerProps.iconSize!)
      })}
    >
      {/* 是否有popup內容 */}
      {markerProps.popupContent ? (
        <Popup>{markerProps.popupContent}</Popup>
      ) : (
        <></>
      )}

      {/* 預設props內容 */}
      {markerProps.children}
    </Marker>
  );
};
export default React.forwardRef(AtMarker);

// 客製化調整
export interface AtMarkerRef<P = any> {
  getCircle: () => L.Marker<P>;

  // 客製化方法，簡化作業
  atSetIcon(url: string, size: number): void;
}

export interface AtMarkerProps
  extends MarkerOptions,
    EventedProps,
    AtFeatureBase {
  ref?: React.RefObject<AtMarkerRef>;
  markerRef?: any;

  lon: number;
  lat: number;

  iconUrl?: string;
  iconSize?: number;
}
