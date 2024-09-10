import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "./playerSlice";

interface GameState {
  isConnected: boolean;
  gameResult: Player[] | null;
}

const initialState: GameState = {
  isConnected: false,
  gameResult: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setGameResult: (state, action: PayloadAction<Player[]>) => {
      state.gameResult = action.payload;
    },
  },
});

export const { setConnected, setGameResult } = gameSlice.actions;
export default gameSlice.reducer;
