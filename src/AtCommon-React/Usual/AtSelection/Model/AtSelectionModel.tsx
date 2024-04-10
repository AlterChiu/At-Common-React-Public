import { ChangeEvent } from "react";
import AtIdCreader from "../../AtCommon/AtIdCreater";
import { AtKeyVal } from "../../AtCommon/AtKeyVal";
import { FormControlOwnProps, FormControlTypeMap, InputLabelOwnProps, InputLabelTypeMap, ListSubheaderProps, MenuItemProps, SelectChangeEvent, SelectProps } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface IAtSelectionModel {
  datas: AtSelectionItemProps[] | AtSelectGroupItemProps[]; // key=顯示名稱 , value=真正的數值

  selectProps?: SelectProps; // Mui的select props
  defaultValue?: string; // 預設選項，對應到 key 值
  value?: string; //ref 對應到的數值，複選對應到string[]

  textquery?: boolean; //是否提供使用者透過input去快速搜尋

  label: string;//這個form的名字
  lableOption?: LabelOptions;//這個label的刻製化

  formOptions?: FormOptions;//這個formComponent的客製化
}

// 有分群組的items
export interface AtSelectGroupItemProps {
  groupName?: string;
  groupOption?: Partial<ListSubheaderProps>; //繼承Mui ListSubheader
  datas: AtSelectionItemProps[];
}

// 無分群組的items
export interface AtSelectionItemProps extends Partial<MenuItemProps> {
  key: string;
}


export interface LabelOptions extends InputLabelOwnProps {
  id?: string;
  className?: string;
}
export interface FormOptions extends FormControlOwnProps {
  id?: string;
  className?: string;
  onClick?: () => {}
}

export interface AtSelectionRef {
  getValue: () => string;
  setValue: (value: any) => void;

  addItem: (item: AtKeyVal) => void;
  setItems: (items: AtKeyVal[]) => void;
  getItems: () => AtKeyVal[];

  openOption: () => void;
  toggleOption: () => void;
  closeOption: () => void;
}
