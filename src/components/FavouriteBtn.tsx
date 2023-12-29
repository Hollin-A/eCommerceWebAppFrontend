import React from "react";

// imporitng icons
import { StarFilledIcon, StarOutlineIcon } from "./icons";

interface FavouritesBtnProps {
  showFavourites: boolean;
  setShowFavourites: React.Dispatch<React.SetStateAction<boolean>>;
}

const FavouriteBtn = (props: FavouritesBtnProps) => {
  const { showFavourites, setShowFavourites } = props;

  return (
    <button
      className="border border-blue rounded-lg aspect-square flex items-center justify-center h-full"
      onClick={() => setShowFavourites((prev) => !prev)}
    >
      {showFavourites ? (
        <StarFilledIcon classes="w-5 h-5" />
      ) : (
        <StarOutlineIcon classes="w-5 h-5" />
      )}
    </button>
  );
};

export default FavouriteBtn;
