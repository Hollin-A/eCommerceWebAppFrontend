import React from "react";

// importing components
import Title from "../components/Title";

type Props = {};

const AddProduct = (props: Props) => {
  return (
    <section>
      <div className="">
        <Title title="products" subTitle="Add new product"/>
      </div>
    </section>
  );
};

export default AddProduct;
