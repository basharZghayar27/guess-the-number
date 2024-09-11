import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPlayer {
  playerName?: string;
  points: number;
  betPoints?: number;
  roundPoints?: number;
  detectedValue?: number;
}

interface PlayerState {
  players: IPlayer[];
  currentPlayer: IPlayer;
}

const initialState: PlayerState = {
  players: [],
  currentPlayer: {} as IPlayer,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<IPlayer[]>) => {
      state.players = action.payload;
    },
    setRoundPoints: (state, action: PayloadAction<Partial<IPlayer>>) => {
      state.currentPlayer = {
        ...state.currentPlayer,
        betPoints: action.payload.betPoints,
      };
    },
    setRoundDetectedValue: (state, action: PayloadAction<Partial<IPlayer>>) => {
      state.currentPlayer = {
        ...state.currentPlayer,
        detectedValue: action.payload.detectedValue,
      };
    },
    setPlayerName: (state, action: PayloadAction<Partial<IPlayer>>) => {
      state.currentPlayer = {
        ...state.currentPlayer,
        playerName: action.payload.playerName,
      };
    },
  },
});

export const {
  setPlayers,
  setRoundPoints,
  setRoundDetectedValue,
  setPlayerName,
} = playerSlice.actions;
export default playerSlice.reducer;
