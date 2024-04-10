import L, { CircleOptions, PathOptions } from "leaflet";
import React from "react";
import type { PathProps } from "@react-leaflet/core/lib/path";
import { Circle, Popup } from "react-leaflet";
import { AtFeatureBase } from "../AtMapModle/AtFeature";

// const AtCircle :React.ForwardRefRenderFunction<>
const AtCircle: React.ForwardRefRenderFunction<AtCircleRef, AtCircleProps> = (
  props: AtCircleProps,
  ref?
) => {
  let circleRef = {} as L.Circle<any> | null;
  // 預設參數
  const [circleProps, setCircleProps] = React.useState<AtCircleProps>(
    Object.assign(
      {
        // 顏色
        pathOptions: {
          fill: true,
          fillColor: "#fff131",
          fillOpacity: 0.4,
          color: "#ac0101",
          opacity: 0.7,
        } as PathOptions,
      },
      { ...props }
    )
  );

  console.log(circleProps.pathOptions);

  // 更新props
  React.useEffect(() => {
    setCircleProps((pre) => {
      return { ...pre, ...props };
    });
  }, [props]);

  // 對外服務
  React.useImperativeHandle(
    ref,
    () =>
      ({
        GetCircle: () => {
          return circleRef;
        },
        atAddClassName: (className: string[]) => {},

        atRemoveClassName: (className: string[]) => {},
      } as AtCircleRef)
  );

  

  return (
    <Circle
      ref={(e) => (circleRef = e)}
      center={[circleProps.lat, circleProps.lon]}
      radius={circleProps.radius}
      pathOptions={circleProps.pathOptions}
    >
      {/* 是否有popup內容 */}
      {circleProps.popupContent ? (
        <Popup>{circleProps.popupContent}</Popup>
      ) : (
        <></>
      )}

      {/* 預設props內容 */}
      {circleProps.children}
    </Circle>
  );
};
export default React.forwardRef(AtCircle);

/*model部分*/
//======================================================================
export interface AtCircleRef<P = any> {
  GetCircle: () => L.Circle<P>;
  atAddClassName: (classNames: string[]) => void;
  atRemoveClassName: (classNames: string[]) => void;
}

export interface AtCircleProps extends CircleOptions, PathProps, AtFeatureBase {
  ref?: React.RefObject<AtCircleRef>;
  circleRef?: any;

  lon: number;
  lat: number;
}
