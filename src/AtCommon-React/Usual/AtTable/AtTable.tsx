import "../AtDou/Style.css";
import "./Style.css";

import { AtTableModel, AtTableRef, DouTableFeildDef } from "./Model/AtTableModel";
import React from "react";
import { Table } from "react-bootstrap";
import { Collapse, PaginationProps, TableBody, TableCell, TableCellProps, TableHead, TablePagination, TableRow, TableRowProps, TableSortLabel } from "@mui/material";
import AtIdCreader from "../AtCommon/AtIdCreater";
import HeaderCell from "./AtTableHeader";
import DefaultProps from "./Model/AtTableModelDefaultProps";
import AtTablePagination from "./AtTablePagination";
import MUIPagination from "./AtTablePagination";
import AtTableBody from "./AtTableBody";



const AtTable: React.ForwardRefRenderFunction<AtTableRef, AtTableModel> = (
  props: AtTableModel,
  ref?
) => {

  //#region  載入預設值
  const [stateProps, setStateProps] = React.useState<AtTableModel>(DefaultProps(props));

  React.useEffect(() => {
    setStateProps(pre => {
      return {
        ...pre, ...DefaultProps(props)
      }
    })
  }, [props])
  //#endregion

  //#region 
  React.useImperativeHandle(ref, () => ({

    // 取得欄位設定
    getFeildsDef: () => { return stateProps.feilds },
    setFeilds: (feilds: DouTableFeildDef[]) => { setStateProps(pre => { return { ...pre, feilds: feilds } }) },

    // 取得資料
    getDatas: () => { return stateProps.datas! },

    // insert資料，預設塞入第一個
    insertData: (data: object, index?: number) => {
      setStateProps(pre => { return { ...pre, datas: pre.datas?.splice(index ? index : 0, 0, data) } });
    },

    //移除特定資料
    removeData: (index: number) => { setStateProps(pre => { return { ...pre, datas: pre.datas?.splice(index, 1) } }) },
    setDatas: (datas: any[]) => { setStateProps(pre => { return { ...pre, datas: datas } }) }
  }));

  //#endregion
  return (<>
    <Table {...stateProps.tableProps}
      className={`AtTable-Container ${stateProps.tableProps?.className}`}>

      <TableHead {...stateProps.headerContainerProps}
        className={`AtTable-Header ${stateProps.headerContainerProps?.className}`}
      >

        {/* 查看是否有上層標頭*/}
        {stateProps.extraHeaders ? (stateProps.extraHeaders) : null}

        {/* 對應標頭 */}
        {stateProps.headerShow ?
          <TableRow {...stateProps.headerRowProps}
            className={`AtTable-HeaderRow ${stateProps.headerRowProps?.className}`}>
            {stateProps.feilds
              .filter((feild) => feild.visiable == true) // 確認顯示欄位

              // 建立table的Header
              .map((feild) =>
                HeaderCell(feild, stateProps, setStateProps)
              )}
          </TableRow>
        :<></>}
      </TableHead>

      {/* 產製表身 */}
      <TableBody {...stateProps.bodyContainerProps}
        className={`AtTable-BodyContainer ${stateProps.bodyContainerProps?.className}`}
      >
        {AtTableBody(stateProps, setStateProps)}
      </TableBody>
    </Table>

    {/* 頁數控制 */}
    {stateProps.pageination ? 
      <MUIPagination pageProps={stateProps.pageinationProps!} tableProps={stateProps} setStateProps={setStateProps} /> : <></>
    }
  </>
  );
};
export default React.forwardRef(AtTable);

