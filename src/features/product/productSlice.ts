import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

import axios, { AxiosResponse } from "axios";

import { BASE_URL } from "../../config/apiConfig";

import { Product } from "../../types";

export interface ProductState {
  loading: boolean;
  products: Array<Product>;
  error: string | undefined;
}

const initialState: ProductState = {
  loading: false,
  products: [],
  error: undefined,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", () => {
  const axiosConfig = {
    method: "GET",
    url: `${BASE_URL}products`,
  };

  const res = axios(axiosConfig)
    .then(
      (response: AxiosResponse<{ products: Product[] }>) =>
        response.data.products
    )
    .catch((err) => {
      throw err;
    });
  return res;
});

export const addProduct = createAsyncThunk(
  "products/addProduct",
  (props: {
    SKU: string;
    name: string;
    quantity: string;
    unitPrice: string;
    description: string;
  }) => {
    const { SKU, name, quantity, unitPrice, description } = props;

    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}products`,
      data: {
        SKU,
        name,
        quantity: Number(quantity),
        unitPrice: Number(unitPrice),
        description,
      },
    };

    const res = axios(axiosConfig)
      .then(
        (response: AxiosResponse<{ product: Product }>) => response.data.product
      )
      .catch((err) => {
        throw err;
      });
    return res;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Array<Product>>) => {
        state.loading = false;
        state.products = action.payload;
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      addProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.products = [action.payload, ...state.products];
      }
    );
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {},
});

export const productSelector = (state: RootState) => state.productReducer;

export default productSlice.reducer;
