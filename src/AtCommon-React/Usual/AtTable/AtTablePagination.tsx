import { Pagination, PaginationProps, TablePagination, TablePaginationProps } from "@mui/material";
import React, { ChangeEvent } from "react";
import { AtTableModel, AtTablePaginationProps } from "./Model/AtTableModel";
import AtSelection from "../AtSelection/AtSelection";

const AtTablePagination =(props:{
    pageProps:AtTablePaginationProps,
    tableProps:AtTableModel,
    setStateProps: React.Dispatch<React.SetStateAction<AtTableModel<any>>>
})=>{
    const  rowPerpage = props.pageProps.rowsPerPage ?? props.pageProps.rowsPerPageOptions![0];
    const filteredDatas = props.tableProps.datas!.filter(rowData => {
        var filterFeilds = props.tableProps.feilds.filter(feild => feild.currentFilters!.length > 0)
        if(filterFeilds.length == 0)
          return true;
        else
          return !filterFeilds.some(feild=>!feild.customerFilter(feild,rowData,feild.currentFilters!))
      })

    //變換頁數(這邊給出來的page頁數從 1 起算)
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) =>{

        // 預設功能,
        props.setStateProps(pre => {
            return {...pre , pageinationProps:{...pre.pageinationProps , page:page}}
        })

        //客製化功能，可以透過重新刷props來達到覆寫上方預設功能
        if(props.pageProps.onChange) props.pageProps.onChange(event,page); 
    }

    // 變換每頁顯示筆數時
    const handleRowPerPages = (event , page)=>{
        props.setStateProps(pre => {return {...pre , pageinationProps:{...pre.pageinationProps,
            rowsPerPage:parseInt(event.target.value!.toString()),
            page:1 //切換頁數後，回到第一頁
        }}})
    }

    return(
     <div className="AtTable-Pagination-container">

        {/* 切換頁數 */}
        <span className="lable">每頁：</span>
        <span>
            <AtSelection 
                formOptions={{className:"AtTable-Pagination-pageOptions" , variant:"outlined"}}
                datas={props.pageProps.rowsPerPageOptions!.map(e=>{return { key: e.toString(), value: e }})} 
                selectProps={{onChange:handleRowPerPages , variant:"outlined"} }
                value={rowPerpage.toString()}
                label={""} />
        </span>
        <span  className="lable">筆</span>

        {/* 頁數選單 */}
        <span>
            <Pagination {...props}
                count={Math.ceil((props.pageProps.count ?? filteredDatas.length)/rowPerpage)}
                shape={props.pageProps.shape??"rounded"}
                onChange={handlePageChange}
            />
        </span>
    </div>)
}
export default AtTablePagination;