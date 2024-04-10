import { width } from "@mui/system";
import React from "react";
import AtList from "../AtList/AtList";
import AtPannel from "./AtPannel";
import { AtPannelMode, AtPannelRef } from "./Model/AtPannelMode";
import { TestDemo as AtListDemo } from "../AtList/TestDemo";


const TestDemo = () => {
    const pannelRef = React.createRef<AtPannelRef>();
    const [pannelProp, setPannelProp] = React.useState<AtPannelMode>(
        {

            // pannel的顯示名稱
            titleLabel: "預設功能測試",

            // 可以自行決定初始的長寬高及位置
            position: { width: 400, height: 500, top: 200, left: 500 },
            

            // pannel的內容
            children: <AtListDemo />
        } as AtPannelMode
    );
    const [pannels, setPannels] = React.useState<AtPannelMode[]>([]);

    return <>
        <button onClick={() => { setPannelProp(pre => { return { ...pre, children: <>{pre.children}<div>新內容</div></> } }) }}>新增內容</button>
        {/* 
            這邊只做到隱藏，若要刪除，自行去實作如何刪除
            看是把props砍了，或是什麼方法。不建議直接去操作dom裡面的內容
        */}
        <button onClick={() => { pannelRef.current?.hide() }}>隱藏Pannel</button>
        <button onClick={() => { pannelRef.current?.show() }}>顯示Pannel</button>
        <button onClick={() => { pannelRef.current?.minize() }}>縮小</button>
        <button onClick={() => { pannelRef.current?.expand() }}>展開</button>
        <button onClick={() => { setPannels(pre => { return [...pre, pannelProp] }) }}>新增pannel</button>
        <AtPannel ref={pannelRef}  {...pannelProp}
            //可以自己改顏色，但還是建議在paperProps裡面加一個className，然後用複寫的方式調整顏色，畢竟要調的東西挺多的
            borderColor={"#c2cdfb"}

        />
        {pannels.map(e => <AtPannel {...e} />)}
    </>
}
export default TestDemo;