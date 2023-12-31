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

export const editProduct = createAsyncThunk(
  "products/editProduct",
  (props: {
    _id: string;
    SKU: string;
    name: string;
    quantity: string;
    unitPrice: string;
    description: string;
  }) => {
    const { _id, SKU, name, quantity, unitPrice, description } = props;

    const axiosConfig = {
      method: "PATCH",
      url: `${BASE_URL}products/${_id}`,
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

export const toggleProductFavourite = createAsyncThunk(
  "products/toggleproductFavourite",
  (props: { _id: string }) => {
    const { _id } = props;

    const axiosConfig = {
      method: "PATCH",
      url: `${BASE_URL}products/favourite/${_id}`,
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

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  (props: { _id: string }) => {
    const { _id } = props;

    const axiosConfig = {
      method: "DELETE",
      url: `${BASE_URL}products/${_id}`,
    };

    const res = axios(axiosConfig)
      .then((response: AxiosResponse<{ product: Product }>) => {
        return response.data.product;
      })
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
      state.error = undefined;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Array<Product>>) => {
        state.loading = false;
        state.products = action.payload;
        state.error = undefined;
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      addProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.products = [action.payload, ...state.products];
        state.error = undefined;
      }
    );
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(editProduct.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      editProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        state.loading = false;

        const newState: Product[] = state.products
          .map((product) =>
            product._id === action.payload._id ? action.payload : product
          )
          .sort((a, b) => (a.updatedDate > b.updatedDate ? -1 : 1));
        state.products = newState;
        state.error = undefined;
      }
    );
    builder.addCase(editProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(toggleProductFavourite.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      toggleProductFavourite.fulfilled,
      (state, action: PayloadAction<Product>) => {
        state.loading = false;

        const newState: Product[] = state.products
          .map((product) =>
            product._id === action.payload._id ? action.payload : product
          )
          .sort((a, b) => (a.updatedDate > b.updatedDate ? -1 : 1));
        state.products = newState;
        state.error = undefined;
      }
    );
    builder.addCase(toggleProductFavourite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      deleteProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        state.loading = false;
        const { _id } = action.payload;
        const OldProducts = state.products.filter(
          (product) => product._id !== _id
        );
        state.products = OldProducts;
        state.error = undefined;
      }
    );
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {},
});

export const productSelector = (state: RootState) => state.productReducer;

export default productSlice.reducer;
