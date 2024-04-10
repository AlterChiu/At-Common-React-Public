import React from "react";
import AtInput from "./AtInput";
import { AtInputRef } from "./Model/AtInputModel";

export const TestDemo = () => {
  const ref1 = React.useRef<AtInputRef>(null);
  const ref2 = React.useRef<AtInputRef>(null);

  return (
    <>
      <div>
        <button
          onClick={() => {
            ref1.current?.setType("TextField");
          }}
        >
          改為一般文字輸入
        </button>
        <button
          onClick={() => {
            ref1.current?.setType("Password");
          }}
        >
          改為密碼輸入
        </button>
        <button
          onClick={() => {
            alert(ref1.current?.getValue());
          }}
        >
          顯示目前數值
        </button>
        <button
          onClick={() => {
            ref2.current?.setValue(ref1.current?.getValue());
          }}
        >
          第一欄複製到第二欄
        </button>
      </div>
      <div>
        <AtInput
          ref={ref1}
          label="第一欄"
          onKeyUp={() => { console.log(ref1.current?.getValue()) }}
          id="test-selection-demo"
          defaultType="Password"
          variant="standard"
          defaultValue="12354"
        ></AtInput>
      </div>
      <div>
        <AtInput
          ref={ref2}
          label="第二欄"
          id="test-selection-demo2"
          defaultType="TextField"
          variant="standard"
          defaultValue="12354"
        ></AtInput>
      </div>
    </>
  );
};
