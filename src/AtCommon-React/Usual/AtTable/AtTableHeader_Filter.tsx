import React, { MemoExoticComponent } from "react";
import { AtTableModel, DouTableFeildDef } from "./Model/AtTableModel";
import { AtModalRef } from "../AtModal/Model/AtModalModel";
import { AtInputRef } from "../AtInput/Model/AtInputModel";
import AtModal from "../AtModal/AtModal";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AtInput from "../AtInput/AtInput";
import { Button, Checkbox, FormControlLabel } from "@mui/material";

//#region 篩選功能，包含Modal本身
const GetFilterContent = (feild: DouTableFeildDef, 
    datas: any[],
    setProps: React.Dispatch<React.SetStateAction<AtTableModel<any>>> //修改內容
    ) => {
    const modalRef = React.createRef<AtModalRef>();
  
    //#region  篩選邏輯
    const filterStrings = React.useMemo(()=>{ //提供給使用者的篩選項目，預存結果，加速運算
      return feild.customerFilterOptions!(feild, datas);
    } , [datas , feild.customerFilterOptions])   
    
    //#endregion
   
    //#region 文字搜尋功能(modal內使用)
    const searchInputRef = React.createRef<AtInputRef>();
    const [currentSearch, setCurrentSearch] = React.useState<string | undefined>(); //快速搜尋的輸入;

    const [filters , setFilters] = React.useState<{[key:string]:FilterInfo}>(
      filterStrings.reduce((obj , key) =>{obj[key] = {isShow:true , isCurrentCheck:false , isTemptCheck:false } ; return obj} , {})
    );
    //#endregion   


    return <>
      {/* Header 右方的icon */}
      <div onClick={() => { modalRef.current?.openModal() }}>
            <FilterAltIcon sx={{ fontSize: "medium" }} className="AtTable-Filter-Icon" />
        </div>

      {/* 顯示的Modal */}
      <AtModal
        ref={modalRef}
        dialogProps={{ className: "AtTable-Header-FilterDialog" }}

        // modal Title 
        dialogTitle={`${feild.title}-篩選項目`}
        dialogTitleProps={{ className: "AtTable-Header-Filter-TitleContainer" }}

        //modal 內容 
        dialogContentProps={{ className: "AtTable-Header-Filter-ContentContainer" }}

        //modal 內容 
        dialogActionProps={{ className: "AtTable-Header-Filter-FooterContainer" }}
        dialogActionContent={FilterAction(filters, setFilters, modalRef , feild , setProps , setCurrentSearch)}
      >

        {/* modal 內容 */}
        <div className="container-fluid At-Header-Filter-Container">
          <div className="row">

            {/* 手動快速搜尋功能*/}
            <div className="col-12 col-md-6 At-Header-Filter-search" style={{ padding: "0" }}>
              <AtInput label={"搜尋"}
                ref={searchInputRef}
                className="searchText"
                onKeyUp={() => {
                  setCurrentSearch(pre => {
                    // 處理空白情況
                    var searchText = searchInputRef.current?.getValue();
                    searchText = searchText?.trim().length == 0 ? undefined : searchText?.trim();
                    return searchText;
                  })
                }}
              />
            </div>

            {/* 全部搜尋/取消全部*/}
            <div className="col-12 col-md-6 At-Header-Filter">
              <Button onClick={()=>{
                setFilters(pre => {
                  Object.keys(pre).forEach(key => pre[key].isTemptCheck = true);
                  return {...pre};
                })
              }}>全選</Button>
              <Button onClick={()=>{ 
                setFilters(pre => {
                  Object.keys(pre).forEach(key => pre[key].isTemptCheck = false);
                  return {...pre};
                })
              }}>取消全選</Button>
            </div>
  
          </div>

          {/* Filter的選項，因效能因素最多顯示前50個 */}
          <div className="row At-Header-Filter-OptionContainer">
                {Object.keys(filters).filter((key,index) => {
                  if(currentSearch)
                    return key.includes(currentSearch);
                  return true;

                // 判斷搜尋文字(只搜尋前50個)
                }).filter((key,index)=> index >=50 ? false : true)
                .map(label => 
                    <CheckBoxMemo 
                        isCheck={filters[label].isTemptCheck} 
                        isShow={filters[label].isShow} 
                        label={label}
                        setFilter={setFilters}
                    />)}
          </div>
        </div>
      </AtModal>
    </>
  }
  export default GetFilterContent;



  //#region Modal下方的功能列
  const FilterAction = (filter: {[key:string]:FilterInfo},
    setFilter: React.Dispatch<React.SetStateAction<{[key:string]:FilterInfo}>>,
    modalRef: React.RefObject<AtModalRef>,

    feild: DouTableFeildDef, //哪一個feild觸發的
    setProps: React.Dispatch<React.SetStateAction<AtTableModel<any>>>, //修改Feild 的 filter內容

    setSeachText :  React.Dispatch<React.SetStateAction<string|undefined>>//清空搜尋內容
    ) => {
    return <>
      <Button 
        variant="contained"
        color="inherit"
        onClick={() => {
          setSeachText(undefined); //清空搜尋內容
          setFilter(pre => { //重置temparyFilter
            return Object.keys(pre).reduce((obj , key)=>{obj[key] = {...pre[key] ,isTemptCheck : pre[key].isCurrentCheck} ; return obj} , {})
          })
        modalRef.current?.closeModal();
      }}>取消</Button>
      <Button 
        variant="contained"
        onClick={() => {
        setSeachText(undefined); //清空搜尋內容
        setFilter(pre => { //更新currentFilter
          return Object.keys(pre).reduce((obj , key)=>{obj[key] = {...pre[key] ,isCurrentCheck : pre[key].isTemptCheck} ; return obj} , {})
        })
        setProps(pre => {
            var updateField = pre.feilds.filter(e => e.feildKey == feild.feildKey)[0];
            updateField.currentFilters = Object.keys(filter).filter(key => filter[key].isTemptCheck).map(key => key);
            return {...pre , feilds:[...pre.feilds]}
        })
        modalRef.current?.closeModal();
      }}>確認</Button>
  
    </>
  }
  //#endregion

  
  // #region Filter modal內的Checkbox(使用memo加速)
  const CheckBoxMemo = React.memo((props:{isShow:boolean , isCheck:boolean , label:string , 
    setFilter:React.Dispatch<React.SetStateAction<{[key:string]:FilterInfo}>>})=>{
    if(props.isShow) return <div className="col-md-3 col-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.isCheck}
                      onChange={(event) => props.setFilter(pre => {
                        var checkedBox = pre[props.label];
                        checkedBox.isTemptCheck = !checkedBox.isTemptCheck;
                        return { ...pre};
                      })}
                    />}
                  label={props.label} />
              </div>
    else return <></>
  });
  // #endregion


  interface FilterInfo{
    isShow:boolean;
    isTemptCheck:boolean;
    isCurrentCheck:boolean;
  }
  