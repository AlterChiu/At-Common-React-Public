import react from "react";
import { AtTableModel, DouTableFeildDef } from "./Model/AtTableModel";
import AtTable from "./AtTable";
import AtPannel from "../AtPannel/AtPannel";
import "./TestDemo.css";

const datas = Array.from({ length: 10000 }, (_, index) => index + 1).map(e => {return {testCol1:e , testCol2:`${e}` , index:e}});
const model = {
  feilds: [
    { title: "預設中文顯示", feildKey: "testCol1", sortable: true}, //預設排序為文字排序，不管實際資料內容
    {
      title: "Cell設定顯示(文字排序)", feildKey: "testCol2", sortable: true,  filter:true //預設排序為文字排序
      , headerCellProps: { align: "left" }, bodyCellProps: { align: "right" } //客製化調整Header的顯示方式，繼承MUI Header (TableCellProps)
    },
    {
      title: "客製化顯示(數字排序)", feildKey: "index",
      formatter: (feildKey, row, data) => { //客製化顯示的內容
        return <div>{row![feildKey]}</div>
      },

      //客製化內容無法使用預設排序，得
      sortable: true, datatype:"default",
      customerSort: (row1, row2) => { return row1["index"] - row2["index"] },  //雖設定資料格式為文字，但仍可透過客製化方式改變sorting

      filter:true, //因為這個欄位是透過 formatter 包一層div在外層，filter需要客製化
      customerFilterOptions : (feild:DouTableFeildDef, data)=>{ return data.map(row => row["index"].toString())},
      customerFilter :(feild:DouTableFeildDef, row, filterStrings)=>{ return filterStrings.includes(row["index"].toString())},
    }

  ],
  datas:datas
  ,

  // 開啟細部內容
  detailable: true,
  detailformatter: (row: any, data: any[]) => {
    return <button>{row["testCol1"]}</button>
  },

  //多頁切換
  pageination:true,
  pageinationProps:{
    page:1,
  }


} as AtTableModel<DataModel>;

interface DataModel {
  testCol1: string;
  testCol2: string;
  index: number;
}

export const TestDemo = () => {
  return <>
    <AtTable {...model} />
    <AtPannel>
      <>
        <h4>客製化Table樣式</h4>
        <AtTable {...model} tableProps={{ className: "DemoContainer" }} />
      </>
    </AtPannel>

  </>
};
