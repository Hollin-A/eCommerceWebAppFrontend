import React, { useState, useEffect } from "react";

import axios from "axios";

// importing components
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import NewProductBtn from "../components/NewProductBtn";
import FavouriteBtn from "../components/FavouriteBtn";

// importing icons
import { TrashBinIcon, EditIcon } from "../components/icons";

// backend url
import { BASE_URL } from "../config/apiConfig";

// importing interfaces
import { Product } from "../types";

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
              <div className="grid grid-cols-6 gap-2" key={item._id}>
                <p className="text-grey">{item.SKU}</p>
                <div />
                <p className="text-dark capitalize">{item.name}</p>
                <p className="text-dark">{item.quantity}</p>
                <p className="text-dark">{item.unitPrice}</p>
                <div className="flex w-full justify-end items-center gap-3">
                  <EditIcon />
                  <TrashBinIcon />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
