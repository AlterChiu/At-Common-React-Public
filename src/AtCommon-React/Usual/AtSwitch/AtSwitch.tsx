import { Switch } from "@mui/material";
import React, { ChangeEvent, useImperativeHandle } from "react";
import AtIdCreader from "../AtCommon/AtIdCreater";
import { AtSwitchRef, IAtSwitchModel } from "./Model/IAtSwitchModel";

const AtSwitch: React.ForwardRefRenderFunction<AtSwitchRef, IAtSwitchModel> = (
  props: IAtSwitchModel,
  ref?
) => {
  // 建立預設值
  const [switchProps, setSwitch] = React.useState<IAtSwitchModel>(
    Object.assign(
      {
        id: AtIdCreader.getId("switch"),
        color: "primary",
        onChange: (e: ChangeEvent) => {},
        onClick: () => {
          setSwitch((pre) => {
            return { ...pre, defaultChecked: !pre.defaultChecked };
          });
        },
        defaultChecked: true,
      },
      props
    )
  );

  React.useEffect(() => {
    setSwitch((pre) => {
      return { ...pre, ...props };
    });
  }, [props]);

  //跟外部作業的互動
  useImperativeHandle(ref, () => ({
    setValue: (value: boolean) => {
      setSwitch((pre) => {
        return { ...pre, defaultChecked: value };
      });
    },

    getValue: () => {
      return switchProps.defaultChecked!;
    },
  }));

  return (
    <>
      <label htmlFor={switchProps.id}>{switchProps.name}</label>
      <Switch
        id={switchProps.id}
        color={switchProps.color}
        checked={switchProps.defaultChecked}
        onChange={switchProps.onChange}
        onClick={() => {
          switchProps.onClick!();
        }}
      />
    </>
  );
};

export default React.forwardRef(AtSwitch);
