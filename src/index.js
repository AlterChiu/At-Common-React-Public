/*
這邊import進來的function就必須得用大寫開頭，不然他會出錯
*/

/*
這邊有點像是起手式，反正就是要找一個div，然後往裡面塞東西
*/
import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AtTest, TestRoute } from "./TestRoute";

import "./index.css";

/*
這邊有點像是起手式，反正就是要找一個div，然後往裡面塞東西
*/
const container = document.getElementById("root");
const root = createRoot(container);

// const routing = (
//   // 這邊要放site name
//   <BrowserRouter basename={process.env.PUBLIC_URL}>
//     <Layout>
//       <Routes>
//         <Route path="/accountEdit" element={<></>}></Route>
//         <Route path="/account/Create" element={<AccountCreate />}></Route>
//         <Route path="/account/Edit" element={<AccountEdit />}></Route>
//         <Route
//           path="/account/ResetPassword"
//           element={<AccountResetPassword />}
//         ></Route>
//         <Route path="/LoginUser" element={<LoginUser />}></Route>
//       </Routes>
//     </Layout>
//   </BrowserRouter>
// );

// ReactDOM.render(routing, document.getElementById("root"));

// 專案發佈用
// root.render(<ProjectRoute />);

// 測試用
root.render(<TestRoute />);
