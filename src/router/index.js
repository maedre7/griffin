import React from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import NavbarView from "../components/navbar";
import Home from "../components/home";
import Dashboard from "../components/dashboard";

const renderHeader = (path) => {
    switch(path){
        case '/home':
            return 'Analytics';
        case '/dashboard':
            return 'Dashboard';
        default:
            return 'Page Not Found';
    }
}

const router = () => {
    return(
        <div className="App">
            <NavbarView />
            <div className="Main">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </div>
    );
}

const AppRouter = () => (
  <BrowserRouter>
      {router()}
  </BrowserRouter>
);


export default AppRouter;