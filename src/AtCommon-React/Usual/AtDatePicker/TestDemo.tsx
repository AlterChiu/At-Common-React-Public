import React from "react";
import dayjs from "dayjs";
import {
  AtDatePickerBaseProps,
  AtDatePickerModels,
  AtDatePickerRef,
} from "./Model/AtDatePickerModel";
import AtDatePicker from "./AtDatePicker";
import AtTimeTranslate from "../AtCommon/AtTimeTransalte";

const TestDemo = () => {
  var dateRef = React.createRef<AtDatePickerRef>();
  var timeRef = React.createRef<AtDatePickerRef>();
  var dateTimeRef = React.createRef<AtDatePickerRef>();

  const [defaultDateTime, setDefaultDateTime] = React.useState(
    AtTimeTranslate.parseString("2024-02-20 10:00:00", "YYYY-MM-DD HH:mm:ss")
  );

  return (
    <div>
      {/* 透過 ref 非同步方式修改資料 */}
      <AtDatePicker ref={dateRef} variant={"Date"} />
      <AtDatePicker ref={timeRef} variant={"Time"} />
      {/* 用useState同步方式修改資料 */}
      <AtDatePicker
        ref={dateTimeRef}
        variant={"DateTime"}
        value={defaultDateTime as any}
      />
      <button
        onClick={() => {
          alert(dateRef.current?.getTime("YYYY-MM-DD HH:mm:ss"));
        }}
      >
        顯示目前日期
      </button>
      <button
        onClick={() => {
          alert(timeRef.current?.getTime("YYYY-MM-DD HH:mm:ss"));
        }}
      >
        顯示目前時間
      </button>
      <button
        onClick={() => {
          alert(dateTimeRef.current?.getTime("YYYY-MM-DD HH:mm:ss"));
        }}
      >
        顯示目前時間日期
      </button>
      <br />
      <button
        onClick={() => {
          dateRef.current?.setTime(new Date());
        }}
      >
        設定現在日期
      </button>
      <button
        onClick={() => {
          timeRef.current?.setTime(new Date());
        }}
      >
        設定現在時間
      </button>
      <button
        onClick={() => {
          setDefaultDateTime((pre) => dayjs());
        }}
      >
        設定現在時間日期
      </button>
      <br /> <br />
      <div>非同步方式修改時間</div>
      <button
        onClick={() => {
          dateTimeRef.current?.setTime(dayjs("2024-01-30").toDate());
        }}
      >
        設定現在時間日期
      </button>
      <button
        onClick={() => {
          alert(defaultDateTime);
        }}
      >
        顯示目前state時間
      </button>
    </div>
  );
};
export default TestDemo;
