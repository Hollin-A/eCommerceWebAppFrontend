import React, { useState, useEffect } from "react";

import axios from "axios";

// redux
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { decrement, increment } from "../features/product/productSlice";

// importing components
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import NewProductBtn from "../components/NewProductBtn";
import FavouriteBtn from "../components/FavouriteBtn";
import DeleteProductModal from "../modals/DeleteProductModal";

// importing icons
import { EditIcon } from "../components/icons";

// backend url
import { BASE_URL } from "../config/apiConfig";

// importing interfaces
import { Product } from "../types";
import { NavLink } from "react-router-dom";

const tableHeaders: string[] = [
  "SKU",
  "image",
  "product name",
  "price",
  "quantity",
];

type Props = {};

const Home = (props: Props) => {
  const [searchText, setSearchText] = useState<string>("");
  const [showFavourites, setShowFavourites] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const count = useAppSelector((state) => state.product.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}products`,
        // headers: {
        //   Authorization: `Bearer ${getAccess()}`,
        // },
      };
      axios(axiosConfig)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getProducts();
  }, []);

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
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-6 gap-2">
          {tableHeaders.map((header) => (
            <p className="uppercase text-blue font-semibold" key={header}>
              {header}
            </p>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-3">
          {products &&
            products.map((item) => (
              <div
                className="grid grid-cols-6 gap-2 border-b border-grey/50 py-3"
                key={item._id}
              >
                <p className="text-grey">{item.SKU}</p>
                <div />
                <p className="text-dark capitalize">{item.name}</p>
                <p className="text-dark">{item.unitPrice}</p>
                <p className="text-dark">{item.quantity}</p>
                <div className="flex w-full justify-end items-center gap-3">
                  <NavLink className="" to={`/edit-product/${item._id}`}>
                    <EditIcon />
                  </NavLink>
                  <DeleteProductModal product={item} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
