import { createSlice } from "@reduxjs/toolkit";

const initialState = "Add";

const createStatusSlice = createSlice({
  name: "createStatus",
  initialState,
  reducers: {
    statusCreate: (state, action) => {
      return action.payload;
    },
  },
});

export const { statusCreate } = createStatusSlice.actions;
export default createStatusSlice.reducer;
