import { ChangeEvent } from "react";

export interface IAtSwitchModel {
  name: string;
  id?: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  defaultChecked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => {};
}

export interface AtSwitchRef {
  setValue: (value: boolean) => void;
  getValue: () => boolean;
}
