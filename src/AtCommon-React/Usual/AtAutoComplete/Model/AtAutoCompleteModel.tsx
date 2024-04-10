import { AutocompleteProps, AutocompleteRenderInputParams, ChipTypeMap, PaperProps, PopperProps } from "@mui/material";
import { AtSelectGroupItemProps, AtSelectionRef } from "../../AtSelection/Model/AtSelectionModel";
import { AtInputRef, IAtInputModel } from "../../AtInput/Model/AtInputModel";
import AtInput from "../../AtInput/AtInput";

export interface AutoCompleteModel extends IAtInputModel {
    datas: AtSelectGroupItemProps[]; // key=顯示名稱 , value=真正的數值
    open?: boolean;//是否開啟下拉是選單

    popperProps?: PopperProps;//客製化項目，彈出視窗的樣式
    paperProps?: PaperProps;//客製化項目，下拉選單的樣式
}


export interface AutoCompleteRef extends Omit<AtInputRef, "setType" | "getInput"> {
    getInput: () => React.RefObject<AtInputRef>;
    getPop: () => React.RefObject<HTMLDivElement>;
}