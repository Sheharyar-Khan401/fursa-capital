import { configureStore } from "@reduxjs/toolkit";
import RegisterReducer from "./Slice/RegisterSlice";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, combineReducers, applyMiddleware } from "redux";
import authSlice from "./Slice/authSlice";
import { apiSlice } from "./api/apiSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  register: RegisterReducer,
  auth: authSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      apiSlice.middleware,
    ]),
});

export const persistor = persistStore(store);
