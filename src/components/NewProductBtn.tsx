import React from "react";

type Props = {};

const NewProductBtn = (props: Props) => {
  return (
    <button className="bg-blue rounded-lg p-2 w-40 flex items-center justify-center h-full">
      <p className="capitalize text-white text-sm font-semibold">new product</p>
    </button>
  );
};

export default NewProductBtn;
