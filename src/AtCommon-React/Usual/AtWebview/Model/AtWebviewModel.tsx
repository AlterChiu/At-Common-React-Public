import { MenuProps } from "@mui/base";
import { ListProps } from "@mui/material";

// 整體的Model
export interface AtWebViewModel {
    headerProps?: AtWebHeaderModel; //Header容器
    sideViewProps?: AtWebSideViewModel;//SideView容器

    atWebViewContent?: AtWebViewContent;//內容容器
    children?: JSX.Element;

    footerProps?: AtWebFooterModel;//Footer容器
}
export interface AtWebViewRef {
    toggleSideView: () => void;
    closeSideView: () => void;
    openSideView: () => void;
}


//#region Footer
export interface AtWebFooterModel extends React.HTMLProps<HTMLDivElement> {
    children?: JSX.Element;
}
//#endregion

//#region Content
export interface AtWebViewContent extends React.HTMLProps<HTMLDivElement> {

}
//#endregion

//#region 側邊功能列
/*
    Container


*/
export interface AtWebSideViewModel extends React.HTMLProps<HTMLDivElement> {
    itemGroups?: SideViewGroup[]; // 側邊顯示群組
    autoCollapse?: boolean;//自動收合子選單，預設false

    drawerAlign?: "left" | "right";//預設左邊
    open?: boolean;//開啟，預設關閉

    titleContainer?: SideViewTitle;
}

export interface SideViewTitle extends React.HTMLProps<HTMLDivElement> {
    children?: JSX.Element; // 預設內容為空
    onOpenIcon?: JSX.Element; //開啟時的Icon
    onCloseIcon?: JSX.Element; //關閉時的Icon
}
export interface SideViewItem extends HTMLDivElement {
    displayName: string;
    url?: string; //無設定時，點下去不會有反應
    customerFomatter?: (props: SideViewItem | SideViewGroup) => JSX.Element; //客製化回傳，有預設值
}
export interface SideViewGroup extends SideViewItem {
    icon?: JSX.Element; //若無設定會呈現一個點，要無顯示時要用 <></>

    defaultCollapse?: boolean;//預設關閉子選單，預設true
    collapseIcon?: JSX.Element;//當有子項目時，Gropu收合時的Icon
    expandIcon?: JSX.Element;//當有子項目時，Gropu收合時的Icon

    items?: SideViewItem[];
}
//#endregion


//#region 頂端功能
/**
 *    Container(div) => 整體Header的Contianer
 *          ProjectInfo(div) => 專案相關資訊
 *              icon => 專案icon
 *              projectName => 專案名稱
 *              homePageURL => 首頁URL
 *          
 *          PageContiner(div) => 分頁資訊(可以改放在sideView內，手機排版狀態下，這邊會消失)
 *              itemGroups => 分頁群組
 *                  items => 分頁
 *          
 *          LoginContainer(div) => 登入相關
 *              userInfos(div) => 使用者通知資訊，客製化回傳JSX
 *              loginInfos => 登入/登出相關
 *                  loginIcon 
 *                  logoutIcon
 *                  userName =>  可客製化回傳
 *                  optionProps =>
 * 
 * 
 */

export interface AtWebHeaderModel {
    projectInfo: ProjectInfo; //專案標題，首頁相關
    pageContainer?: PageContiner; //Link去各分頁，分頁群組等
    loginContainer?: LoginContainer; //
}

interface ProjectInfo extends React.HTMLProps<HTMLDivElement> {
    icon?: JSX.Element; //Icon
    homePageURL?: string;//首頁位置
    projectName: string;//專案名稱
}

interface PageContiner extends React.HTMLProps<HTMLDivElement> {
    itemGroups?: HeaderPageGroup[]; //Header顯示分頁群組
}

interface HeaderPageGroup extends SideViewGroup {
    menuProps?: MenuProps; //透過MUI Menu方式開啟，所以會多一個MENU的Container需要設定
}


export interface LoginContainer extends React.HTMLProps<HTMLDivElement> {
    userInfos?: (data: any) => JSX.Element; //會將login後的promise回傳給userInfo，讓他去做rerender
    loginInfos?: any;

    isLogin?: boolean;//是否登入
    isLoginURL?: string;//確認是否登入，回傳內容包含該帳號基本設定(限制Get方法)，若為undefine則不檢查

    loginIcon?: JSX.Element;
    loginURL?: string; // 跳轉到特定頁面

    logoutIcon?: JSX.Element;
    logoutURL?: string; // 跳轉到特定頁面

    userName?: (data: any) => JSX.Element;
    optionMenu?: (data: any, containerID: string) => JSX.Element; //其他功能，如修改密碼，登出等都可以放在這邊。 Menu內容可透過props的child去放

}

//#endregion

