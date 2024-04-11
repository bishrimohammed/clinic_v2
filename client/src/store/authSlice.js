import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setlogin(state, actions) {
      //console.log(userData);
      localStorage.setItem("currentUser", JSON.stringify(actions.payload));
      localStorage.setItem("token", actions.payload.token);
      state.isLoggedIn = true;
      state.user = actions.payload;
    },
    setlogout(state) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
      (state.isLoggedIn = false), (state.user = {});
    },
  },
});

export const { setlogin, setlogout } = authSlice.actions;

export default authSlice.reducer;
