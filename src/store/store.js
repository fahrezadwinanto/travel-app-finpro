// ini adalah global store untuk redux
// agar store ini dapat di akses oleh semua komponen di dalam aplikasi
// kita harus membungkus seluruh component kita di dalam componentnya redux yang namanya "Reducers" pada page.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { userDetailsReducer } from "./userDetailSlice";
import { persistReducer, persistStore } from "redux-persist";
import { promoDetailsReducer } from "./promoSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage"


// Sebuah method untuk mengatisipasi ketika storage tidak tersedia di server.
// Karena Next js ada SSR, maka server tidak ada local storage seperti di website / client side.
// Sehingga dibutuhkan mekanisme untuk menangani hal tersebut dengan aman

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage(); 

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  userDetail: userDetailsReducer,
  promoDetail: promoDetailsReducer,
});

//persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        // Ignore these paths in the state
        ignoredPaths: ["register", "rehydrate"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
