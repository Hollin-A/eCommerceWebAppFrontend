import React, { useState } from "react";

// importing components
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";

type Props = {};

const Home = (props: Props) => {
  const [searchText, setSearchText] = useState<string>("");

  console.log(searchText);

  return (
    <section className="">
      <Title title="products" />
      <div className="flex justify-between items-center">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
      </div>
    </section>
  );
};

export default Home;
