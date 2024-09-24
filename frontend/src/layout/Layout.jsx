import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="flex items-start justify-start flex-col h-screen">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default Layout;
