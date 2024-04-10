import React from "react";
import { AtListItem } from "./AtCommon-React/Usual/AtList/Model/IAtListModel";
import AtList from "./AtCommon-React/Usual/AtList/AtList";
import AtInput from "./AtCommon-React/Usual/AtInput/AtInput";

const Test = () => {

  const [datas, setDatas] = React.useState<AtListItem[]>([
    { label: "測試一", id: "test01", urlLink: "https://google.com" },
    {
      label: "測試二",
      childs: [{ label: "子1", id: "test02-c01" }, { label: "子2", childs: [{ label: "孫" }] }],
    },
    {
      label: "測試三(預設開啟)",
      childs: [{ label: "子1" }, { label: "子2", childs: [{ label: "孫" }] }],
      collapseProps: { in: true } //從collapse裡的
    }
  ])

  console.log({
    ...datas[2] , 
    collapseProps:{
      out:true,
    }
  })

  return (
    // <AtPannel ></AtPannel>

    // <Draggable disabled={true}>
    //   <ResizableBox width={200}  minConstraints={[100, 100]} maxConstraints={[9000, 9000]}
    //     resizeHandles={["s" ,"se" , "e" , "w"]}
    //     handleSize={[20, 20]}>
    //     <div style={{ padding: '10px', border: "1px solid" }}>
    //       Resize me!
    //     </div>
    //   </ResizableBox>
    // </Draggable >

    <>
    <AtList datas={datas} sx={{width:"50vw"}} onClick={()=>{}}></AtList>
    <AtInput />
    </>
  );
};
export default Test;
