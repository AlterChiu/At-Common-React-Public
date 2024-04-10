export interface IAtUploadModel {
  id?: string;
  isImage?: boolean; //預設為非，若為圖片則會切換為預覽模式

  sx?: any; // mui 樣式設定
  defaultValue?: string; // 預設內容，若為圖片則輸入圖片url
  isDisabled?: boolean;

  setLoading?: (isLoading: boolean) => void; //上傳檔案時的modal，預設只會鎖定input區塊
  fetchFunction: (uploadBlob) => Promise<any>; // 上傳的fetch，會傳的response會往下callBack丟
  fetchCallBack: (returnValue) => string; //完成後動作，內容輸入完成後回傳字串更新img或是input
}

export interface AtUploadRef {
  setDisable: (disabled: boolean) => void;
  setValue: (value: string) => void; //回傳內部文字
  getValue: () => string;
}
