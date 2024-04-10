
// 建立預設顯示Value
//#region 預設值

import { TableCellProps, TableRowProps } from "@mui/material"
import { AtTableModel, DouTableFeildDef } from "./AtTableModel"
import AtIdCreader from "../../AtCommon/AtIdCreater"

// 建立預設Props
const DefaultProps = (props: AtTableModel): AtTableModel => {
  return Object.assign(
    {
      datas: [],
      headerContainerProps: {},
      extraHeaders: [],
      pagination:false,// 頁數切換
      headerShow:true, //預設顯示Header

      //多層式Table
      detailable: false,
      currentDetail: undefined,
      detailformatter: () => { return <></> },
      

      // 預設奇數偶數不同
      bodyRowProps: (rowIndex: number): TableRowProps => {
        if (rowIndex % 2 == 0) return { className: "AtTable-BodyRow-even" } //偶數列
        return { className: "AtTable-BodyRow-odd" } //奇數列
      }
    }, props,

    // 預設給tableProps一個ID
    {
      tableProps: Object.assign({
        id: AtIdCreader.getId("At-Table")
      }, props.tableProps)
    },

    // 預設的feild
    {
      feilds: defaultFeild(props),
    } ,

    // 多頁切換
    {
      pageinationProps: Object.assign({
        rowsPerPageOptions:[1,5,10,25],
        rowsPerPage:10,
        page:1, //由一開始起算
        showFirstButton:true, //最前頁Button
        showLastButton :true, //最後頁Button
      } , props.pageinationProps)
    }
  )
}


const defaultFeild = (props: AtTableModel) => {
  return props.feilds.map(feild => {


    // 預設顯示 row的對應欄位
    const defaultFormatter = feild.formatter ? feild.formatter :
      (feildKey: string, row: any, data: any[]) => {
        return <div className={`At-TableBody-${feildKey}`}>{row[feildKey]}</div>;
      };

    // 預設提供給使用者Filter的選項
    const filterOptionsFunction: (feild: DouTableFeildDef, data: any[]) => string[] =
    feild.customerFilterOptions ? feild.customerFilterOptions :

      // 預設邏輯，取欄位唯一值，轉換為array
      (feild: DouTableFeildDef, data: any[]) => {
        return Array.from(new Set<string>(data.map(e => e[feild.feildKey] ?? "")))
      };


      // 預設篩選的邏輯
    const customerFilterFunction: (feild:DouTableFeildDef, row:any , filterStrings:string[]) => boolean =
      feild.customerFilter ? feild.customerFilter :

      // 預設邏輯，看內容是否相同即可
      (feild:DouTableFeildDef, row:any , filterStrings:string[]) => {
        return  filterStrings.includes(row[feild.feildKey]);
      }

    

    // 建立預設值
    return {
      key: AtIdCreader.getId("AtTable-Cell"), //ID
      datatype: "default", //預設文字
      allowNull: true, //允許為空
      editable: false, //允許編輯
      visiable: true, //允許顯示
      visiableEdit: true, //顯示於編輯
      sortable: false, //可排序
      filter: false, //可搜尋

      ...feild, // 使用者設定

      // 細部複寫
      formatter: defaultFormatter,

      // filter相關
      currentFilters:[],//目前篩選項目
      customerFilterOptions:filterOptionsFunction, //提供使用者選擇的項目
      customerFilter:customerFilterFunction, //呈現篩選結果


      // Table Header 對應欄位的 TableCell props
      headerCellProps: {
        align: "center", //預設置中
        ...feild.headerCellProps
      } as TableCellProps,

      // Table Body 對應欄位的 TableCell props
      bodyCellProps: {
        align: "center", //預設置中
        ...feild.bodyCellProps
      } as TableCellProps,

    }
  })
}
//#endregion
export default DefaultProps;