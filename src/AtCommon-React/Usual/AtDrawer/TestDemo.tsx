import { Drawer } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import AtDrawer from "./AtDrawer";
import { AtDrawerRef } from "./AtDrawerModel";
import AtInput from "../AtInput/AtInput";

export const TestDemo = () => {
  const ref = {
    left: React.createRef<AtDrawerRef>(),
    top: React.createRef<AtDrawerRef>(),
    right: React.createRef<AtDrawerRef>(),
    bottom: React.createRef<AtDrawerRef>(),
  };

  // 這個
  return (
    <div className="container-fluid">
      <AtDrawer ref={ref.left} anchor="left" children={<h1>我是左邊</h1>}></AtDrawer>
      <AtDrawer ref={ref.right} anchor="right" children={<h1>我是右邊</h1>}></AtDrawer>
      <AtDrawer ref={ref.top} anchor="top" isModal={true} children={<h1>我是上面</h1>}></AtDrawer>
      <AtDrawer ref={ref.bottom} anchor="bottom" isModal={false} children={<><h1>我是下面</h1><AtInput name="可以自行輸入" /></>}></AtDrawer>

      <button onClick={() => { ref.top.current?.toggle() }}>上方drawer開關</button>
      <button onClick={() => { ref.bottom.current?.toggle() }}>下方drawer開關</button>
      <button onClick={() => { ref.left.current?.toggle() }}>左方drawer開關</button>
      <button onClick={() => { ref.right.current?.toggle() }}>右方drawer開關</button>
    </div>
  );
};
