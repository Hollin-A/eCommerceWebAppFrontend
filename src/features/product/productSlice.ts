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
    // headers: {
    //   Authorization: `Bearer ${getAccess()}`,
    // },
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
  },
  reducers: {},
});

// export const { addProduct } = productSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const productSelector = (state: RootState) => state.productReducer;

export default productSlice.reducer;
