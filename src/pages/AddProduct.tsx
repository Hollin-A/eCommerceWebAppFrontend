import React, { useState } from "react";

import axios from "axios";

// importing components
import Title from "../components/Title";

// backend url
import { BASE_URL } from "../config/apiConfig";

type Props = {};

const AddProduct = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [SKU, setSKU] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addProduct = async () => {
    setLoading(true);
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}products`,
      // headers: {
      //   Authorization: `Bearer ${getAccess()}`,
      // },
      data: {
        SKU,
        name,
        quantity: Number(quantity),
        unitPrice: Number(unitPrice),
        description,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response.data.product);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section>
      <Title title="products" subTitle="Add new product" />
      <div className="grid grid-cols-2 gap-10">
        <div className="flex items-center justify-between gap-5">
          <p className="font-semibold">SKU</p>
          <input
            type="text"
            className="bg-light outline-none px-3 py-2 w-full max-w-lg"
            value={SKU}
            onChange={(e) => setSKU(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between gap-5">
          <p className="font-semibold capitalize">name</p>
          <input
            type="text"
            className="bg-light outline-none px-3 py-2 w-full max-w-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between gap-5">
          <p className="font-semibold capitalize">unit price</p>
          <input
            type="number"
            className="bg-light outline-none px-3 py-2 w-full max-w-lg"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between gap-5">
          <p className="font-semibold capitalize">QTY</p>
          <input
            type="number"
            className="bg-light outline-none px-3 py-2 w-full max-w-lg"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-5 col-span-2">
          <div className="flex flex-col gap-2">
            <p className="font-semibold capitalize">product description</p>
            <p className="font-semibold text-sm text-grey">
              A small description about the product
            </p>
          </div>
          <textarea
            className="bg-light outline-none px-3 py-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
        </div>
      </div>
      <div className="flex items-center justify-end mt-5">
        <button className="bg-blue py-2 w-60 rounded-lg" onClick={addProduct}>
          <p className="text-white capitalize font-semibold">add product</p>
        </button>
      </div>
    </section>
  );
};

export default AddProduct;
