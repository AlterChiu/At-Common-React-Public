import React, { useRef, useState } from "react";
// 下面這個咚咚需要降版本才能使用，目前僅支援到 react-scripts 4.0.3
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import TestDemo from "./AtCommon-React/Usual/AtAutoComplete/TestDemo";
import { TestDemo } from "./AtCommon-React/Usual/AtTable/TestDemo";
import * as Input from "./AtCommon-React/Usual/AtInput/TestDemo";

export const TestRoute = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <>
          {/*通用類別 */}
          <Route path="/" element={<TestDemo />}></Route>
        </>
      </Routes>
    </BrowserRouter>
  );
};
