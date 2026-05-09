import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectionRequest } from "../types";

export type RequestState = ConnectionRequest[] | null;

const requestSlice = createSlice({
  name: "requests",
  initialState: null as RequestState,
  reducers: {
    addRequests: (state, action: PayloadAction<ConnectionRequest[]>) => {
      return action.payload;
    },
    removeRequest: (state, action: PayloadAction<string>) => {
      if (!state) return null;
      return state.filter((req) => req._id !== action.payload);
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
