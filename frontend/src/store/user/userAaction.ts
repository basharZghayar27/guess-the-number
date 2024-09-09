import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeConnectionStatus, setUserName } from "./userStore";

export const changeConnectionStatusAction = createAsyncThunk(
  "user/changeConnectionStatus",
  async ({ val }: { val: boolean }, { dispatch }) => {
    dispatch(changeConnectionStatus(val));
  }
);

export const setUserNameAction = createAsyncThunk(
  "user/setUserName",
  async ({ userName }: { userName: string }, { dispatch }) => {
    dispatch(setUserName(userName));
  }
);
