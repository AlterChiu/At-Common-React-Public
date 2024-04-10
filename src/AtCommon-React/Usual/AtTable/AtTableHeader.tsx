import { TableCell } from "@mui/material";
import React from "react";
import { AtTableModel, DouTableFeildDef } from "./Model/AtTableModel";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetFilterContent from "./AtTableHeader_Filter";

// #region Header組件
const HeaderCell = (
  feild: DouTableFeildDef,
  props: AtTableModel<any>, //目前狀態
  setProps: React.Dispatch<React.SetStateAction<AtTableModel<any>>> //修改內容
) => {
  //#region  排序
  const [sorting, setSorting] = React.useState<"desc" | "asc">("desc");
  const handelSortOnClick = () => {
    setSorting(pre => pre == "desc" ? "asc" : "desc"); //切換排序
    setProps(pre => {
      return {
        ...pre, currentSort: feild.feildKey, //切換排序欄位
        datas: sortArray(pre.datas!)
      }
    })
  }
  const sortArray = (datas: any[]) => {
    try {
      if (feild.customerSort) //客製化排序
        return sorting == "asc" ?
          datas.sort((row1, row2) => feild.customerSort(row1, row2)) :
          datas.sort((row1, row2) => feild.customerSort(row2, row1))

      else
        return feild.datatype == "number" ? //建立排序
          sorting == "asc" ? //數字排序
            datas.sort((row1, row2) => row1[feild.feildKey] ? row2[feild.feildKey] - row1[feild.feildKey] : 0) :
            datas.sort((row1, row2) => row1[feild.feildKey] ? row1[feild.feildKey] - row2[feild.feildKey] : 0) :

          sorting == "asc" ?//文字排序
            datas.sort((row1, row2) => row1[feild.feildKey] ? (row1[feild.feildKey] as string).toString().localeCompare(row2[feild.feildKey]) : 0) :
            datas.sort((row1, row2) => row1[feild.feildKey] ? (row2[feild.feildKey] as string).toString().localeCompare(row1[feild.feildKey]) : 0);
    } catch (ex) {
      console.log(ex)
      return datas;
    }
  }
  //#endregion


  return <TableCell {...feild.headerCellProps}
    className={`AtTable-HeaderCell ${feild.headerCellProps?.className} ${feild.sortable ? "sort" : ""}`}
    onClick={(e) => { if (feild.headerCellProps?.onClick) feild.headerCellProps?.onClick(e); }}
  >
    <div className="AtTable-HeaderCell-TitleGroup">
      <div className="AtTable-HeaderCell-TitleContainer"
        style={{ textAlign: feild.bodyCellProps?.align }} /*繼承TableCell的排版，因為TitleGroup被強制設為flex了*/
        onClick={() => { if (feild.sortable) handelSortOnClick() }} /*如果有sortable才會啟動的*/
      >
        <span className="AtTable-HeaderCell-Title">{feild.title}</span>
        <span className={`AtTable-HeaderCell-SortIcon ${props.currentSort == feild.feildKey ? "active" : ""} ${sorting}`}
        >

          {/* 排序功能 */}
          {feild.sortable ? <ArrowUpwardIcon sx={{ fontSize: "medium" }} /> : <></>}
        </span>
      </div>
      <span>
        <span className={`AtTable-HeaderCell-FilterIcon ${props.currentSort == feild.feildKey ? "active" : ""} ${sorting}`}
        >
          {/* Filter modal的功能 */}
          {feild.filter ? GetFilterContent(feild, props.datas!, setProps) : <></>}
        </span>
      </span>
    </div>
    <div></div>
  </TableCell>
}
//#endregion
export default HeaderCell;