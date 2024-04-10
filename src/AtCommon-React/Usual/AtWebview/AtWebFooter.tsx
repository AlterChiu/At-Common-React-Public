import React from "react";
import { AtWebFooterModel } from "./Model/AtWebviewModel";



const AtWebFooter = (props: AtWebFooterModel) => {
    return <div className="">
        {React.Children.map(props.children, (child) => child)}
    </div>
}
export default AtWebFooter;

















