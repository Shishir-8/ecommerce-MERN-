import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios";

// -------------------------------------
// FETCH ALL PRODUCTS
// -------------------------------------
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/products");
      return res.data.products; // adjust based on backend response
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch products");
    }
  }
);

// -------------------------------------
// FETCH PRODUCT CATEGORIES
// -------------------------------------
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/products/categories");
      return res.data; // your backend returns an array already
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch categories");
    }
  }
);

// -------------------------------------
// SLICE
// -------------------------------------
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    categories: [],
    loading: false,
    error: null,
  },

  reducers: {
    // Optional: can be used for client-side filtering
    clearProducts: (state) => {
      state.products = [];
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH PRODUCTS
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH CATEGORIES
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = ["all", ...action.payload];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;