import React from "react";
import CreateSphere from "./Three360Function/CreateSphere";
import AtIdCreader from "../../Usual/AtCommon/AtIdCreater";
import { At360Ref, AtThree360Model, AtThree365Option } from "./AtThree360Model";

const AtThree360: React.ForwardRefRenderFunction<At360Ref, AtThree360Model> = (
  props: AtThree360Model,
  ref: any | At360Ref
) => {
  // 加入
  const containerName = AtIdCreader.getId("AtThreeVR-Container");
  return (
    <div className="AtThreeVR-Container" id={containerName}>
      <CreateSphere containerName={containerName} />
    </div>
  );
};
export default React.forwardRef(AtThree360);

const defaultOptions = {
  bound: {
    display: "absolute",
    width: window.innerWidth,
    height: window.innerHeight,
    left: 0,
    top: 0,
    className: "",
  },
  camera: {
    position: {
      x: 0,
      y: 0,
      z: 0.1,
    },
    lookAt: {
      x: 0,
      y: 0,
      z: 0,
    },
    controls: {
      enableZoom: true,
      rotateSpeed: -0.15,
    },
  },
  sphere: {
    radius: 500,
    xDis: 50,
    yDis: 50,
  },
} as AtThree365Option;
