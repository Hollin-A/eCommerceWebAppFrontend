import React from "react";

import { NavLink } from "react-router-dom";

type Props = {};

const NewProductBtn = (props: Props) => {
  return (
    <NavLink to="/add-product">
      <button className="bg-blue rounded-lg p-2 w-40 flex items-center justify-center h-full outline-none">
        <p className="capitalize text-white text-sm font-semibold">
          new product
        </p>
      </button>
    </NavLink>
  );
};

export default NewProductBtn;
