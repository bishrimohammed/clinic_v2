import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examLocked: true,
  treatmentLocked: true,
  planLocked: true,
  finishButtonDisabled: true,
};

const consultationSlice = createSlice({
  name: "consultation",
  initialState,
  reducers: {
    unlockExam: (state) => {
      state.examLocked = false;
    },
    unlockTreatment: (state) => {
      state.treatmentLocked = false;
    },
    unlockPlan: (state) => {
      state.planLocked = false;
    },
    unlockFinishButton: (state) => {
      state.finishButtonDisabled = false;
    },
    resetConsultation: (state) => {
      state.examLocked = true;
      state.treatmentLocked = true;
      state.planLocked = true;
      state.finishButtonDisabled = true;
    },
  },
});

export const {
  unlockExam,
  unlockPlan,
  unlockTreatment,
  unlockFinishButton,
  resetConsultation,
} = consultationSlice.actions;

export default consultationSlice.reducer;
