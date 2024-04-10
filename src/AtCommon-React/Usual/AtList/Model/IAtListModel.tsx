import { IconName } from "@fortawesome/free-solid-svg-icons";
import { BoxProps, CollapseProps, ExtendButtonBase, ExtendList, ListItemButtonProps, ListItemButtonTypeMap, ListOwnProps, ListProps, ListTypeMap } from "@mui/material";
import { CommonProps, DefaultComponentProps, OverridableComponent } from "@mui/material/OverridableComponent";


export interface AtListModel extends ListProps {
  id?: string;
  datas: AtListItem[];
}

export interface AtListItem extends ListItemButtonProps {
  label: string; // 顯示名稱
  icon?: IconName; //套用fontawesome的class

  urlLink?: string;//預設輸入URL後自動跳轉，會先判斷是否有客製化功能

  childs?: AtListItem[]; //這邊放的是巢狀結構
  collapseProps?: CollapseProps; //客製化Collapse的內容
  fontProps?: BoxProps;
}


export interface AtListRef {
  addItem: (item: AtListItem) => void
  deleteItem: (id: string) => void;// 這邊會找出特定的ID去做刪除，若無對應ID則不反應
}