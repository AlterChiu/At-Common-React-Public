import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import AtlLogin from "../Login/AtLogin";

const AtRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<AtlLogin />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          {/* <Route path="/" element={<Main />}>
            <Route path="/sub-menu-2" element={<Blank />} />
            <Route path="/" element={<Dashboard />} />
          </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AtRoute;
