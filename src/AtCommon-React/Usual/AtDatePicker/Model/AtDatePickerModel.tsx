import dayjs from "dayjs";
import DatePickerComponent, {
  DatePickerProps,
  DateTimePickerProps,
  PickerChangeHandlerContext,
  TimePickerProps,
} from "@mui/x-date-pickers";
import React from "react";

// 用來判斷該提供哪一組Model用的
export type AtDatePickerVariant = "Time" | "Date" | "DateTime";

// Date樣式
export type AtDatePickerModels =
  | AtDatePickerProps
  | AtTimePickerProps
  | AtDateTimePickerProps;

// 分類下去的樣式
export type AtDatePickerModel<
  Variant extends AtDatePickerVariant = AtDatePickerVariant
> = Variant extends "Date"
  ? AtDatePickerProps
  : Variant extends "Time"
  ? AtTimePickerProps
  : AtDateTimePickerProps;

export type AtDatePickerProps = DatePickerProps<Date> &
  React.RefAttributes<HTMLDivElement>;

export interface AtTimePickerProps
  extends TimePickerProps<Date>,
    React.RefAttributes<HTMLDivElement> {}

export interface AtDateTimePickerProps
  extends DateTimePickerProps<Date>,
    React.RefAttributes<HTMLDivElement> {}

export interface AtDatePickerBaseProps {
  variant: AtDatePickerVariant;

  id?: string;
  style?: any; //客製化Style
  help?: string; //提示文字
  label?: string; //篩選框內顯示的文字

  defaultValue?: Date; //預設顯示的
  value?:Date; //目前的日期

  Details?: AtDatePickerProps;
  onChange? : (value: any, context: any) => void;
}

export interface AtDatePickerRef {
  setTime: (time: Date) => void;
  getTime: (format?: string) => Date | any;

  setDisableDate: (callback: () => boolean) => void;
  setStyle: (style: any) => void;

  getPickerRef : ()=> HTMLDivElement | null;
}
