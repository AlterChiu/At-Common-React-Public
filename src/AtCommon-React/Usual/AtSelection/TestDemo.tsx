import React, { ChangeEvent } from "react";
import AtSelection from "./AtSelection";
import { AutocompleteRenderInputParams, SelectChangeEvent } from "@mui/material";
import { AtSelectGroupItemProps, AtSelectionItemProps, AtSelectionRef } from "./Model/AtSelectionModel";
import AtInput from "../AtInput/AtInput";
import AtAutoComplete from "../AtAutoComplete/AtAutoComplete";
import { AutoCompleteRef } from "../AtAutoComplete/Model/AtAutoCompleteModel";

export const TestDemo = () => {
  const refs = {
    auto1: React.createRef<AutoCompleteRef>(),
    auto2: React.createRef<AutoCompleteRef>(),
    select1: React.createRef<AtSelectionRef>(),
    select2: React.createRef<AtSelectionRef>(),
  }


  const datas = [
    { key: "你好挖", value: "1" },
    { key: "我很好", value: "2" },
    { key: "他不太好", value: "3" },
    { key: "你想幹嘛", value: "4" },
  ] as AtSelectionItemProps[];

  const groupDatas = [
    { groupName: "第一個", datas: datas },
  ] as AtSelectGroupItemProps[]



  return (
    <>
      <div style={{ width: "80%", height: "20px" }}>
        <AtAutoComplete ref={refs.auto1} datas={groupDatas} label="沒有群組名稱的" />
      </div>
      {/* <AtAutoComplete ref={refs.auto2} datas={[{ datas: datas }]} label="有群組名稱的" /> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => { alert(refs.auto1.current?.getValue()) }}>取得第一個AutoComplete的數值</button>
      <button onClick={() => { refs.auto1.current?.setValue(1) }}>設定第一個autoComplete的數值</button>

      <AtSelection
        ref={refs.select1}
        datas={datas}
        label={"單一選項"}></AtSelection>


      <AtSelection
        ref={refs.select2}
        datas={groupDatas}
        label={"群組選項"}></AtSelection>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <button onClick={() => { refs.select1.current?.openOption() }}>開啟第一個選項</button>
      <button onClick={() => { refs.select1.current?.closeOption() }}>關閉第一個選項</button>

    </>
  );
};
