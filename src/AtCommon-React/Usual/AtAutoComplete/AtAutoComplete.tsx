import { Paper, Popper } from "@mui/material";
import React, { useImperativeHandle } from "react";
import AtInput from "../AtInput/AtInput";
import * as AtSelect from "../AtSelection/AtSelection";
import { AtSelectGroupItemProps, AtSelectionItemProps } from "../AtSelection/Model/AtSelectionModel";
import { AutoCompleteModel, AutoCompleteRef } from "./Model/AtAutoCompleteModel";
import { AtInputRef, IAtInputModel } from "../AtInput/Model/AtInputModel";
import AtIdCreader from "../AtCommon/AtIdCreater";
import { defaultInput } from "../AtInput/AtInputStyle";
import "./Model/AtAutoComplete.css";

/*
    這個Component是透過 mui的textFeild跟popper組合而成，可以透過ref去控制物件
*/
const AtAutoComplete: React.ForwardRefRenderFunction<AutoCompleteRef, AutoCompleteModel> = (props: AutoCompleteModel, ref?) => {
    const inputRef = React.createRef<AtInputRef>();
    const popRef = React.createRef<HTMLDivElement>();
    const [selectedValue, setSelectedValue] = React.useState<AtSelectionItemProps | null>(null);
    const [keyDownOptionIndex, setKeyDownOptionIndex] = React.useState<number>(-1);
    const [autoComplete, setAutoComplete] = React.useState<AutoCompleteModel>(
        // 輸入欄位的預設資訊
        Object.assign(
            {
                id: AtIdCreader.getId("Autocomplete"),
                value: "",
            },
            props,
            {
                popperProps: { id: AtIdCreader.getId("AutoComplete-Poper-"), ...props }
            }
        ) as AutoCompleteModel
    );
    React.useEffect(() => { setAutoComplete((pre) => { return { ...pre, ...props } }) }, [props])

    //#region  跟外部作業的互動
    useImperativeHandle(ref, () => ({
        getValue: (): string => {
            return selectedValue?.value as string;
        },
        setValue: (value: any) => {
            // 會搜尋到最後一個group中有符合的選項，若沒有符合項目就不會反映
            autoComplete.datas.forEach(group => {
                group.datas.forEach(data => {
                    if (data.value == value) {
                        setSelectedValue(data);
                        setAutoComplete(pre => { return { ...pre, value: data.key } });
                        return
                    }
                })
            })
        },
        getInput: () => { return inputRef; },
        getPop: () => { return popRef; }
    }));
    //#endregion

    return (<>
        <AtInput
            {...autoComplete}
            ref={inputRef}
            onFocus={(e) => {
                if (autoComplete.onFocus) autoComplete.onFocus(e);
                setAutoComplete(pre => { return { ...pre, open: true } });
            }}

            onKeyUp={(e) => {
                if (autoComplete.onKeyUp) autoComplete.onKeyUp(e);
                setAutoComplete(pre => { return { ...pre, value: inputRef.current ? inputRef.current?.getValue() : pre.value } }); //不知道為何在ref在初始刷新後，始終都是re
            }}
            onKeyDown={(e) => {
                if (e.key == "ArrowDown") {
                    if (!autoComplete.open) setAutoComplete(pre => { return { ...pre, open: true } })// 如果處在focus狀態下，下拉選單還未展開
                    DetectUpDownArrayKeyDown(1, keyDownOptionIndex, setKeyDownOptionIndex);
                }
                if (e.key == "ArrowUp") DetectUpDownArrayKeyDown(-1, keyDownOptionIndex, setKeyDownOptionIndex);
                if (e.key == "Enter") DetectEnterKeyDown(autoComplete, keyDownOptionIndex);
            }}
        />

        {autoComplete.open! == true ?
            <Popper
                {...autoComplete.popperProps}
                // 下面的 onMouse都有做一些預設功能，同時讓使用者可以自行客製化
                onMouseLeave={(e) => { if (autoComplete.popperProps?.onMouseLeave) autoComplete.popperProps?.onMouseLeave(e); setAutoComplete(pre => { return { ...pre, onBlur: (e) => { InputOnBlurb(e, autoComplete, setAutoComplete, selectedValue) } } }) }} //回到預設onBlurb，點選到非下拉選單的位置要關閉選單
                onMouseEnter={(e) => { if (autoComplete.popperProps?.onMouseEnter) autoComplete.popperProps?.onMouseEnter(e); setAutoComplete(pre => { return { ...pre, onBlur: (e) => { if (props.onBlur) props.onBlur(e); } } }) }} //避免點選下拉選單時觸發input的blurb
                sx={Object.assign(defaultInput, { ...autoComplete.sx }, { zIndex: "99999999" }, { ...autoComplete.popperProps?.sx })} // 客製化指定寬度
                open={autoComplete.open!} //限制從autocomplete去控制
                anchorEl={document.getElementById(autoComplete.id!)} //限制從autocomplete去控制
            >
                <Paper
                    {...autoComplete.paperProps}
                    elevation={autoComplete.paperProps?.elevation ? autoComplete.paperProps.elevation : 3}
                    className={`${autoComplete.paperProps?.className} AtAutocomplte-Option-Paper`}
                >
                    {AtSelect.GetGroupItems(SelectorFilterGroup(autoComplete.value, autoComplete.datas, setSelectedValue, setAutoComplete))}
                </Paper>
            </Popper > : <></>
        }
    </>)
}
export default React.forwardRef(AtAutoComplete);


//#region  文字搜尋功能
const SelectorFilterGroup = (searchText: any, groups: AtSelectGroupItemProps[],
    setSelectedValue: React.Dispatch<React.SetStateAction<AtSelectionItemProps | null>>, //下拉選單的結果
    setAutocomplete: React.Dispatch<React.SetStateAction<AutoCompleteModel>> //顯示數值
) => {
    return groups.map(group => {
        return { ...group, datas: SelectorFilter(searchText, group.datas, setSelectedValue, setAutocomplete) };
    })
}

const SelectorFilter = (searchText: any, datas: AtSelectionItemProps[],
    setSelectedValue: React.Dispatch<React.SetStateAction<AtSelectionItemProps | null>>,
    setAutocomplete: React.Dispatch<React.SetStateAction<AutoCompleteModel>> //顯示數值
): AtSelectionItemProps[] => {
    var selectedDatas = datas;

    //有搜尋內容才會啟動搜索
    if (searchText && searchText.trim().length >= 0) {
        var filter = datas.filter(data => data.key.includes(searchText))
        // 若查無結果顯示 "查無結果"
        if (filter.length == 0)
            selectedDatas = [{ key: "查無結果", disabled: true }] as AtSelectionItemProps[];
        selectedDatas = filter
    }

    // 製作onclick功能
    return selectedDatas.map(data => {
        return {
            ...data,
            className: `${data.className} At-Selection-Option-item`,
            onClick: (e) => {
                if (data.onClick) data.onClick(e); //使用者自行設定onClick
                setAutocomplete(pre => { return { ...pre, value: data.key, open: false } });//設定顯示內容
                setSelectedValue(data); //設定選定的數值
            }
        }
    })
}
//#endregion

// input位置的基礎排錯
const InputOnBlurb = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,  //onBlurb預設event
    autoComplete: AutoCompleteModel, setAutoComplete: React.Dispatch<React.SetStateAction<AutoCompleteModel>>, //autoComplete參數
    selectedValue: AtSelectionItemProps | null //目前下拉選單的狀態
) => {
    if (autoComplete.onBlur) autoComplete.onBlur(event);
    setAutoComplete(pre => {
        return {
            ...pre,
            open: false,//設定關閉下拉選單
            value: selectedValue ? selectedValue.key : "" //設定顯示的數值，若沒點選項目的話，回到上一次點選的數值
        }
    })
}

//#region  偵測輸入上下左右時的反應，強化體驗
const DetectUpDownArrayKeyDown = (moveIndex: number, selectedIndex: number, setIndex: React.Dispatch<React.SetStateAction<number>>) => {
    var options = document.querySelectorAll(".AtAutocomplte-Option-Paper .At-Selection-Option-item");
    options.forEach(option => option.classList.remove("option-on-selected"));
    var nextIndex = selectedIndex + moveIndex;
    if (nextIndex < 0) nextIndex = -1;
    if (nextIndex >= options.length) nextIndex = -1;


    console.log(options.length + "\t" + moveIndex + "\t" + nextIndex);
    setIndex(nextIndex);
    if (nextIndex >= 0)
        options[nextIndex].classList.add("option-on-selected")
}

const DetectEnterKeyDown = (autoComplete: AutoCompleteModel, keyDownOptionIndex: number) => {
    //如果Enter觸發時，Index還未觸發則直接跳過
    if (keyDownOptionIndex != -1)
        (document.querySelector(`#${autoComplete.popperProps?.id} .option-on-selected`) as HTMLElement).click();
}
//#endregion