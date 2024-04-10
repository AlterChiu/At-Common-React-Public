import { Button } from "@mui/material";
import React from "react";
import AtModal from "./AtModal";
import { AtModalRef } from "./Model/AtModalModel";
import { Label } from "@mui/icons-material";
import AtInput from "../AtInput/AtInput";


const TestDemo = () =>{
    const modalRef = React.createRef<AtModalRef>();
    const [open , setOpen] = React.useState<boolean>(false);

    return <>
        <Button onClick={()=>{modalRef.current?.openModal()}}>開啟(內從Ref)</Button>
        <Button onClick={()=>{setOpen(true)}}>開啟(外層State)</Button>
        <AtModal ref={modalRef} 
            dialogProps={{open:open}} //可以透過外層的state去操作
            dialogTitle={<>不能按的標題<Button>可以按下去的標題唷</Button></>}

            // Footer的客製化內容
            dialogActionContent={<>
                    <Button variant="contained" onClick={()=>{
                        setOpen(false); 
                        //modalRef.current?.closeModal(); //強制ref同步
                        }}>關閉(外層State)</Button>
                    <Button variant="contained" onClick={()=>{
                        modalRef.current?.closeModal();
                        //setOpen(false); //強制State同步
                        }}>關閉(內從Ref)</Button>
                </>
            }
        >
            <h4>選擇一種方式去開關Modal即可，通常不會兩種一起用狀態會卡住</h4>
            <h4>不然就是得自行實作State跟Ref的同步狀態(如上方被註解掉的內容)</h4>

            <label>目前Ref狀態：{modalRef.current?.isOpen() ? "開啟":"關閉"}</label><br />
            <label>目前State狀態：{open ? "開啟":"關閉"}</label>
        </AtModal>

    </>
}
export default TestDemo