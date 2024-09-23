import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="flex items-start justify-start flex-col h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
