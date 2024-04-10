import React from "react";

import "./TestCss.css";
import { AtMapRef } from "./AtMapModle/AtMapModel";
import AtMap from "./AtMap";
import AtCircle from "./AtGeometries/AtCircle";
import AtIdCreader from "../Usual/AtCommon/AtIdCreater";
import AtMarker from "./AtGeometries/AtMarker";

const MapTest = () => {
  const mapRef = React.createRef<AtMapRef>();
  const [latDis, setLatDis] = React.useState(1);
  return (
    <div className="container-fluid">
      <div className="row col">
        <AtMap
          ref={mapRef}
          center={[24.5 + latDis, 121]}
          className="mapContainer"
        />
      </div>
      <div className="row controller">
        <div className="col">
          <button
            onClick={(e) => {
              mapRef.current?.atAddFeatures([
                <AtCircle key={AtIdCreader.getId("circle")} lon={121} lat={24.5} radius={1000} />,
              ]);
            }}
          >
            新增circle
          </button>

          <button
            onClick={(e) => {
              mapRef.current?.atAddFeatures([
                <AtMarker lon={121} lat={24.5} />,
              ]);
            }}
          >
            新增Market
          </button>
          <button
            onClick={(e) => {
              setLatDis((pre) => -1 * pre);
            }}
          >
            移動
          </button>
          <button
            onClick={(e) => {
              mapRef.current?.GetMap().flyTo([24.5, 121]);
            }}
          >
            FlyTo
          </button>
        </div>
      </div>
    </div>
  );
};
export default MapTest;
