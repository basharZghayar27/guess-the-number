import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import messageReducer from './messageSlice';
import playerReducer from './playerSlice';
import gameReducer from './gameSlice';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    player: playerReducer,
    game: gameReducer,
  },
});
// Check the store setup by dispatching a test action
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
