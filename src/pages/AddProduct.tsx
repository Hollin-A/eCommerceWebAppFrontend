import React, { useState, useEffect } from "react";

import { SpinnerCircular } from "spinners-react";

// redux
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addProduct, productSelector } from "../features/product/productSlice";

// importing components
import Title from "../components/Title";

type Props = {};

const AddProduct = (props: Props) => {
  const [SKU, setSKU] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const selectedProducts = useAppSelector(productSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(selectedProducts.loading);
    setError(selectedProducts.error);
  }, [selectedProducts]);

  const handleAddProduct = () => {
    const newProduct = {
      SKU,
      name,
      quantity,
      unitPrice,
      description,
    };
    dispatch(addProduct(newProduct));
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
      {error && (
        <div className="w-full border border-grey rounded-lg p-3 mt-5">
          <p className="text-grey">{error}</p>
        </div>
      )}
      <div className="flex items-center justify-end mt-5">
        <button
          className="bg-blue py-2 w-60 rounded-lg flex items-center justify-center"
          onClick={handleAddProduct}
        >
          {!loading ? (
            <p className="text-white capitalize font-semibold">add product</p>
          ) : (
            <SpinnerCircular
              size={30}
              thickness={180}
              speed={100}
              color="rgba(255, 255, 255, 1)"
              secondaryColor="rgba(0, 0, 0, 0.01)"
            />
          )}
        </button>
      </div>
    </section>
  );
};

export default AddProduct;
