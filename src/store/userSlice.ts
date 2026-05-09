import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

export type UserState = User | null;

const userSlice = createSlice({
  name: "user",
  initialState: null as UserState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    removeUser: (state) => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
