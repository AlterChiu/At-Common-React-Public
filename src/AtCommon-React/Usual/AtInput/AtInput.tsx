import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, TextField } from "@mui/material";
import React, { ChangeEvent, useImperativeHandle } from "react";
import AtIdCreader from "../AtCommon/AtIdCreater";
import { defaultInput, defaultLabel4Input } from "./AtInputStyle";
import { AtInputRef, IAtInputModel } from "./Model/AtInputModel";

const AtInput: React.ForwardRefRenderFunction<AtInputRef, IAtInputModel> = (
  props: IAtInputModel,
  ref?
) => {
  let inputRef = {} as HTMLDivElement | null;
  const [input, setInput] = React.useState<IAtInputModel>(defaulProps({}, props));
  React.useEffect(() => { setInput((pre) => defaulProps(pre, props)); }, [props]);

  React.useEffect(() => { //優先取用 defaultValue 作為預設值
    if (props.defaultValue && !input.value)
      setInput((pre) => {
        return { ...pre, value: props.defaultValue };
      });
  }, []);


  //跟外部作業的互動
  useImperativeHandle(ref, () => ({
    setType: (type: "number" | "TextField" | "Password") => {
      setInput((pre) => ({ ...pre, type: type }));
    },
    getValue: (): string => {
      return input.value as string;
    },
    setValue: (value: any) => {
      setInput((pre) => {
        return { ...pre, value: value };
      });
    },
    getInput: () => {
      return inputRef;
    },
  }));

  return (
    <TextField
      {...input}
      ref={(e) => (inputRef = e)}
      InputLabelProps={{ sx: { ...defaultLabel4Input, ...input.inputProps.sx }, ...input.inputProps }}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        defaultOnChange(setInput, e); //預設變化

        if (input.onChange) input.onChange(e);
      }}
      sx={Object.assign(defaultInput, { ...input.sx })} // 客製化指定寬度

      // 寬鬆客製化
      InputProps={Object.assign(
        // 預設樣式
        {
          endAdornment:
            input.defaultType == "Password" ? (
              <DefaultPasswordPosFix
                callBack={(type: "TextField" | "Password") => {
                  setInput((pre) => ({ ...pre, type: type }));
                }}
              />
            ) : (
              input.postFix
            ),
          startAdornment: input.preFix ? input.preFix : undefined,
        },

        // 其他樣式得透過前端自定義去寫
        input.inputProps
      )}
    ></TextField>
  );
};
export default React.forwardRef(AtInput);

const DefaultPasswordPosFix = (props: { callBack }) => {
  // 密碼後面眼睛動畫
  const [showPassword, setShowPassword] = React.useState(true);
  const handleClickShowPassword = () =>
    setShowPassword((show) => {
      show == false ? props.callBack("Password") : props.callBack("TextField");
      return !show;
    });
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // 回傳 眼睛
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};

const defaultOnChange = (setState, e: React.ChangeEvent<HTMLInputElement>) => {
  setState((pre) => {
    return { ...pre, value: e.target.value };
  });
};

const defaulProps = (pre: IAtInputModel, props: IAtInputModel): IAtInputModel => {
  return Object.assign(
    {
      id: AtIdCreader.getId("input"),
      type: pre.type ?? props.defaultType == "Password" ? "Password" : undefined, //先繼承之前的狀態(透過ref修改)
      value: pre.value ?? props.defaultValue,//先繼承之前的狀態(透過ref修改)
      variant: "standard",
      multiline: false,
      inputProps: {},
      defaultType: "TextField",
      autoFocus: false,
    },
    props
  )
}


