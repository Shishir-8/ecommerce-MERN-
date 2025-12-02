import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"



import authReducer from "./slice/authSlice"
import cartReducer from "./slice/cartSlice"
import orderReducer from "./slice/orderSlice"
import buyNowReducer from "./slice/buyNowSlice"
import {persistReducer, persistStore} from "redux-persist"
import productReducer from "./slice/productSlice"


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
}

const rootReducer = combineReducers({
   auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    buyNow: buyNowReducer,
    products: productReducer
  
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store)