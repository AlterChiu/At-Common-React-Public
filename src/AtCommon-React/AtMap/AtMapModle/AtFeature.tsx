import React from "react";
import AtCircle from "../AtGeometries/AtCircle";
import AtMarker from "../AtGeometries/AtMarker";

export interface AtFeatureBase {
  // popup顯示內容
  popupContent?: JSX.Element;

  // marker內部的node
  children?: React.ReactNode;
}

// 目前可使用的type種類
export type AtFeatureTypes = JSX.Element;
// |typeof AtMarker |  typeof AtCircle;
