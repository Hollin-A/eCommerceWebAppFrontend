import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// redux
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { editProduct, productSelector } from "../features/product/productSlice";

// importing components
import Title from "../components/Title";

// backend url
import { BASE_URL } from "../config/apiConfig";

type Props = {};

const EditProduct = (props: Props) => {
  const [SKU, setSKU] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { id } = useParams();

  const selectedProducts = useAppSelector(productSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(selectedProducts.loading);
    setError(selectedProducts.error);
  }, [selectedProducts]);

  const handleEditProduct = () => {
    if (id) {
      const newProduct = {
        _id: id,
        SKU,
        name,
        quantity,
        unitPrice,
        description,
      };
      dispatch(editProduct(newProduct));
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}products/${id}`,
        // headers: {
        //   Authorization: `Bearer ${getAccess()}`,
        // },
      };
      axios(axiosConfig)
        .then((response) => {
          setSKU(response.data.product.SKU);
          setName(response.data.product.name);
          setQuantity(response.data.product.quantity);
          setUnitPrice(response.data.product.unitPrice);
          setDescription(response.data.product.description);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getProduct();
  }, [id]);

  // const updateProduct = async () => {
  //   setLoading(true);
  //   const axiosConfig = {
  //     method: "PATCH",
  //     url: `${BASE_URL}products/${id}`,
  //     // headers: {
  //     //   Authorization: `Bearer ${getAccess()}`,
  //     // },
  //     data: {
  //       SKU,
  //       name,
  //       quantity: Number(quantity),
  //       unitPrice: Number(unitPrice),
  //       description,
  //     },
  //   };
  //   axios(axiosConfig)
  //     .then((response) => {
  //       console.log(response.data.product);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  return (
    <section>
      <Title title="products" subTitle="Edit product" />
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
        <button
          className="bg-blue py-2 w-60 rounded-lg"
          onClick={handleEditProduct}
        >
          <p className="text-white capitalize font-semibold">save changes</p>
        </button>
      </div>
    </section>
  );
};

export default EditProduct;
