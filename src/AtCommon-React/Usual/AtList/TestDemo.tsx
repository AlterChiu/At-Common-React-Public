import React from "react";
import AtList from "./AtList";
import { AtListItem, AtListRef } from "./Model/IAtListModel";
import { AtDrawerRef } from "../AtDrawer/AtDrawerModel";
import AtDrawer from "../AtDrawer/AtDrawer";

export const TestDemo = () => {
  // 測試資料
  const additionData = { label: "新增測試" } as AtListItem

  const [datas, setDatas] = React.useState<AtListItem[]>([
    { label: "測試一", id: "test01", urlLink: "https://google.com" },
    {
      label: "測試二",
      childs: [{ label: "子1", id: "test02-c01" }, { label: "子2", childs: [{ label: "孫" }] }],
    },
    {
      label: "測試三(預設開啟)",
      childs: [{ label: "子1" }, { label: "子2", childs: [{ label: "孫" }] }],
      collapseProps: { in: true } //從collapse裡的
    }
  ])


  // 建立ref(等同於用jquery做selector)
  const listRef = React.createRef<AtListRef>();
  const drawerRef = React.createRef<AtDrawerRef>();




  const stateFunc = (state: boolean, action: StateAction) => {
    if (action.type == "open")
      return true;
    if (action.type == "close")
      return false;
    else
      return !state;
  }
  interface StateAction {
    type: "open" | "close" | "toggle";
  }
  const [state, setState] = React.useReducer(stateFunc, false);

  return (
    <>
      <AtList ref={listRef} datas={datas}></AtList>
      <AtDrawer ref={drawerRef} open={false} children={<AtList datas={datas} />} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => { setDatas(pre => { return [...pre, additionData] }) }}>加入一列(state方法)</button>
      <button onClick={() => { listRef.current?.addItem(additionData) }}>加入一列(Ref方法)</button>
      <button onClick={() => { listRef.current?.deleteItem("test01") }}>刪除測試一</button>
      <button onClick={() => { listRef.current?.deleteItem("test02-c01") }}>刪除測試二，子一</button>
      <button onClick={() => { drawerRef.current?.open() }}>開啟drawer</button>
      <br />
      <button onClick={() => { setState({ type: "open" }); console.log(state) }}>open</button>
      <button onClick={() => { setState({ type: "close" }); console.log(state) }}>close</button>
      <button onClick={() => { setState({ type: "toggle" }); console.log(state) }}>toggle</button>
    </>
  );
};
