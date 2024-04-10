import { list_background_prim, list_background_sec, list_ft_prim, list_ft_sec } from "./AtListStyle";

import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, CollapseProps, List, ListItemButton } from "@mui/material";
import React, { useImperativeHandle } from "react";
import { AtListItem, AtListModel, AtListRef } from "./Model/IAtListModel";
import AtIdCreader from "../AtCommon/AtIdCreater";

const AtList: React.ForwardRefRenderFunction<AtListRef, AtListModel> =
  (props: AtListModel, ref?) => {
    //#region 預設參數

    // 載入fontawesome的套件
    library.add(fas);

    //
    const [list, setList] = React.useState<AtListModel>(
      Object.assign({
        id: AtIdCreader.getId("AtList-"),
        disablePadding: true,
      } as AtListModel,
        {
          ...props,
          datas: props.datas?.map(data => DefaultItemButton(data))
        }
      ) as AtListModel);

    React.useEffect(() => {
      setList(pre => { return { ...pre, ...props, datas: props.datas?.map(data => DefaultItemButton(data)) }; });
    }, [props])

    //#endregion

    //#region 對外提供服務
    useImperativeHandle(ref, () => ({
      addItem: (item: AtListItem) => {
        setList(pre => { return { ...pre, datas: [...pre.datas, DefaultItemButton(item)] } })
      },
      deleteItem: (id: string) => {
        setList(pre => { return { ...pre, datas: [...DetelItem(pre.datas, id)] } })
      }
    }))
    //#endregion

    return (
      <List {...list}>{CreateAtLists(list.datas, 0, setList)}</List>
    );
  };
export default React.forwardRef(AtList);

//#region 生成預設參數
const DefaultItemButton = (item: AtListItem): AtListItem => {
  return Object.assign({
    id: AtIdCreader.getId("AtList-listItem"),
    icon: "chevron-right"
  } as AtListItem,
    {
      ...item,
      childs: item.childs?.map(data => DefaultItemButton(data)),
      collapseProps: DefaultCollapse(item.collapseProps)
    }
  )
}

const DefaultCollapse = (collapseProp?: CollapseProps): CollapseProps => {
  const v = Object.assign(
    {
      id: AtIdCreader.getId("AtList-Collapse"),
      in: false,
      timeout: "auto",
      unmountOnExit: true
    } as CollapseProps,
    collapseProp
  )
  return v;
}
//#endregion

//#region 生成巢狀式 List 迴圈
const CreateAtLists = (props: AtListItem[], index: number, //建立list用
  setList: React.Dispatch<React.SetStateAction<AtListModel>> //共用State狀態
) => {
  if (props && props.length > 0)
    return props.map(prop => CreateAtList(prop, index, setList));
  else
    return [<></>];
}

const CreateAtList = (prop: AtListItem, index: number,// 0: 主圖層，1以上會依據層級往前增加空白
  setList: React.Dispatch<React.SetStateAction<AtListModel>>, //共用State狀態
) => {
  return (
    <>
      {/* 主要的list顯示 */}
      <ListItemButton {...prop}
        // 主圖層跟次圖層有不同的sx
        sx={Object.assign(index == 0 ? { ...list_background_prim } : { ...list_background_sec }, prop.sx,)}
        onClick={(e) => {
          if (prop.onClick) prop.onClick(e); //繼承使用者設定

          // 這邊剛好是一個特別案例
          // 由於這邊在生成選項時採用遞迴的巢狀迴圈，會導致不確定數量的hook產生，因此這邊選用select id的方式去做更新state
          setList(pre => { return { ...pre, datas: SetCollapseIn(pre.datas, prop.id!, !prop.collapseProps?.in!) } }) //直接更新到list的state狀態下
        }}>


        {//只有第一階層會有前墜icon
          index == 0 ? <FontAwesomeIcon icon={prop.icon!} size="xs" /> : <></>}


        {/* // 主圖層跟次圖層有不同的內容樣式 */}
        <Box component={"div"} sx={
          Object.assign(index == 0 ? { ...list_ft_prim } : { ...list_ft_sec }, { width: "100%" }, prop.fontProps?.sx)}>
          { // 文字前面會加上空格
            `　${"　".repeat(index * 2)}${prop.label}`
          }
        </Box>


        {/* 子目錄開闔的icon */}
        {prop.childs && (
          <Box component={"div"} sx={{ justifyContent: "flex-end" }}>
            {prop.collapseProps?.in ? <ExpandMore /> : <ExpandLess />}
          </Box>
        )}
      </ListItemButton>

      {/* 子目錄內容 */}
      {prop.childs && prop.childs?.length > 0 ? (
        <Collapse  {...prop.collapseProps} in={prop.collapseProps?.in} >
          {CreateAtLists(prop.childs, index + 1, setList)}
        </Collapse>
      ) : (
        <></>
      )}
    </>
  )
}
//#endregion

// #region 內部搜尋用方法
const SetCollapseIn = (datas: AtListItem[], id: string, collapseIn: boolean): AtListItem[] => {
  datas.filter(data => data.id == id).forEach(data => { data.collapseProps!.in = collapseIn }); //找到名稱相同的，更改他的collapse in
  datas.filter(data => data.childs && data.childs.length > 0).forEach(data => { SetCollapseIn(data.childs!, id, collapseIn) }); // 如果有下一層childs，迴圈

  return datas;
}

const DetelItem = (datas: AtListItem[], id: string) => {
  return datas.filter(data => data.id != id).map(data => {
    if (data.childs) data.childs = DetelItem(data.childs, id);
    return data;
  });
}
//#endregion
