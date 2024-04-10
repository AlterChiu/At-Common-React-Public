import React, { useEffect } from "react";
import { AtPannelCurrentState, AtPannelMode, AtPannelRef, Position, Resize } from "./Model/AtPannelMode";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { ResizableBox } from 'react-resizable';

import { Card, Collapse, Paper } from "@mui/material";
import "./Style.css";
import { ClassNames } from "@emotion/react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AtIdCreader from "../AtCommon/AtIdCreater";
import 'react-resizable/css/styles.css';

/*
 這個方法同時採用了
  1. 拖拉pannel => react-draggable
  2. 縮放pannel => react-resizable
  3. 邊框的美工 => Paper(MUI)
 
  由於resize都是透過px去設定的，這個component裡面大多的位置計算都採用px
*/

const AtPannel: React.ForwardRefRenderFunction<AtPannelRef, AtPannelMode> = (
    props: AtPannelMode,
    ref?
) => {
    // 載入fontawesome的套件
    library.add(fas);

    //#region  設定預設值
    const [pannel, setPannel] = React.useState<AtPannelMode>(Object.assign({
        id: AtIdCreader.getId("At-Pannel"),
        elevation: 3, //paper的邊框陰影

        draggable: true,
        closeable: true,
        resizable: true,
        miniable: true,
        defaultMinized: false,

        paperProps: {
            elevation: 3,
            className: "",
        },

        titlePaperProps: {
            elevation: 3,
            className: ""
        },

        bound: {
            maxHeight: window.innerWidth,
            maxwidth: window.innerWidth,
            minHeight: 0,
            minWidth: 0
        },
        borderColor: "#E4E2E4",
        children: <></>
    } as AtPannelMode, props));

    // 控制變化後的pannel位置
    const [position, setPosition] = React.useState<Position>(Object.assign({
        left: 0,
        top: 0,
        height: window.innerHeight * 0.5,
        width: window.innerWidth * 0.3
    }, props.position))

    // 目前pannel的狀態
    const [currentState, setCurrentState] = React.useState<AtPannelCurrentState>({
        draggable: false,
        minimized: false,
        hidden: false,
    } as AtPannelCurrentState);

    useEffect(() => {
        setPannel(pre => { return { ...pre, props } })
        setPosition(pre => { return { ...pre, ...props.position } })
    }, [props])
    //#endregion

    //#region 對外服務方法
    React.useImperativeHandle(ref, () => ({
        hide: () => { setCurrentState(pre => { return { ...pre, hidden: true } }) },
        show: () => { setCurrentState(pre => { return { ...pre, hidden: false } }) },
        minize: () => { setCurrentState(pre => { return { ...pre, minimized: true } }) },
        expand: () => { setCurrentState(pre => { return { ...pre, minimized: false } }) },
        fix: (position?: Position) => { setPosition(pre => { return { ...pre, ...position } }) }
    }));
    //#endregion

    // 監測內容物的變化
    const pannelRef = React.createRef<HTMLDivElement>();
    return (
        // 最外層設定這個pannel的底圖，可以將物件以圖層的方式分開，避免影響其他物件
        <div id={pannel.id}
            style={{
                position: "absolute", left: "0", top: "0", width: "100vw", height: "100vh", pointerEvents: "none",
                display: currentState.hidden ? "none" : "block"
            }}>
            <Draggable
                // 將react-draggable 的參數套入
                {...pannel.draggableOption}
                // pannel設定的是這個pannel可否拖動，currentState是看目前滑鼠位置
                disabled={!(pannel.draggable && currentState.draggable)}
            // onDrag={(evemt, data) => { setPosition(pre => { return { ...pre, top: pre.top! + data.deltaY, left: pre.left! + data.deltaX } }) }}
            >
                <Paper
                    {...pannel.paperProps}
                    className={`AtPannel-Paper ${pannel.paperProps!.className}`}

                    // !!!!!注意!!!!!
                    // 由於 react-resizeable需要透過px去計算，這邊paper的邊界以props.position為主，不參考paper內容
                    sx={{
                        ...position, pointerEvents: "all",
                        height: currentState.minimized ? "0" : position.height,
                        width: position.width,

                        position: "fixed"
                    }} >


                    {/* 讓Resizable去控制的方塊 */}
                    <div ref={pannelRef} style={{ width: "100%", height: "100%", backgroundColor: pannel.borderColor, borderRadius: "4px" }}>
                        <ResizableBox
                            width={position.width}
                            height={currentState.minimized ? 0 : position.height}
                            resizeHandles={currentState.minimized ? [] : ["se"]}
                            handleSize={[20, 20]}
                            onResize={(event, { element, size }) => { setPosition(pre => { return { ...pre, width: size.width, height: size.height } }); }}
                        >
                            {/* Pannel內的Title */}
                            <Paper
                                {...pannel.titlePaperProps}
                                className={`AtPannel-Paper-Title ${pannel.titlePaperProps?.className}`}
                                sx={{ width: "100%", height: "1.5rem", textAlign: "center", backgroundColor: pannel.borderColor }}
                                onMouseEnter={(e) => { setCurrentState(pre => { return { ...pre, draggable: true } }) }}
                                onMouseLeave={() => { setCurrentState(pre => { return { ...pre, draggable: false } }) }}
                            >
                                {/* pannel名稱 */}
                                <div className="AtPannel-Paper-Title-Label" >{pannel.titleLabel}</div>

                                {/* pannel功能 */}
                                <div className="AtPannel-Paper-Title-Options">

                                    {/* 控制最小化視窗 */}
                                    {currentState.minimized ?
                                        <div className="detail cbtn" onClick={() => { setCurrentState(pre => { return { ...pre, minimized: false } }) }}>
                                            <FontAwesomeIcon icon={["fas", "expand-alt"]} />
                                        </div> :
                                        <div className="minimize cbtn" onClick={() => { setCurrentState(pre => { return { ...pre, minimized: true } }) }}>
                                            <FontAwesomeIcon icon={["fas", "minus"]} />
                                        </div>}

                                    {/* 關閉視窗 */}
                                    {pannel.closeable ? <div className="close cbtn" onClick={() => { setCurrentState(pre => { return { ...pre, hidden: true } }) }}>
                                        <FontAwesomeIcon icon={["fas", "times"]} /></div> : <></>}

                                </div>
                            </Paper>

                            {/* Pannel內容 */}
                            <div className="AtPannel-Paper-Content">
                                <Collapse in={!currentState.minimized}>
                                    {pannel.children}
                                </Collapse>
                            </div>
                        </ResizableBox>
                    </div>
                </Paper>
            </Draggable >
        </div>
    )
}
export default React.forwardRef(AtPannel)
