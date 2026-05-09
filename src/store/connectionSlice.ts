import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

export type ConnectionState = User[] | null;

const connectionSlice = createSlice({
  name: "connection",
  initialState: null as ConnectionState,
  reducers: {
    addConnections: (state, action: PayloadAction<User[]>) => action.payload,
    removeConnections: () => null,
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
