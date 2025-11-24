import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, { rejectWithValue }) => {
    try {
        const auth = getAuth()
        const user = auth.currentUser;

        if(!user) {
            return rejectWithValue("Please login first")
        }
        const token = await user.getIdToken(true);

      const res = await api.post("/api/cart/add-item", { productId}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      return res.data.items;
    } catch (err) {
      return rejectWithValue(err.response.data.message || err.message);
    }
  }
);


export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
        const auth = getAuth()
        const user = auth.currentUser;

        if(!user) {
            return rejectWithValue("Please login first")
        }
        const token = await user.getIdToken(true);

      const res = await api.get("/api/cart/get-item", {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      return res.data.items;
    } catch (err) {
      return rejectWithValue(err.response.data.message || err.message);
    }
  }
);


export const removeItemFromCart = createAsyncThunk(
  "cart/removeItem",
  async (productId, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return rejectWithValue("Not logged in");

      const token = await user.getIdToken(true);

        const res = await api.delete("/api/cart/remove-item", {
            data: {productId},
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
      return res.data.items;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);





const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.product._id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.product._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addToCart.fulfilled, (state, action) => { state.loading = false; state.items = action.payload || []; })
      .addCase(addToCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Get cart
      .addCase(getCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getCart.fulfilled, (state, action) => { state.loading = false; state.items = action.payload || []; })
      .addCase(getCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false,
        state.items = action.payload
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })


  },
});


export const { increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;