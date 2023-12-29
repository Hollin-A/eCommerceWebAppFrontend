import React from "react";

// imporitng icons
import { StarFilledIcon, StartOutlineIcon } from "./icons";

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
      {showFavourites ? <StarFilledIcon /> : <StartOutlineIcon />}
    </button>
  );
};

export default FavouriteBtn;
