import { AtListItem } from "../AtList/Model/IAtListModel";
import { DrawerProps } from "@mui/material";

export interface IAtDrawerModel extends DrawerProps {
  // 客製化

  canClose?: boolean; //點選其他地方時關閉drawer，有Title時預設關閉
  isModal?: boolean; //啟動drawer時，其他地方是否要加上灰底

  // title相關的客製化參數
  titleContent?: string | JSX.Element;

  // 其他children content
  children?: JSX.Element;
}

export interface AtDrawerRef {
  close: () => void;
  open: () => void;
  toggle: () => void;
  isOpened: () => boolean;
  setStyle: (style: any) => void;
  getDrawer: () => HTMLDivElement | null;
}

export interface AtDrawerData {
  groupName: string;
  items: AtListItem[];
}
