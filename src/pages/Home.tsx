import React, { useState } from "react";

// importing components
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import NewProductBtn from "../components/NewProductBtn";
import FavouriteBtn from "../components/FavouriteBtn";

type Props = {};

const Home = (props: Props) => {
  const [searchText, setSearchText] = useState<string>("");
  const [showFavourites, setShowFavourites] = useState<boolean>(false);

  return (
    <section className="">
      <Title title="products" />
      <div className="flex justify-between items-center h-11">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <div className="flex items-center justify-center gap-3 h-full">
          <NewProductBtn />
          <FavouriteBtn
            showFavourites={showFavourites}
            setShowFavourites={setShowFavourites}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
