import React, { useState, useEffect } from "react";

import { SpinnerCircular } from "spinners-react";

// redux
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  fetchProducts,
  productSelector,
} from "../features/product/productSlice";

// importing components
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import NewProductBtn from "../components/NewProductBtn";
import FavouriteBtn from "../components/FavouriteBtn";
import DeleteProductModal from "../modals/DeleteProductModal";
import FavouriteToggleBtn from "../components/FavouriteToggleBtn";

// importing icons
import { EditIcon } from "../components/icons";

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
  const [error, setError] = useState<string | undefined>(undefined);

  const selectedProducts = useAppSelector(productSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(selectedProducts.loading);
    setError(selectedProducts.error);
    setProducts(selectedProducts.products);
  }, [selectedProducts]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <section className="">
      <Title title={showFavourites ? "favourite products" : "products"} />
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
      <div className="mt-10">
        <div className="grid grid-cols-6 gap-2">
          {tableHeaders.map((header) => (
            <p className="uppercase text-blue font-semibold" key={header}>
              {header}
            </p>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-3">
          {!loading ? (
            (showFavourites
              ? products.filter((item: Product) => item.favourite)
              : products
            ).map((item: Product) => (
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
                  <FavouriteToggleBtn
                    _id={item._id}
                    favourite={item.favourite}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center">
              <SpinnerCircular
                size={50}
                thickness={180}
                speed={100}
                color="rgba(0, 30, 185, 1)"
                secondaryColor="rgba(0, 0, 0, 0)"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
