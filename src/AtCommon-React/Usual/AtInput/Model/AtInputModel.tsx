import {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material";
import { ChangeEvent, ComponentProps } from "react";

// 呼叫用interface
export interface IAtInputModel extends Omit<TextFieldProps, "variant"> {
  variant?: TextFieldVariants; // TextInput預設需要
  id?: string; // 這邊可以直接給id，用document.find會比較好操作，就不用透過ref了

  defaultType?: "TextField" | "Password" | "number"; // 用於產製客製化基礎樣式
  defaultValue?: string; //預設數值

  // 輸入欄位
  preFix?: JSX.Element; //前墜
  postFix?: JSX.Element; //後墜
  inputProps?: any; // 其他設定
}

export interface AtInputRef {
  setType: (type: "TextField" | "Password" | "number") => void; // 設定客製化樣式
  getValue: () => string;
  setValue: (value: any) => void;

  getInput: () => HTMLDivElement | null; //取得mui Text物件
}
