import React, { useEffect } from "react";
import { AtCollapseModel, AtCollpaseRef } from "./Model/AtCollapseModel";
import { Collapse } from "@mui/material";


const AtCollapse: React.ForwardRefRenderFunction<AtCollpaseRef, AtCollapseModel> = (
    props: AtCollapseModel,
    ref?
) => {
    //#region  設定預設值
    const [collapse, setCollapse] = React.useState<AtCollapseModel>(Object.assign({
        in: false,
    } as AtCollapseModel, props))

    useEffect(() => { setCollapse(pre => { return { ...pre, ...props } }) }, [props])
    //#endregion

    //#region  對外服務
    React.useImperativeHandle(ref, () => ({
        setOpen: () => { setCollapse(pre => { return { ...pre, in: true } }) },
        setClose: () => { setCollapse(pre => { return { ...pre, in: false } }) },
        toggle: () => { setCollapse(pre => { return { ...pre, in: !pre.in } }) },
        isOpen: () => { return collapse.in! }
    }))
    //#endregion

    return <Collapse {...collapse} ref={null}>{props.children}</Collapse>
}
export default React.forwardRef(AtCollapse);