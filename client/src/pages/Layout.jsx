import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Login from "./Login";

const Layout = () => {

  const {user,isLoading,} = useSelector(state => state.auth)
if (isLoading) {
  <div>Loading...</div>
}

  return (
    <div className="h-full w-full p-3">
      {user ? (<div className="min-h-screen bg-gray-50">
        <Navbar/>
        <Outlet />
      </div>):<Login />}
      
    </div>
  );
};

export default Layout;
