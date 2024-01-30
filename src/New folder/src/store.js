import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/index";
//import Reactotron from './ReactotronConfig.js';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  transforms: [
    encryptTransform({
      secretKey: "my-super-secret-key",
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
  // enhancers: [Reactotron.createEnhancer()]
});

export default store;
