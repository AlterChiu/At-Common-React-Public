import React from "react";
import GetDefaultProps from "./Model/AtWebViewDefault";
import { AtWebViewModel, AtWebViewRef } from "./Model/AtWebviewModel";


const AtWebView: React.ForwardRefRenderFunction<AtWebViewRef, AtWebViewModel> = (props: AtWebViewModel, ref?) => {
    const [layout, setLayout] = React.useState<AtWebViewModel>(GetDefaultProps(props))
    React.useEffect(() => { setLayout(pre => GetDefaultProps(Object.assign(pre, props))) }, [props])


    React.useImperativeHandle(ref, () => ({
        toggleSideView: () => { setLayout(pre => { return { ...pre, sideViewProps: { ...pre.sideViewProps!, open: !pre.sideViewProps!.open! } } }) },
        openSideView: () => { setLayout(pre => { return { ...pre, sideViewProps: { ...pre.sideViewProps!, open: true } } }) },
        closeSideView: () => { setLayout(pre => { return { ...pre, sideViewProps: { ...pre.sideViewProps!, open: false } } }) },
    }))

    return <div className="containerfluid At-WebView">
        <div className="row">
            <div>Header</div>
        </div>
        <div className={`row At-WebView-Side-${layout.sideViewProps?.drawerAlign}`}>
            <div className="col d-none d-md-block">一般狀況下的SideView</div>
            <div className="col d-block d-md-none">手機狀況下的SideView</div>
            <div className="col">網頁內容</div>
        </div>
        <div className="row At-WebView-Footer">Footer</div>

    </div>
}
export default React.forwardRef(AtWebView)

