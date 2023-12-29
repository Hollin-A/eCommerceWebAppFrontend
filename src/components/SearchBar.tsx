import React from "react";

// imporitng icons
import { SearchIcon } from "./icons";

interface SearchBarProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = (props: SearchBarProps) => {
  const { searchText, setSearchText } = props;

  return (
    <div className="bg-light w-1/2 p-2 rounded-full flex items-center justify-between">
      <input
        className="border-none outline-none bg-transparent px-3 w-full"
        placeholder="Search for Products"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className="bg-blue rounded-full h-full w-max px-5 py-1 flex items-center justify-center gap-3">
        <SearchIcon />
        <p className="text-sm text-white capitalize font-bold">search</p>
      </button>
    </div>
  );
};

export default SearchBar;
