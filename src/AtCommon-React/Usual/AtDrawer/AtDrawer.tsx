import { Box, Divider, Drawer, ListItem, ListItemButton } from "@mui/material";
import React, { useImperativeHandle } from "react";
import "./AtDrawerStyle.css";
import { drawer_title, drawer_title_font } from "./AtDrawerStyle";
import { AtDrawerRef, IAtDrawerModel } from "./AtDrawerModel";
import AtIdCreader from "../AtCommon/AtIdCreater";

const AtDrawer: React.ForwardRefRenderFunction<AtDrawerRef, IAtDrawerModel> = (props: IAtDrawerModel, ref?) => {
  //#region  載入預設值
  let drawerRef = {} as HTMLDivElement | null;
  const [drawer, setDrawer] = React.useState<IAtDrawerModel>(DefaultValue({}, props));

  React.useEffect(() => {
    setDrawer((pre) => { return DefaultValue(pre, props); });
  }, [props]);
  //#endregion

  //#region  控制drawer開關
  const setDrawerToggle = () => {
    setDrawer((pre) => {
      return { ...pre, open: !pre.open };
    });
  };

  const setDrawerOpen = () => {
    setDrawer((pre) => {
      return { ...pre, open: true };
    });
  };

  const setDrawerClose = () => {
    setDrawer((pre) => {
      return { ...pre, open: false };
    });
  };
  //#endregion

  //#region  跟外部作業的互動
  useImperativeHandle(ref, () => ({
    //
    // 關閉drawer
    close: () => {
      setDrawerClose();
    },

    //
    // 切換drawer，開變關，關變開
    toggle: () => {
      setDrawerToggle();
    },

    //
    // 開啟drawer
    open: () => {
      setDrawerOpen();
    },

    //
    // 回傳目前drawer啟閉狀態
    isOpened: () => {
      return drawer.open!;
    },

    //
    // 重新設定drawer的style，建議直接透過document.getClassName直接去改className，透過css去設定樣式
    // mui對於style複寫支援性很差
    setStyle: (style) => {
      setDrawer((pre) => {
        return { ...pre, style: style };
      });
    },

    //
    //取得drawer的htmlRef
    getDrawer: () => {
      return drawerRef;
    },
  }));
  //#endregion

  return (
    <Drawer
      {...drawer}
      // 取得html的操作物件
      ref={(e) => {
        drawerRef = e;
      }}
      key={drawer.id}
      //
      //
      //
      //若設定為不可開關的drawer，取消onclose功能
      onClose={() => {
        if (drawer.canClose) setDrawerClose();
      }}
      //
      //
      //
      // 預設className從props那邊繼承，由上下展示的drawer預設採用100vw，如要修改格式可透過css去複寫
      className={
        `${drawer.className} 
         ${drawer.anchor == "top" || drawer.anchor == "bottom" ? "at-drawer-bottomTop" : "at-drawer"}` //drawer在上下時採用100VW
      }
      //
      //
      //
      // 是否在開啟drawer時用modal遮蔽
      variant={drawer.isModal ? "temporary" : "persistent"}
    >
      {/*
      *
      *
      * 
      * 
      * 
      Title 位置 ，可透過客製化複寫titleContent去生成title的物件，
      如果只輸入string則會採用預設listButton
      */}
      {drawer.titleContent == undefined ? (
        <></>
      ) : (
        <>
          <ListItem disablePadding sx={{ ...drawer_title, minHeight: { xs: "64px" } }}>
            {/* 若Title僅設定為文字時，以ListText方式呈現，不然就自訂 */}
            <ListItemButton key={AtIdCreader.getId("DraweTitle")}>
              {drawer.titleContent instanceof Object ? (
                drawer.titleContent
              ) : (
                <Box component={"div"} sx={drawer_title_font}>
                  {drawer.titleContent}
                </Box>
              )}
            </ListItemButton>
          </ListItem>
          <Divider />
        </>
      )}

      {/* 
      *
      *
      *
      *
      *
      客製化內容，可透過JSX.Element客製化內容
       */}
      {drawer.children}
    </Drawer>
  );
};
export default React.forwardRef(AtDrawer);

const DefaultValue = (pre: IAtDrawerModel, props: IAtDrawerModel) => {
  return Object.assign(
    {
      anchor: "left",
      open: pre.open ?? props.open ?? false,
      canClose: true,
      isModal: true,
      titleIcon: "bars",
      datas: [],
      content: <></>,
      id: AtIdCreader.getId("AtDrawer"),
    },
    props
  )
}