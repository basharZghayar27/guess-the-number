import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "./playerSlice";

interface GameState {
  isConnected: boolean;
  isStarted: boolean;
  gameResult: IPlayer[] | null;
  gameBet?: number
}

const initialState: GameState = {
  isConnected: false,
  isStarted: false,
  gameResult: null,
  gameBet: 0
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setGameResult: (state, action: PayloadAction<IPlayer[]>) => {
      state.gameResult = action.payload;
    },
    setGameStarted: (state, action: PayloadAction<boolean>) => {
      state.isStarted = action.payload;
    },
    setGameBet: (state, action: PayloadAction<number>) => {
      state.gameBet = action.payload;
    },
  },
});

export const { setConnected, setGameResult, setGameStarted, setGameBet } = gameSlice.actions;
export default gameSlice.reducer;
