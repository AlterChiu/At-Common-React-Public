import "./style.css";

import Box from "@mui/material/Box";
import React from "react";
import { Button } from "react-bootstrap";
import Webcam from "react-webcam";

import { AtWebCamModel, AtWebCamRef } from "./AtWebCamModel";
import { resolve } from "path/win32";

export const AtWebCam = React.forwardRef(
  (props: AtWebCamModel, camRef: AtWebCamRef | any) => {
    const [states, setState] = React.useState<AtWebCamModel>(
      Object.assign(
        {
          isAudio: false,
          isShow: true, //預設開啟相機
          toolbar: false, //預設開啟toolbar

          boundary: false, //開啟邊框
          boundaryHeight: 100, //100%
          boundaryWidth: 100, //100%

          className: "AtWebCam",
        },
        props
      )
    );

    // 建立相機物件
    const ref: any = React.useRef(null);
    camRef.ref = ref;

    // 刷新相機物件
    // 刷新地圖
    const [val, reRender] = React.useState(true);
    camRef.reRender = () => {
      reRender((pre) => !pre);
    };

    // 關閉相機
    camRef.closeCam = () => {
      setState((pre) => {
        return { ...pre, isShow: false };
      });
    };

    // 開啟相機
    camRef.openCam = () => {
      setState((pre) => {
        return { ...pre, isShow: true };
      });
    };

    // 照相
    camRef.shot = async (callBack) => {
      var shot = ref.current.getScreenshot();
      if (states.boundary == true) {
        await CropBound({
          img: shot,
          parentCam: ref,
          boundWidthPersent: states.boundaryWidth!,
          boundHeightPersent: states.boundaryHeight!,
        }).then((crop) => (shot = crop));
      }
      callBack(shot);
    };

    // 加入邊框
    camRef.addBound = (widthPersent: number, heightPersent: number) => {
      setState((pre) => {
        const width =
          widthPersent > 100 || widthPersent < 0 ? 100 : widthPersent;
        const height =
          heightPersent > 100 || heightPersent < 0 ? 100 : heightPersent;

        return {
          ...pre,
          boundary: true,
          boundaryHeight: height,
          boundaryWidth: width,
        };
      });
    };

    // 移除邊框
    camRef.removeBound = () => {
      setState((pre) => {
        return { ...pre, boundary: false };
      });
    };

    return (
      <div className={"container-fluid " + states.className}>
        <div className="row">
          <div className="col ">
            {states.isShow && (
              <>
                <Webcam
                  ref={ref}
                  audio={props.isAudio!}
                  screenshotFormat="image/jpeg"
                />
              </>
            )}

            {states.boundary && (
              <CreateBound
                parentCam={ref}
                boundWidthPersent={states.boundaryWidth!}
                boundHeightPersent={states.boundaryHeight!}
              />
            )}
          </div>
        </div>
        {states.toolbar && (
          <div className="row">
            <div className="col">
              <button
                className="toolbar-button"
                onClick={() => {
                  camRef.closeCam();
                }}
              >
                關閉相機
              </button>
            </div>
            <div className="col">
              <button
                className="toolbar-button"
                onClick={() => {
                  camRef.openCam();
                }}
              >
                開啟相機
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

const CreateBound = (props: {
  parentCam: any;
  boundWidthPersent: number;
  boundHeightPersent: number;
}) => {
  // 偵測裝置長寬
  const camWidth = props.parentCam.current.video.clientWidth;
  const camHeight = props.parentCam.current.video.clientHeight;
  // 要裁切的長寬
  const boundWidth = (camWidth * props.boundWidthPersent) / 100;
  const boundHeight = (camHeight * props.boundHeightPersent) / 100;

  var left = "calc(50% - @{halfBound})".replaceAll(
    "@{halfBound}",
    boundWidth / 2 + "px"
  );

  var top = "calc(@{halfHeight} - @{halfBound})"
    .replaceAll("@{halfBound}", boundHeight / 2 + "px")
    .replaceAll("@{halfHeight}", camHeight / 2 + "px");

  return (
    <div
      style={{
        position: "absolute",
        top: top,
        left: left,
        width: boundWidth + "px",
        height: boundHeight + "px",
        borderStyle: "solid",
        borderColor: "red",
        borderWidth: "5px",
      }}
    ></div>
  );
};

const CropBound = async (props: {
  img: string;
  parentCam: any;
  boundWidthPersent: number;
  boundHeightPersent: number;
}) => {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  // 偵測裝置長寬
  const camWidth = props.parentCam.current.video.clientWidth;
  const camHeight = props.parentCam.current.video.clientHeight;
  // 要裁切的長寬
  const boundWidth = (camWidth * props.boundWidthPersent) / 100;
  const boundHeight = (camHeight * props.boundHeightPersent) / 100;
  canvas.width = boundWidth;
  canvas.height = boundHeight;

  const left = (camWidth - boundWidth) / 2;
  const top = (camHeight - boundHeight) / 2;

  console.log(left + "\t" + top + "\t" + boundWidth + "\t" + boundHeight);

  return new Promise((resolve, reject) => {
    // 載入裁切位置的圖片
    const img = new Image();
    img.src = props.img;

    // 載入完成後切片回傳Promise
    img.onload = () => {
      ctx?.drawImage(
        img,
        left,
        top,
        boundWidth,
        boundHeight,
        0,
        0,
        boundWidth,
        boundHeight
      );
      resolve(canvas.toDataURL());
    };
  });
};
