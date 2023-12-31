import React from "react";

// redux
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  toggleProductFavourite,
  productSelector,
} from "../features/product/productSlice";

import { StarFilledIcon, StarOutlineIcon } from "./icons";

interface FavouriteToggleBtnProps {
  _id: string;
  favourite: boolean;
}

const FavouriteToggleBtn = (props: FavouriteToggleBtnProps) => {
  const { _id, favourite } = props;

  const dispatch = useAppDispatch();

  const handleToggleFavourite = () => {
    dispatch(toggleProductFavourite({ _id }));
  };

  return (
    <button
      className="flex items-center justify-center"
      onClick={handleToggleFavourite}
    >
      {favourite ? (
        <StarFilledIcon classes="w-5 h-5" />
      ) : (
        <StarOutlineIcon classes="w-5 h-5" />
      )}
    </button>
  );
};

export default FavouriteToggleBtn;
