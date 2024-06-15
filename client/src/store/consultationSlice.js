import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Symptoms: {
    chief_compliant: [],
    HPI: "",
    additional_notes: "",
  },
  examination: {
    physicalExamination: [],
    vitals: [],
  },
  medical_plan: {
    plan: "",
    // directly_selected_lab:[],
    // indirectly_selected_lab:[],
    // sicknote: "",
    // referal_notes:""
  },
};

const consultationSlice = createSlice({
  name: "consultation",
  initialState,
  reducers: {
    setConsultation(state, actions) {
      //console.log(userData);

      state.Symptoms = actions.payload?.Symptoms;
      state.examination = actions.payload.examination;
      state.medical_plan = actions.payload.medical_plan;
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
