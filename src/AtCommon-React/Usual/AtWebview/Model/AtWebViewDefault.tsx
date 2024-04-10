import { AtWebFooterModel, AtWebViewModel, LoginContainer, SideViewGroup, SideViewItem } from "./AtWebviewModel";
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import ListIcon from '@mui/icons-material/List';



const GetDefaultProps = (props: AtWebViewModel): AtWebViewModel => {
    return {
        //#region Header
        headerProps: {
            projectInfo: Object.assign({
                homePageURL: process.env.PUBLIC_URL,
                projectName: "測試專案",
                icon: <></>,//預設無
            }, props.headerProps?.projectInfo),

            pageContainer: Object.assign({
                itemGroups: []
            }, props.headerProps?.pageContainer),


            loginContainer: Object.assign({
                userInfos: () => { return <></> },
                loginInfos: {},

                isLogin: false,

                loginIcon: <AccountBoxRoundedIcon />,
                loginURL: "#",

                logoutIcon: <ExitToAppRoundedIcon />,
                logoutURL: "#",


                userName: () => { return <></> },
            }, props.headerProps?.loginContainer,
            ) as LoginContainer
        },
        //#endregion
        //#region SideView
        sideViewProps: Object.assign({
            itemGroups: GetSideViewGroupDefault(props.sideViewProps?.itemGroups),
            autoCollapse: false,
            drawerAlign: "left",
            open: "false",
        }, props.sideViewProps,
            {
                titleContainer: Object.assign({
                    onOpenIcon: <ListIcon />,
                    onCloseIcon: <ListIcon />
                }, props.sideViewProps?.titleContainer)
            }
        ),
        //#endregion
        //#region Content
        children: props.children ?? <div className="">建構中</div>,
        //#endregion
        //#endregion Footer
        footerProps: Object.assign(
            {
                children: <div style={{ width: "100%", height: "100%", textAlign: "center" }}>建議解析度 1920 * 1080</div>
            },
            props.footerProps)
        //#endregion
    };
}
export default GetDefaultProps;


// SideView Group的預設值
const GetSideViewGroupDefault = (groups?: SideViewGroup[]) => {
    if (!groups) return [];

    return groups.map(group => {
        return Object.assign({
            icon: <ScatterPlotIcon />,

            defaultCollapse: true,
            collapseIcon: <KeyboardArrowRightIcon />,
            expandIcon: <KeyboardArrowDownIcon />,

        }, group,
            {
                items: GetSideViewItemDefault(group.items),
            }
        ) as SideViewGroup;
    })
}

const GetSideViewItemDefault = (items?: SideViewItem[]): SideViewItem[] => {
    if (!items) return []; //若空值，直接回傳[]

    return items.map(item => {
        return Object.assign({
            url: "javascript:void(0)",
        }, item);
    })
}
