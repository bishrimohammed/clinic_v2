import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    changeSidebarShow(state, action) {
      console.log(action.payload.sidebarShow);
      state.sidebarShow = action.payload;
      // state.sidebarUnfoldable = !state.sidebarUnfoldable;
    },
  },
});
/*
const initialState = {
  sidebarShow: true,
};

const sidebarReducers = (state = initialState, { type, ...rest }) => {
  console.log({ ...rest });
  // console.log(state.sidebarShow);
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};*/
export const { changeSidebarShow } = sidebarSlice.actions;

//export default sidebarReducers;
export default sidebarSlice.reducer;
