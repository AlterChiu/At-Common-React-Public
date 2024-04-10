import { ButtonProps } from "@mui/material/Button";
import React from "react"
import AtIdCreader from "../AtCommon/AtIdCreater"
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DouTableDef, DouTableRef } from "./Model/AtTableModel"

const DouTable: React.ForwardRefRenderFunction<DouTableRef, DouTableDef> = (
    props: DouTableDef,
    ref?) => {

    //#region 設定預設值
    const [douoption, setDouoptions] = React.useState(Object.assign(
        {
            //==========基本設定==============================================
            rootParentContainer: AtIdCreader.getId("doutable"),
            classes: "",
            fields: [],

            //========Table Header顯示相關======================================
            extraHeaders: [],

            //=========Table的控制功能==========================================
            ctrlFieldAlign: "right",
            search: true,
            addable: false,
            editable: false,
            deleteable: false,
            viewable: false,

            useMutiDelete: false,
            useMutiSelect: false,

            addLable: "新增",
            addButtonProps: {
                variant: "contained",
                startIcon: <AddIcon />,
            } as ButtonProps,

            editaButtonProps: {
                variant: "outlined",
                startIcon: <EditIcon />
            } as ButtonProps,

            deleteButtonProps: {
                variant: "outlined",
                startIcon: <DeleteForeverIcon />
            } as ButtonProps,

            //============與後台溝通=============================================
            addServerData: () => { alert("未設定新增資料的方法") },
            deleteServerData: () => { alert("未設定刪除資料的方法") },
            updateServerData: () => { alert("未設定更新資料的方法") },
            addToListTop: false,

        }
        , props
        //==========取得Table資料==========================================
        , {
            tableOptions: Object.assign(
                {
                    search: true,
                    searchLable: "搜尋",
                }, props.tableOptions)
        },
        //=============編輯介面的外層框=============================================
        {
            editformSize: Object.assign({
                width: "40vw",
                height: "70vh",
                minWidth: "200px",
                minHeight: "400px"
            }, props.editformSize)
        }
    ));
    //#endregion

    //#region  對外服務方法
    React.useImperativeHandle(ref, () => ({

    }));
    //#endregion



    return <div {...douoption.containnerProps}
        id={douoption.containnerProps?.id ? douoption.containnerProps.id : douoption.rootParentContainer}
        className={`container-fluid douTable-root-container ${douoption.containnerProps?.className} ${douoption.classes}`}>

        {/* 控制功能的container */}
        <div {...douoption.ctrlContainerProps}
            className={`row douTable-ctrl-container ${douoption.ctrlContainerProps?.className}`}>


        </div>


    </div>



}
export default React.forwardRef(DouTable)


const GetDouCtrl = (douoption: DouTableDef) => {

    return <>
        {/* 新增按鈕 */}
        <div className="col-1">{douoption.addLable}</div>
    </>
}