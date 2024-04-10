export interface AtWebCamModel extends React.HTMLAttributes<HTMLElement> {
  isAudio?: boolean;
  isShow?: boolean; //是否要關閉相機

  toolbar?: boolean; //是否開啟工具列

  boundary?: boolean; //是否要有邊框，預設100%
  boundaryHeight?: number; //100%
  boundaryWidth?: number; //100%
}

export interface AtWebCamRef {
  ref: any; // 這邊是react原生地ref
  ReRebder(): void; //刷新物件

  closeCam(): void; //關閉相機
  openCam(): void; //開啟相機

  shot(callBackFunction): void; //拍照

  addBound(widthPersent: number, heightPersent: number): void; //加入邊框
  removeBound(): void; // 移除邊框
}
