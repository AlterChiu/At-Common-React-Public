import { Button, Menu } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AtIdCreader from "../AtCommon/AtIdCreater";
import { AtWebViewModel } from "./Model/AtWebviewModel";


const AtWebHeader = (webviewMode: AtWebViewModel, setWenViewModel: React.Dispatch<React.SetStateAction<AtWebViewModel>>) => {
    const props = webviewMode.headerProps!;
    const [menuOpen, setMenuOpen] = React.useState(false);

    return <div className="AtWebView-Header-Container">

        {/* 第一階層 專案相關 */}
        <div {...props.projectInfo} className={`AtWebView-Header-ProjectInfoContainer ${props?.projectInfo?.className}`}>

            {/* 放在Header的漢堡排(sideView Title) */}
            <div {...webviewMode.sideViewProps?.titleContainer} className={`AtWebView-SideView-Title ${webviewMode.sideViewProps!.titleContainer?.className}`}
                onClick={(event) => {
                    if (webviewMode.sideViewProps?.titleContainer?.onClick) webviewMode.sideViewProps?.titleContainer?.onClick(event);
                    setWenViewModel(pre => {
                        var tempt = pre; // 按一下切換漢堡排狀態
                        tempt.sideViewProps!.titleContainer!.open = !tempt.sideViewProps?.titleContainer?.open;
                        return { ...tempt }
                    })
                }}
            >
                {webviewMode.sideViewProps?.open ? webviewMode.sideViewProps!.titleContainer?.onOpenIcon : webviewMode.sideViewProps!.titleContainer?.onCloseIcon}
            </div>
            {/* 專案名稱 */}
            <div className="AtWebView-Header-ProjectName">
                {props.projectInfo.icon}
                {props.projectInfo.projectName}
            </div>
        </div>


        {/* 第二階段 顯示分頁 */}
        <div {...props.pageContainer} className={`AtWebView-Header-PageContainer ${props.pageContainer?.className}`}>
            {props.pageContainer?.itemGroups?.map(group => {
                const [menuOpen, setMenuOpen] = React.useState(false);
                const groupID = AtIdCreader.getId("PageGroup");
                return <>
                    {/* 分頁群組名稱 */}
                    <div className="AtWebView-Header-PageGroup"
                        onClick={() => { setMenuOpen(pre => !pre) }}
                    >{group.icon ?? <></>}{group.displayName}</div>

                    {/* 分頁群組細項 */}
                    <Menu anchorEl={document.getElementById(groupID)}
                        open={menuOpen} onClose={() => { setMenuOpen(false) }}>
                        {group.items!.map(item => {

                            // 使用Navigate跳轉畫面，減少框架Rerender的次數
                            let navigate = useNavigate();
                            return <div className="AtWebView-Header-PageItem"
                                onClick={() => { navigate(item.url!) }}
                            >{item.displayName}</div>
                        })}
                    </Menu>
                </>
            })}
        </div>

        {/* 第三階段 顯示登入名稱(或是通知等) */}
        <div {...props.loginContainer} className={`AtWebView-Header-LoginContainer ${props?.loginContainer?.className}`}>
            {/* 使用者功能列，可依據是否登入去設計 */}
            {props.loginContainer?.userInfos ? props.loginContainer?.userInfos(props.loginContainer.loginInfos) : <></>}

            {/* 再有設置登入檢查URL時才會啟用(登入登出區塊，登入後會多出一個UserName的Div)  */}
            {props.loginContainer?.isLoginURL ?

                //登入後
                props.loginContainer?.isLogin ?
                    <>
                        <div className="AtWebView-Header-UserNameContainer">
                            {props.loginContainer.userName ? props.loginContainer.userName(props.loginContainer.loginInfos) : <></>}
                        </div>
                        <div className="AtWebView-Header-LoginContainer" id="AtWebView-Header-LoginContainer" onClick={() => { setMenuOpen(pre => !pre) }}>
                            {props.loginContainer.logoutIcon}

                            {/* logout 功能可以寫在optionMenu裡面 */}
                            <Menu open={menuOpen} className="optionMenu" onClose={() => { setMenuOpen(false) }}>
                                {
                                    props.loginContainer.optionMenu ?
                                        props.loginContainer.optionMenu(props.loginContainer.loginInfos, "AtWebView-Header-LoginContainer") :
                                        <div><Button onClick={() => { window.location.href = props.loginContainer?.logoutURL! }}>登出</Button></div>
                                }
                            </Menu>
                        </div>
                    </> :

                    //登入前
                    <div className="AtWebView-Header-LoginContainer" onClick={() => { window.location.href = props.loginContainer?.loginURL! }}>
                        {props.loginContainer?.loginInfos?.loginIcon}
                    </div>
                : <></>
            }
        </div>
    </div >
}
export default AtWebHeader;