import { PaperProps, PaperTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { DraggableProps } from "react-draggable";

//#region pannel所需參數
export interface AtPannelMode {
    id?: string;//最外框的div

    // pannel控制項目
    draggable?: boolean; //是否顯示拖拉按鈕
    draggableOption?: DraggableProps;// react-draggable的客製化設定，但我不太會用，都直接空白

    closeable?: boolean; //是否顯示關閉
    resizable?: boolean; //是否顯示調整大小按鈕

    miniable?: boolean; //是否顯示縮小
    defaultMinized?: boolean;//是否初始化就是縮小化狀態

    // 限制位置
    position?: Position; //初始的定位
    bound?: sizeLimit; //限制變化大小，目前還未限制功能1

    // Title相關設定
    titleLabel?: string; //直接輸入名稱置中顯示名稱，不然就是套用
    titlePaperProps?: PaperProps;// title的客製化內容

    titleOption_Close?: JSX.Element; //關閉pannel
    titleOption_Minimiz?: JSX.Element; //縮小化pannel
    titleOption_Details?: JSX.Element;//縮小化後，要打開pannel的按鈕

    // 內容相關
    paperProps?: PaperProps; //外框Paper的客製化(MUI Paper)
    borderColor?: string;// 外框顏色
    children?: JSX.Element;//pannel呈現內容
}

//顯示位置，以px計算
export interface Position extends Resize {
    left?: number,
    top?: number,
}

export interface Resize {
    width?: number,
    height?: number
}

// paper大小的限制，以px計算
interface sizeLimit {
    maxwidth?: number,
    maxHeight?: number,
    minWidth?: number,
    minHeight?: number,
}
//#endregion

export interface AtPannelRef {
    hide: () => void; //隱藏
    show: () => void; //取消隱藏
    fix: (position?: Position) => void; //若不提供，則會直接以建置時的props重新定位
    minize: () => void; //縮小內容
    expand: () => void; // 展開內容
}


//目前狀態，偵測滑鼠或是事件時要觸發的
export interface AtPannelCurrentState {
    draggable: boolean; // 僅在滑鼠放在title上時能拖動
    minimized: boolean; // 目前是否縮小化，僅保留title
    hidden: boolean;//暫時縮小化
    pannelRef: React.RefObject<HTMLDivElement>; // 整體視窗的ref狀態

}