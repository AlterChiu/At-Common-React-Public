import react, { useImperativeHandle } from "react";
import {
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  AtDatePickerBaseProps,
  AtDatePickerProps,
  AtDatePickerRef,
  AtDateTimePickerProps,
  AtTimePickerProps,
} from "./Model/AtDatePickerModel";
import "dayjs/locale/zh-tw";
import React from "react";
import AtIdCreader from "../AtCommon/AtIdCreater";
import AtTimeTranslate from "../AtCommon/AtTimeTransalte";
import dayjs from "dayjs";

const AtDatePicker: React.ForwardRefRenderFunction<
  AtDatePickerRef,
  AtDatePickerBaseProps
> = (props: AtDatePickerBaseProps, ref?) => {
  let pickerRef = {} as HTMLDivElement | null;

  // 建立預設
  const [picker, setPicker] = React.useState<AtDatePickerBaseProps>(
    Object.assign(
      {
        disabledDate: (date: string) => {
          return false;
        },
        id: AtIdCreader.getId("atDatePicker"),
        variant: "Date",
      },
      props
    )
  );

  // 數值變動時更新
  React.useEffect(() => {
    setPicker((pre) => {
      return { ...pre, ...props };
    });
  }, [props]);

  //#region 對外功能
  useImperativeHandle(ref, () => ({
    //設定挑選時間
    setTime: (time: Date) => {
      let newDate = new AdapterDayjs().date(time) as any;
      setPicker((pre) => {
        return { ...pre, value: newDate };
      });
    },

    // 取得選取時間文字
    getTime: (format?: string) => {
      if (format)
        return AtTimeTranslate.parseDate(picker.value!).format(format);
      return AtTimeTranslate.parseDate(picker.value!).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },

    // 設定無法選取時間
    setDisableDate: (callBack: () => boolean) => {
      setPicker((pre) => {
        return { ...pre, shouldDisableDate: callBack };
      });
    },

    // 設定樣式
    setStyle: (style) => {
      setPicker((pre) => {
        return { ...pre, style: style };
      });
    },

    getPickerRef: () => {
      return pickerRef;
    },
  }));
  //#endregion
  return (
    <BasePicker id={picker.id}>
      {picker.variant == "Date" && (
        <DatePicker
          {...picker}
          {...picker.Details}
          sx={{ ...picker.style }}
          onChange={(value, context) => {
            defaultOnChange(value, context, setPicker);
            if (picker.onChange) picker.onChange(value, context); // 客製化onchange
          }}
          ref={(r) => (pickerRef = r)}
        />
      )}

      {picker.variant == "Time" && (
        <TimePicker
          {...(Object.assign(picker, picker.Details) as AtTimePickerProps)}
          sx={{ ...picker.style }}
          onChange={(value, context) => {
            defaultOnChange(value, context, setPicker);
            if (picker.onChange) picker.onChange(value, context); // 客製化onchange
          }}
          ref={(r) => (pickerRef = r)}
        />
      )}

      {picker.variant == "DateTime" && (
        <DateTimePicker
          {...picker}
          {...(picker.Details as AtDateTimePickerProps)}
          sx={{ ...picker.style }}
          onChange={(value, context) => {
            defaultOnChange(value, context, setPicker);
            if (picker.onChange) picker.onChange(value, context); // 客製化onchange
          }}
          ref={(r) => (pickerRef = r)}
        />
      )}
    </BasePicker>
  );
};
export default React.forwardRef(AtDatePicker);

//#region  中文化
const BasePicker = ({ children, id }) => {
  return (
    <div id={id}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-tw">
        {children}
      </LocalizationProvider>
    </div>
  );
};
//#endregion

const defaultOnChange = (
  value: any,
  context: any,
  setPicker: react.Dispatch<react.SetStateAction<AtDatePickerBaseProps>>
) => {
  setPicker((pre) => {
    return { ...pre, value: value };
  });
};
