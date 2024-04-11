import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";
import authSlice from "./authSlice";
import modalSlice from "./modalSlice";
const store = configureStore({
  reducer: { sidebar: sidebarSlice, auth: authSlice, modal: modalSlice },
});

export default store;
