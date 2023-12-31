import React from "react";

import { NavLink } from "react-router-dom";

// imporitng icons
import { StarFilledIcon, StarOutlineIcon } from "./icons";

const FavouriteBtn = () => {
  return (
    <NavLink
      className="border border-blue rounded-lg aspect-square flex items-center justify-center h-full"
      to={`/favourites`}
    >
      <StarFilledIcon classes="w-5 h-5" />
    </NavLink>
  );
};

export default FavouriteBtn;
