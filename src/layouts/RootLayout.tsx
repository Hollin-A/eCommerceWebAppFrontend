import React from "react";

import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";

type Props = {};

const RootLayout = (props: Props) => {
  return (
    <div className="h-screen container mx-auto">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
