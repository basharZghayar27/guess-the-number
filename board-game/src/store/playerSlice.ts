import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Player {
  playerName: string;
  points: number;
  detectedValue?: number;
}

interface PlayerState {
  players: Player[];
}

const initialState: PlayerState = {
  players: [],
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },
  },
});

export const { setPlayers } = playerSlice.actions;
export default playerSlice.reducer;