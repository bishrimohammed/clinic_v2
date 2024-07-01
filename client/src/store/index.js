import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";
import authSlice from "./authSlice";
// import modalSlice from "./modalSlice";
import consultationSlice from "./consultationSlice";
const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    auth: authSlice,
    consultation: consultationSlice,
  },
});

export default store;
