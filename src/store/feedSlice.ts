import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

export type FeedState = User[] | null;

const feedSlice = createSlice({
  name: "feed",
  initialState: null as FeedState,
  reducers: {
    addFeed: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action: PayloadAction<string>) => {
      if (!state) return null;
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
