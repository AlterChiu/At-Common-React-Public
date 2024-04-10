import {
  Autocomplete,
  AutocompleteValue,
  FormControl,
  InputLabel,
  ListSubheader,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useImperativeHandle } from "react";
import AtIdCreader from "../AtCommon/AtIdCreater";
import { defaulOptionGroupLabel4Selection, defaultForm4Selection, defaultLable4Selection, defaultOption4Selection, defaultOptionGroup4Selection, defaultSelection, noneValueLabel } from "./AtSelectionStyle";
import { AtSelectGroupItemProps, AtSelectionItemProps, AtSelectionRef, IAtSelectionModel } from "./Model/AtSelectionModel";
import { AtKeyVal } from "../AtCommon/AtKeyVal";
import AtInput from "../AtInput/AtInput";

const AtSelection: React.ForwardRefRenderFunction<
  AtSelectionRef,
  IAtSelectionModel
> = (props: IAtSelectionModel, ref?) => {

  //#region  載入預設值
  const selectRef = React.useRef(null); // 创建一个ref
  const [selection, setSelection] = React.useState<IAtSelectionModel>(
    Object.assign(
      {
        selectProps: {
          id: AtIdCreader.getId("selection"),
          variant: "standard",
          open: false,
          disabled: false,
        },
        textQuery: false,
      },
      props
    )
  );
  React.useEffect(() => {
    setSelection((pre) => {
      return { ...pre, ...props };
    });
  }, [props]);
  //#endregion

  //#region 內部component的互動
  const selectionFunc = {
    OpenOption: () => { setSelection(pre => { return { ...pre, open: true } }) },
    CloseOption: () => { setSelection(pre => { return { ...pre, open: false } }) },
    ToggleOption: () => { setSelection(pre => { return { ...pre, open: !pre.selectProps?.open } }) },
    OptionOnChange: (value) => { setSelection(pre => { return { ...pre, value: value } }) },
    OptionOnSelect: (value: string | number | readonly string[] | undefined) => { selectionFunc.OptionOnChange(value); selectionFunc.CloseOption(); }
  }
  //#endregion

  //#region 跟外部作業的互動
  useImperativeHandle(ref, () => ({
    getValue: (): string => {
      return selection.value!;
    },
    setValue: (value: string) => {
      // 確認是否有這個項目

    },
    addItem: (item: AtKeyVal) => {

    },
    getItems: () => {
      var itemts = [] as AtKeyVal[];
      selection.datas.forEach(data => {
        if (data.groupName !== undefined)
          itemts.push(data);
        else {
          var temptArray = data.datas as AtKeyVal[];
          temptArray.forEach(e => itemts.push(e));
        }
      })
      return itemts;
    },
    setItems: (items: AtKeyVal[]) => {
      setSelection((pre) => {
        return { ...pre, datas: items };
      });
    },

    openOption: () => { selectionFunc.OpenOption() },
    toggleOption: () => { selectionFunc.ToggleOption() },
    closeOption: () => { selectionFunc.CloseOption() },
  }));
  //#endregion

  return (
    <>
      <FormControl
        variant="filled"
        {...selection.formOptions}
        sx={{ ...defaultForm4Selection, ...selection.formOptions?.sx }} // 客製化指定寬度
      >
        {/* 顯示的標題文字 */}
        <InputLabel {...selection.lableOption}
          id={selection.selectProps!.id + "-label"}
          sx={selection.defaultValue || selection.value ?
            { ...defaultLable4Selection, ...selection.lableOption?.sx } :
            { ...noneValueLabel, ...defaultLable4Selection, ...selection.lableOption?.sx }
          }
        >{selection.label}</InputLabel>

        {/* 選項顯示位置 */}
        <Select
          {...selection}
          ref={selectRef}
          sx={{ ...defaultSelection, ...selection.selectProps!.sx}}
          labelId={selection.selectProps!.id + "-label"} //預設對應到上方的inputLabel
          onOpen={() => { selectionFunc.OpenOption(); }} //因為control了open參數，這邊要手動設定onOpen跟onClose
          onClose={() => { selectionFunc.CloseOption() }}
          onChange={(event: SelectChangeEvent<string>, child: React.ReactNode) => {
            //
            // 處裡客製化onChange
            if (selection.selectProps!.onChange != null)
              selection.selectProps!.onChange(event, child);
            //
            //
            // 通用onChange 必要存在
            setSelection((pre) => {
              return { ...pre, value: event.target.value };
            });

          }}
        >

          {/* 產製List的選項 */}
          {selection.datas.length > 0 && (selection.datas[0] as AtSelectGroupItemProps).groupName != undefined ?
            GetGroupItems(selection.datas as AtSelectGroupItemProps[]) :
            GetItemts(selection.datas as AtSelectionItemProps[])
          }
        </Select>
      </FormControl >
    </>
  );
};
export default React.forwardRef(AtSelection);

//#region  Options的顯示方式
export const GetGroupItems = (options: AtSelectGroupItemProps[]): JSX.Element[] => {
  var outList = [] as JSX.Element[];
  options.forEach(group => {
    if (group.groupName)
      outList.push(<ListSubheader {...group.groupOption} sx={{ ...group.groupOption?.sx, ...defaulOptionGroupLabel4Selection }}>{group.groupName}</ListSubheader>);
    group.datas.forEach(data => outList.push(<MenuItem {...data} sx={{ ...defaultOptionGroup4Selection, ...data.sx }}>{data.key}</MenuItem >))
  })
  return outList;
}

export const GetItemts = (options: AtSelectionItemProps[]): JSX.Element[] => {
  return (options.map(data =>
    <MenuItem  {...data}
      sx={{ ...defaultOption4Selection, ...data.sx }}>
      {data.key}</MenuItem >)
  )
}
//#endregion
