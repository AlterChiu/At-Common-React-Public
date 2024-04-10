import React, { useImperativeHandle } from "react";
import { useMap } from "react-leaflet";


const GetMapHandler: React.ForwardRefRenderFunction<GetMapHandlerRef, any> = (
    props: any,
    ref?
  ) => {
    const [map, setMap] = React.useState(useMap());
    useImperativeHandle(ref, () => ({
      GetMap: () => {
        return map;
      },
    }));
    return <></>;
  };
  export default React.forwardRef(GetMapHandler);

  interface GetMapHandlerRef {
    GetMap:()=> L.Map;
  }