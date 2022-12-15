import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {PhoneBookSlice} from "../PhoneBook/PhoneBookSlice";

export const store = configureStore({
  reducer: {
    phonebook: PhoneBookSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
