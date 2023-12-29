import React from "react";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <nav className="py-3 flex items-center justify-end gap-5">
      <p className="uppercase text-sm font-bold">admin</p>
      <div className="bg-blue h-10 w-10 rounded-full" />
    </nav>
  );
};

export default NavBar;
