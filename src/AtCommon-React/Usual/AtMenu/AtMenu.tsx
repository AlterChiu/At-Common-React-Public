import { ListItemButton, Menu } from "@mui/material";
import React, { useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import { AtMenuModel, AtMenuRef, IAtMenuModel } from "./Model/AtMenuModel";

const AtMenu: React.ForwardRefRenderFunction<AtMenuRef, IAtMenuModel> = (
  props: IAtMenuModel,
  ref?
) => {
  // 載入預設值
  props = AtMenuModel.create(props);

  // 載入預設選項，如果沒給就直接空的
  const [show, setShow] = React.useState(props.anchor);
  const handleClose = () => {
    setShow((e) => null);
  };

  //跟外部作業的互動
  useImperativeHandle(ref, () => ({
    show: (anchor: HTMLElement | null) => {
      setShow(anchor);
    },
  }));

  const navigate = useNavigate();
  return (
    <Menu
      anchorEl={show} //展開位置
      id={props.id}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(show)}
      onClose={handleClose}
    >
      {props.datas.map((data) => (
        <ListItemButton
          onClick={() => {
            data.onClick ? data.onClick() : navigate(data.value);
          }}
        >
          {data.key}
        </ListItemButton>
      ))}
    </Menu>
  );
};
export default React.forwardRef(AtMenu);
