import { Collapse, TableCell, TableRow } from "@mui/material";
import React from "react";
import { AtTableModel } from "./Model/AtTableModel";


const AtTableBody = (
    stateProps: AtTableModel,
    setStateProps: React.Dispatch<React.SetStateAction<AtTableModel<any>>>) => {
    return stateProps.
    
    // filter功能
    datas?.filter(rowData => {
      var filterFeilds =  stateProps.feilds.filter(feild => feild.currentFilters!.length > 0)
      if(filterFeilds.length == 0)
        return true;
      else
        return !filterFeilds.some(feild=>!feild.customerFilter(feild,rowData,feild.currentFilters!))
    })

    // 若有啟動頁數控制時，會依據筆數去切換(page從1起算)
    .filter((value, index: number)=>{
      if(stateProps.pageination)
          return index >= (stateProps.pageinationProps!.page!-1) * stateProps.pageinationProps!.rowsPerPage! &&
                 index < (stateProps.pageinationProps!.page!-1) * stateProps.pageinationProps!.rowsPerPage! + stateProps.pageinationProps!.rowsPerPage!
      else
          return true;
  })

    // 製作各資料列   
    .map((rowData, rowIndex) => {
      return <>
        {/* 預設內容 */}
        <TableRow {...stateProps.bodyRowProps!(rowIndex)}
          className={`AtTable-BodyRow ${stateProps.detailable ? "detailable" : ""} ${stateProps.bodyRowProps!(rowIndex).className}`}
          onClick={(event) => {
            if (stateProps.bodyRowProps!(rowIndex).onClick) stateProps.bodyRowProps!(rowIndex).onClick!(event);
            if (stateProps.detailable)
              setStateProps(pre => { return { ...pre, currentDetail: pre.currentDetail == rowIndex ? undefined : rowIndex } })
          }}
        >
          {
            // 製作各資料欄
            stateProps.feilds.map(feild => (
              <TableCell {...feild.bodyCellProps}>
                {feild.formatter!(feild.feildKey, rowData, stateProps.datas!)}
              </TableCell>
            ))
          }
        </TableRow>
  
        {/* 細部內容 */}
        <Collapse in={rowIndex == stateProps.currentDetail}>
          {stateProps.detailformatter!(rowData, stateProps.datas!)}
        </Collapse>
      </>
    })
  }
  export default AtTableBody;