export interface AtThree360Model{
    pic:string;
    option:AtThree365Option;
}

/*
    建立AtThree360的基本參數
*/
export interface AtThree365Option {
  //放置位置
  bound?: {
    display: "absolute" | "relative";
    width?: number;
    height?: number;
    left?: number;
    top?: number;
    className: string;
  };

  // 鏡頭初始位置
  camera?: {
    position?: {
      x?: number;
      y?: number;
      z?: number;
    };
    lookAt?: {
      x?: number;
      y?: number;
      z?: number;
    };
    controls?: {
      enableZoom?: boolean;
      rotateSpeed?: number;
    };
  };

  // 建立球體
  sphere?: {
    radius?: number; //球體半徑
    xDis?: number; //細緻度，越細吃越多Ram但也越平滑
    yDis?: number; //細緻度，越細吃越多Ram但也越平滑
  };
}


export interface At360Ref{
    addDom:(dom:At360Dom)=>void;
    setZoomable:(zoomable:boolean)=>void;
}


/*
    在360中加入html的物件
*/
export interface At360Dom {
  name: string;
  ratio: number; //放大倍數

  // 順序為左上/右上/右下/左下的順序
  bound: Point360[];
  rotation: Point360;

  type: "frame" | "img";
  src: string; //frame：鑲嵌內容，img：圖片的URL
  onclick: () => void; // 預設應該是沒動作的，圖片可以加入跳轉功能
  className: string;
}

export interface Point360 {
  // 三維空間座標
  x: number;
  y: number;
  z: number;

  // 對應camera的旋轉鏡頭
  xRptate?: number;
  yRptate?: number;
  zRptate?: number;
}
