import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ADD_USER_DETAILS } from "../actions";

export interface User {
  alias: string;
  email: string;
}

const initialState: any = {
  currentUser: [],
};

export default function user(
  state = initialState,
  action: PayloadAction<User>
) {
  switch (action.type) {
    case ADD_USER_DETAILS:
      state.currentUser = action.payload;
      return state;
    default:
      return state;
  }
}
