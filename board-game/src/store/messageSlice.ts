import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageState {
  randomMessage: string | null;
  messagePlayerName: string | null;
}

interface MessagePayload {
  message: string;
  playerName: string;
}

const initialState: MessageState = {
  randomMessage: null,
  messagePlayerName: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setRandomMessage: (state, action: PayloadAction<MessagePayload>) => {
      state.randomMessage = action.payload.message;
      state.messagePlayerName = action.payload.playerName;
    },
  },
});

export const { setRandomMessage } = messageSlice.actions;
export default messageSlice.reducer;